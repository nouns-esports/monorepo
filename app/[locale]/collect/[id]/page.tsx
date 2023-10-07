import CollectButton from "@/components/CollectButton";
import fetchCollection from "@/utils/fetchCollection";
import { CaretLeft, CaretRight } from "phosphor-react-sc";
import Text from "@/components/Text";
import Link from "next/link";
import { metadata } from "../../layout";

export async function generateMetadata(props: {
  params: { locale: string; id: string };
}) {
  const collection = await fetchCollection(props.params.id);

  return {
    title: collection.name[props.params.locale],
    description: collection.description[props.params.locale],
    image: collection.image,
    keywords: [
      ...metadata.keywords,
      collection.name,
      collection.chain,
      collection.type,
    ],
    openGraph: {
      images: [collection.image],
    },
    twitter: {
      images: [collection.image],
    },
  };
}

export default async function Collect(props: { params: { id: string } }) {
  const collection = await fetchCollection(props.params.id);

  return (
    <main className="mb-4">
      <div
        style={{
          backgroundImage: `url(${collection.image})`,
        }}
        className="relative h-[calc(100vh_-_2.25rem)] bg-no-repeat bg-cover bg-center flex items-center justify-center transition-all"
      >
        <div className="absolute top-0 w-full h-full">
          <div className="from-black to-transparent bg-gradient-to-t h-1/6 w-full bottom-0 z-10 absolute" />
          <div className="w-full h-full backdrop-blur-[64px] brightness-75"></div>
        </div>
        <div className="absolute z-10 left-16 h-full flex items-center justify-center">
          <Link
            href={collection.previous ? `/collect/${collection.previous}` : ""}
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
            href={collection.next ? `/collect/${collection.next}` : ""}
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
          <div className="w-full h-full flex items-center">
            <img
              draggable={false}
              src={collection.image}
              className="w-full rounded-2xl select-none drop-shadow-2xl"
            />
          </div>
          <div className="w-full h-full flex flex-col justify-center gap-8">
            <h1 className="text-5xl text-white font-bebas-neue select-none">
              <Text {...collection.name} />
            </h1>
            <p className="text-lg text-white font-cabin select-none">
              <Text {...collection.description} />
            </p>
            <CollectButton collection={collection} />
          </div>
        </div>
      </div>
    </main>
  );
}
