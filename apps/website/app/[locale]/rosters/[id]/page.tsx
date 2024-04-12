import { Game, Roster, Talent } from "@/db/schema";
import { ArrowSquareOut } from "phosphor-react-sc";
import GameBorder from "@/components/GameBorder";
import { metadata } from "@/app/[locale]/layout";
import { Metadata } from "next";
import Link from "@/components/Link";
import Image from "next/image";
import { query } from "@/app/api/query/server";
import { notFound } from "next/navigation";

export async function generateMetadata(props: { params: { id: string } }) {
  const game = await query.getGame({
    id: props.params.id,
  });

  if (!game) notFound();

  const rosters = await query.getRosters({ game: game.id });

  const talents = [];

  for (const roster of rosters) {
    talents.push(
      ...(await query.getTalent({ roster: roster.id })).map((t) =>
        t.name.toLocaleLowerCase()
      )
    );
  }

  return {
    title: game.name,
    description: `Learn more about our ${game.name} roster!`,
    keywords: [
      ...metadata.keywords,
      game.name,
      ...talents,
      ...rosters.map((roster) => roster.name),
    ],
    openGraph: {
      images: [game.image],
    },
    twitter: {
      images: [game.image],
    },
  } satisfies Metadata;
}

export default async function RosterPage(props: { params: { id: string } }) {
  const game = await query.getGame({
    id: props.params.id,
  });

  if (!game) notFound();

  const rosters = await query.getRosters({ game: game.id });

  return (
    <>
      <div className="relative grid place-items-center h-[500px] max-sm:h-80">
        <Image
          src={game.image}
          fill
          sizes="100vw"
          alt={`Nouns Esports' ${game.name} banner`}
          priority
          className="absolute top-0 -z-10 brightness-50 object-cover object-center"
        />
        <div className="w-full h-full grid place-items-center shadow-[inset_-60px_-60px_100px_black,inset_60px_60px_100px_black]">
          <h1 className="text-white text-8xl max-lg:text-6xl max-md:text-5xl max-[500px]:text-4xl font-luckiest-guy">
            {game.name}
          </h1>
        </div>
      </div>
      <GameBorder>
        {rosters.map(async (roster) => {
          const talent = await query.getTalent({ roster: roster.id });
          return (
            <GameSection
              key={roster.id}
              title={roster.id === game.id ? "ROSTER" : roster.name}
              href={roster.liquipedia}
            >
              <div className="flex -mx-16 max-xl:-mx-8 px-16 max-xl:px-8 gap-8 max-xl:gap-4 w-[calc(100%_+_8rem)] max-xl:w-[calc(100%_+_4rem)] max-xl:overflow-x-scroll">
                {talent
                  .sort((a, b) =>
                    a.role === "Coach" ? -1 : b.role === "Coach" ? 1 : 0
                  )
                  .map((person) => (
                    <RosterCard
                      key={person.id}
                      game={game}
                      count={talent.length}
                      person={person}
                    />
                  ))}
              </div>
            </GameSection>
          );
        })}
      </GameBorder>
    </>
  );
}

function GameSection(props: {
  href?: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full justify-between flex items-center">
        <h2 className="font-bebas-neue text-white text-4xl">{props.title}</h2>
        {props.href ? (
          <Link href={props.href}>
            <ArrowSquareOut
              weight="bold"
              className="w-6 h-6 text-white hover:text-white/60 transition-colors"
            />
          </Link>
        ) : (
          ""
        )}
      </div>
      {props.children}
    </div>
  );
}

function RosterCard(props: { person: Talent; game: Game; count: number }) {
  return (
    <Link
      href={props.person.liquipedia ?? ""}
      className="relative select-none aspect-[21/30] w-full flex max-lg:w-60 max-lg:flex-shrink-0 rounded-xl border-fix group cursor-pointer overflow-hidden"
      style={{
        backgroundColor: props.game.color,
        maxWidth: props.count < 5 ? "18rem" : "100%",
      }}
    >
      <Image
        src={props.person.image ?? "/talent/silhouette.webp"}
        style={{ filter: props.person.image ? "none" : "brightness(20%)" }}
        alt={props.person.name}
        fill
        className="w-full pt-8 z-10 group-hover:translate-y-[4.5rem] max-lg:translate-y-[4.5rem] transition-transform object-contain"
      />
      <div className="absolute top-6 w-full text-center">
        <h3 className="font-luckiest-guy text-4xl text-white">
          {props.person.name}
        </h3>
        <p className="font-cabin text-white font-semibold">
          {props.person.role}
        </p>
      </div>
      <div className="absolute h-full w-full bg-darkgrey rounded-[0.6rem] group-hover:opacity-0 opacity-1 max-lg:opacity-0 transition-opacity" />
    </Link>
  );
}
