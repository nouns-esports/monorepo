import { ArrowSquareOut } from "phosphor-react-sc";
import { metadata } from "@/app/layout";
import type { Metadata } from "next";
import Link from "@/components/Link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTalent } from "@/server/queries/talent";
import { getCommunityRosters } from "@/server/queries/communities";

export async function generateMetadata(props: { params: { id: string } }) {
  const rosters = await getCommunityRosters({ community: props.params.id });

  if (rosters.length < 1) {
    return notFound();
  }

  const community = rosters[0].community;

  return {
    title: community.name,
    description: `Learn more about our ${community.name} roster${rosters.length > 1 ? "s" : ""}!`,
    keywords: [
      ...metadata.keywords,
      community.name,
      ...rosters
        .map((roster) => roster.talent.map((t) => t.name.toLowerCase()))
        .flat(),
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
  const rosters = await getCommunityRosters({ community: props.params.id });

  if (rosters.length < 1) {
    return notFound();
  }

  const community = rosters[0].community;

  return (
    <div className="flex flex-col gap-12 max-lg:gap-8 pt-36 max-xl:pt-28 max-sm:pt-24 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      <div className="flex gap-4 items-center">
        <img src={community.image} className="h-12 aspect-square rounded-lg" />
        <h1 className="font-luckiest-guy text-white text-4xl">
          {rosters.length > 1 ? community.name : rosters[0].name}
        </h1>
      </div>
      <div className="flex flex-col gap-16">
        {rosters.map((roster) => (
          <div className="flex flex-col gap-4">
            {rosters.length > 1 ? (
              <h2 className="font-bebas-neue text-4xl text-white">
                {roster.name}
              </h2>
            ) : (
              ""
            )}
            <div className="flex -mx-16 max-xl:-mx-8 px-16 max-xl:px-8 gap-4 max-xl:gap-4 w-[calc(100%_+_8rem)] max-xl:w-[calc(100%_+_4rem)] max-xl:overflow-x-scroll">
              {roster.talent
                .sort((a, b) =>
                  a.role === "Coach" ? -1 : b.role === "Coach" ? 1 : 0
                )
                .map((person) => (
                  <Link
                    key={person.id}
                    href={person.liquipedia ?? ""}
                    className="relative bg-red max-lg:bg-grey-800 select-none aspect-[21/30] w-full flex max-lg:w-60 max-lg:flex-shrink-0 rounded-xl border-fix group cursor-pointer overflow-hidden"
                    style={{
                      maxWidth: roster.talent.length < 5 ? "18rem" : "100%",
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
        ))}
      </div>
    </div>
  );
}
