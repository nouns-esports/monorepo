import CollectButton from "@/components/CollectButton";
import fetchCollection from "@/utils/fetchCollection";
import { ArrowSquareOut, CaretLeft, CaretRight } from "phosphor-react-sc";
import Text from "@/components/Text";
import Link from "@/components/Link";
import { metadata } from "../../layout";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: { locale: string; id: string };
}) {
  const collection = await fetchCollection(props.params.id);

  return {
    title: collection.name[props.params.locale],
    description: collection.description[props.params.locale],
    keywords: [
      ...metadata.keywords,
      collection.name[props.params.locale],
      collection.chain,
      collection.type,
    ],
    openGraph: {
      images: [collection.image],
    },
    twitter: {
      images: [collection.image],
    },
  } satisfies Metadata;
}

export default async function Collect(props: {
  params: { locale: string; id: string };
}) {
  const collection = await fetchCollection(props.params.id);

  return (
    <main className="mb-4">
      <div
        style={{
          backgroundImage: `url(${collection.background || collection.image})`,
        }}
        className="relative h-[calc(100vh_-_2.25rem)] bg-no-repeat bg-cover bg-center flex items-center justify-center transition-all"
      >
        <div className="absolute top-0 w-full h-full">
          <div className="from-black to-transparent bg-gradient-to-t h-1/6 w-full bottom-0 z-10 absolute" />
          <div className="w-full h-full backdrop-blur-[64px] brightness-75"></div>
        </div>
        <div className="absolute z-10 left-16 h-full flex items-center justify-center">
          <Link
            href={
              collection.previous
                ? `/${props.params.locale}/collect/${collection.previous}`
                : ""
            }
            className={
              collection.previous
                ? "pointer-events-auto"
                : "pointer-events-none"
            }
            scroll={false}
          >
            <CaretLeft
              className={`${
                collection.previous ? "text-white" : "text-black/25"
              } w-10 h-10 cursor-pointer`}
              weight="bold"
            />
          </Link>
        </div>
        <div className="absolute z-10 right-16 h-full flex items-center justify-center">
          <Link
            href={
              collection.next
                ? `/${props.params.locale}/collect/${collection.next}`
                : ""
            }
            className={
              collection.next ? "pointer-events-auto" : "pointer-events-none"
            }
            scroll={false}
          >
            <CaretRight
              className={`${
                collection.next ? "text-white" : "text-black/25"
              } w-10 h-10 cursor-pointer`}
              weight="bold"
            />
          </Link>
        </div>
        <div className="relative w-full h-full flex px-64 gap-16">
          <Link
            href={collection.url}
            className="w-full h-full flex items-center"
          >
            <img
              draggable={false}
              src={collection.image}
              className="w-full rounded-2xl select-none drop-shadow-2xl"
            />
          </Link>
          <div className="w-full h-full flex flex-col justify-center gap-8">
            <h1 className="text-5xl text-white font-bebas-neue">
              <Text {...collection.name} />
            </h1>
            <p className="text-lg text-white font-cabin">
              <Text {...collection.description} />
            </p>
            <div className="flex gap-4 items-center">
              <CollectButton collection={collection} />
              <Link
                href={collection.url}
                className="flex items-center group gap-1 select-none text-white hover:text-white/80 transition-colors"
              >
                <ArrowSquareOut
                  weight="bold"
                  className="w-5 h-5 text-white group-hover:text-white/80 transition-colors"
                />
                <Text en="Open" pt="Abrir" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
