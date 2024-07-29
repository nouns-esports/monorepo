import { ArrowSquareOut } from "phosphor-react-sc";
import { metadata } from "@/app/layout";
import type { Metadata } from "next";
import Link from "@/components/Link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getRosters } from "@/server/queries/rosters";
import { getTalent } from "@/server/queries/talent";

export async function generateMetadata(props: { params: { id: string } }) {
  const rosters = await getRosters({ community: props.params.id });

  if (rosters.length < 1) {
    return notFound();
  }

  const community = rosters[0].community;

  const talents = [];

  for (const roster of rosters) {
    talents.push(
      ...(await getTalent({ roster: roster.id })).map((t) =>
        t.name.toLowerCase()
      )
    );
  }

  return {
    title: community.name,
    description: `Learn more about our ${community.name} roster${rosters.length > 1 ? "s" : ""}!`,
    keywords: [
      ...metadata.keywords,
      community.name,
      ...talents,
      ...rosters.map((roster) => roster.name),
    ],
    openGraph: {
      images: [community.image],
    },
    twitter: {
      images: [community.image],
    },
  } satisfies Metadata;
}

export default async function RosterPage(props: { params: { id: string } }) {
  const rosters = await getRosters({ community: props.params.id });

  if (rosters.length < 1) {
    return notFound();
  }

  const community = rosters[0].community;

  return (
    <>
      <div className="relative grid place-items-center h-[500px] max-sm:h-80">
        <Image
          src={community.image}
          fill
          sizes="100vw"
          alt={`Nouns Esports' ${community.name} banner`}
          priority
          className="absolute top-0 -z-10 brightness-50 object-cover object-center"
        />
        <div className="w-full h-full grid place-items-center shadow-[inset_-60px_-60px_100px_black,inset_60px_60px_100px_black]">
          <h1 className="text-white text-8xl max-lg:text-6xl max-md:text-5xl max-[500px]:text-4xl font-luckiest-guy">
            {community.name}
          </h1>
        </div>
      </div>
      <div className="bg-black p-16 max-lg:p-8 gap-16 max-lg:gap-8 flex flex-col border-t-4 rounded-t-[4rem] max-lg:rounded-t-[2rem] border-red -mt-16 relative z-10">
        {rosters.map(async (roster) => {
          const talent = await getTalent({ roster: roster.id });
          return (
            <div key={roster.id} className="flex flex-col gap-4">
              <div className="w-full justify-between flex items-center">
                <h2 className="font-bebas-neue text-white text-4xl">
                  {roster.id === community.id ? "ROSTER" : roster.name}
                </h2>
                {roster.liquipedia ? (
                  <Link href={roster.liquipedia}>
                    <ArrowSquareOut
                      weight="bold"
                      className="w-6 h-6 text-white hover:text-white/60 transition-colors"
                    />
                  </Link>
                ) : (
                  ""
                )}
              </div>
              <div className="flex -mx-16 max-xl:-mx-8 px-16 max-xl:px-8 gap-8 max-xl:gap-4 w-[calc(100%_+_8rem)] max-xl:w-[calc(100%_+_4rem)] max-xl:overflow-x-scroll">
                {talent
                  .sort((a, b) =>
                    a.role === "Coach" ? -1 : b.role === "Coach" ? 1 : 0
                  )
                  .map((person) => (
                    <Link
                      key={person.id}
                      href={person.liquipedia ?? ""}
                      className="relative bg-red select-none aspect-[21/30] w-full flex max-lg:w-60 max-lg:flex-shrink-0 rounded-xl border-fix group cursor-pointer overflow-hidden"
                      style={{
                        maxWidth: talent.length < 5 ? "18rem" : "100%",
                      }}
                    >
                      <Image
                        src={person.image ?? "/talent/silhouette.webp"}
                        style={{
                          filter: person.image ? "none" : "brightness(20%)",
                        }}
                        alt={person.name}
                        fill
                        className="w-full pt-8 z-10 group-hover:translate-y-[4.5rem] max-lg:translate-y-[4.5rem] transition-transform object-contain"
                      />
                      <div className="absolute top-6 w-full text-center">
                        <h3 className="font-luckiest-guy text-4xl text-white">
                          {person.name}
                        </h3>
                        <p className="font-cabin text-white font-semibold">
                          {person.role}
                        </p>
                      </div>
                      <div className="absolute h-full w-full bg-grey-800 rounded-[0.6rem] group-hover:opacity-0 opacity-1 max-lg:opacity-0 transition-opacity" />
                    </Link>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
