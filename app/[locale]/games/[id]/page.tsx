import { Game, Talent } from "@/db/schema";
import fetchGame from "@/utils/server/fetchGame";
import fetchRoster from "@/utils/server/fetchRoster";
import { ArrowSquareOut } from "phosphor-react-sc";
import Text from "@/components/Text";
import GameBorder from "@/components/GameBorder";
import { metadata } from "@/app/[locale]/layout";
import { Metadata } from "next";
import Link from "@/components/Link";
import Image from "next/image";

export async function generateMetadata(props: { params: { id: string } }) {
  const game = await fetchGame(props.params.id);

  const players = (await fetchRoster(game.id, game.roster)).map((person) =>
    person.name.toLowerCase()
  );

  return {
    title: game.name,
    description: `Learn more about our ${game.name} roster!`,
    keywords: [...metadata.keywords, game.name, ...players],
    openGraph: {
      images: [game.image],
    },
    twitter: {
      images: [game.image],
    },
  } satisfies Metadata;
}

export default async function Game(props: { params: { id: string } }) {
  const game = await fetchGame(props.params.id);

  const roster = await fetchRoster(game.id, game.roster);

  return (
    <>
      <div className="relative grid place-items-center h-[500px]">
        <Image
          src={game.image}
          fill
          objectFit="cover"
          objectPosition="center"
          sizes="100vw"
          alt={`Nouns Esports' ${game.name} banner`}
          priority
          className="absolute top-0 -z-10 brightness-50"
        />
        <div className="w-full h-full grid place-items-center shadow-[inset_-60px_-60px_100px_black,inset_60px_60px_100px_black]">
          <h1 className="text-white text-8xl max-lg:text-6xl max-md:text-5xl max-[500px]:text-4xl font-luckiest-guy">
            {game.name}
          </h1>
        </div>
      </div>
      <GameBorder>
        <GameSection
          title={<Text en="ROSTER" pt="ROSTER" />}
          href={game.liquipedia ?? ""}
        >
          <div className="flex -mx-16 max-xl:-mx-8 px-16 max-xl:px-8 gap-8 max-xl:gap-4 w-[calc(100%_+_8rem)] max-xl:w-[calc(100%_+_4rem)] max-xl:overflow-x-scroll">
            {roster.map((person) => (
              <RosterCard key={person.id} game={game} person={person} />
            ))}
          </div>
        </GameSection>
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

function RosterCard(props: { person: Talent; game: Game }) {
  return (
    <div
      className="relative select-none aspect-[21/30] w-full flex max-lg:w-60 max-lg:flex-shrink-0 rounded-xl border-fix group cursor-pointer overflow-hidden"
      style={{
        backgroundColor: props.game.color,
        maxWidth: props.game.roster.length < 5 ? "18rem" : "100%",
      }}
    >
      <Image
        src={props.person.image}
        alt={props.person.name}
        fill
        objectFit="contain"
        className="w-full pt-8 z-10 group-hover:translate-y-[4.5rem] max-lg:translate-y-[4.5rem] transition-transform"
      />
      <div className="absolute top-6 w-full text-center">
        <h3 className="font-luckiest-guy text-4xl text-white">
          {props.person.name}
        </h3>
        <p className="font-cabin text-white font-semibold">
          {props.person.role}
        </p>
      </div>
      <div className="absolute h-full w-full bg-darkgrey rounded-[0.6rem] group-hover:opacity-0 opacity-1 max-lg:opacity-0 transition-opacity"></div>
    </div>
  );
}
