import Button from "../components/Button";
import Marquee from "react-fast-marquee";
import {
  TwitchLogo,
  TwitterLogo,
  YoutubeLogo,
  TiktokLogo,
  DiscordLogo,
  PlayCircle,
  InstagramLogo,
} from "phosphor-react-sc";
import Link from "next/link";
import { Game, Project } from "@/db/schema";
import Text from "@/components/Text";
import HighlightedText from "@/components/HighlightedText";
import fetchEvents from "@/utils/fetchEvents";
import fetchGames from "@/utils/fetchGames";
import fetchProjects from "@/utils/fetchProjects";
import type { Event } from "@/utils/fetchEvents";
import Date from "@/components/Date";
import GameCard from "@/components/GameCard";

export default async function Home() {
  const events = await fetchEvents();

  const games = await fetchGames();

  const projects = await fetchProjects();

  return (
    <main className="cursor-crosshair flex flex-col">
      <div className="relative h-screen bg-cover flex flex-col justify-center items-center gap-8 shadow-[inset_-80px_-80px_120px_black,inset_80px_80px_120px_black] max-sm:shadow-[inset_-40px_-40px_60px_black,inset_40px_40px_60px_black]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute select-none w-full h-full object-cover max-[500px]:object-right object-top brightness-75 -z-10"
        >
          <source src="/landing.webm" type="video/webm" />
          <source src="/landing.mp4" type="video/mp4" />
        </video>

        <h1 className="text-white text-6xl w-1/2 text-center font-luckiest-guy max-lg:w-full max-lg:px-16 max-sm:px-8 max-md:text-5xl max-[450px]:text-4xl">
          <HighlightedText
            text={{
              en: "Leading the revolution in community driven esports",
              pt: "Liderando a revolução nos esports conduzidos pela comunidade",
            }}
            highlight={{
              en: ["community", "esports"],
              pt: ["comunidade", "esports"],
            }}
            color="#E93737"
          />
        </h1>
        <div className="flex gap-8 max-md:flex-col items-center">
          <Button href="/discord">
            <Text en="Get Involved" pt="Envolver-se" />
          </Button>
          <a
            href="https://www.youtube.com/watch?v=SAXzMQ8pPvE"
            rel="noopener noreferrer"
            target="_blank"
            className="text-white hover:text-white/60 transition-colors group font-cabin flex gap-2 items-center"
          >
            <PlayCircle
              weight="bold"
              className="w-7 h-7 text-white transition-colors group-hover:text-white/60"
            />
            <Text en="Watch Video" pt="Assista o vídeo" />
          </a>
        </div>
        <div className="flex max-[450px]:flex-col gap-4 w-fit items-center">
          <div className="flex gap-4 items-center">
            <a href="/twitch" target="_blank" rel="noopener noreferrer">
              <TwitchLogo
                className="w-9 h-9 text-white hover:text-white/60 cursor-pointer transition-colors"
                weight="fill"
              />
            </a>
            <a href="/x" target="_blank" rel="noopener noreferrer">
              <TwitterLogo
                className="w-9 h-9 text-white hover:text-white/60 cursor-pointer transition-colors"
                weight="fill"
              />
            </a>
            <a href="/youtube" target="_blank" rel="noopener noreferrer">
              <YoutubeLogo
                className="w-9 h-9 text-white hover:text-white/60 cursor-pointer transition-colors"
                weight="fill"
              />
            </a>
          </div>
          <div className="flex gap-4 items-center">
            <a href="/tiktok" target="_blank" rel="noopener noreferrer">
              <TiktokLogo
                className="w-9 h-9 text-white hover:text-white/60 cursor-pointer transition-colors"
                weight="fill"
              />
            </a>
            <a href="/discord" target="_blank" rel="noopener noreferrer">
              <DiscordLogo
                className="w-9 h-9 text-white hover:text-white/60 cursor-pointer transition-colors"
                weight="fill"
              />
            </a>
            <a href="/instagram" target="_blank" rel="noopener noreferrer">
              <InstagramLogo
                className="w-9 h-9 text-white hover:text-white/60 cursor-pointer transition-colors"
                weight="fill"
              />
            </a>
          </div>
        </div>
      </div>
      <Marquee autoFill className="bg-red flex items-center h-8">
        <img src="/logo-white.svg" className="w-4 h-4 select-none" />
        <p className="px-4 text-white text-lg font-bebas-neue pt-[0.19rem]">
          <Text en="Join the revolution" pt="Junte-se à revolução" />
        </p>
      </Marquee>
      <div
        id="games"
        className="px-16 max-sm:px-0 py-32 max-sm:py-16 text-center text-white text-5xl font-luckiest-guy flex flex-col gap-20 max-sm:gap-10 items-center"
      >
        <Text en="Our Games" pt="Nossos Jogos" />
        <div className="flex flex-wrap max-sm:flex-nowrap max-sm:overflow-x-scroll max-sm:justify-start justify-center max-w-[1920px] gap-16 w-full max-2xl:gap-8">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
      <div className="relative py-32 max-sm:py-20">
        <img
          src="/clips.webp"
          alt="POG image"
          className="absolute top-0 w-full h-full select-none object-cover object-center -z-10 brightness-[40%]"
        />
        <div className="relative z-10 grid place-items-center gap-10 max-sm:gap-6">
          <h2 className="text-white font-luckiest-guy text-8xl max-sm:text-6xl">
            POG
          </h2>
          <p className="max-w-[500px] px-8 text-center text-[#AAAAAA] text-lg max-sm:text-base leading-tight [text-shadow:black_0_0_30px]">
            <Text
              en="POG is a platform by Nouns Esports that lets anyone showcase their clips from any multiplayer game and earn real money in the process."
              pt="POG é uma plataforma da Nouns Esports que permite a qualquer pessoa mostrar seus clipes de qualquer jogo multiplayer e ganhar dinheiro real no processo."
            />
          </p>
          <Button href="https://pog.nouns.gg">
            <Text en="Explore" pt="Explorar" />
          </Button>
        </div>
        <div className="from-black via-black/70/ to-transparent bg-gradient-to-b h-64 w-full top-0 absolute" />
        <div className="from-transparent to-black bg-gradient-to-b h-64 w-full bottom-0 absolute" />
      </div>

      <div className="px-16 max-sm:px-0 py-32 max-sm:py-16 text-white text-5xl text-center font-luckiest-guy flex flex-col gap-20 max-sm:gap-10 items-center">
        <Text en="Upcoming Events" pt="Próximos Eventos" />
        <div className="flex flex-wrap max-sm:flex-nowrap max-sm:overflow-x-scroll max-sm:justify-start justify-center max-w-[1920px] gap-16 w-full max-2xl:gap-8">
          {events.map((event) => (
            <ScheduleCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      <div className="px-16 max-sm:px-0 pb-32 max-sm:pb-16 text-white text-5xl font-luckiest-guy flex flex-col gap-20 max-sm:gap-10 items-center">
        <Text en="Projects" pt="Projetos" />
        <div className="flex flex-wrap max-sm:flex-nowrap max-sm:overflow-x-scroll max-sm:justify-start justify-center max-w-[1920px] gap-16 w-full max-2xl:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <h2 className="text-white text-5xl font-luckiest-guy z-10 relative  text-center leading-normal px-16 max-sm:text-4xl max-sm:leading-relaxed">
          <HighlightedText
            text={{
              en: "Lets redefine esports together!",
              pt: "Vamos redefinir os esportes juntos!",
            }}
            highlight={{
              en: ["redefine"],
              pt: ["redefinir"],
            }}
            color="#51D06D"
            underline
          />
        </h2>
      </div>
      <div className="relative mb-8">
        <img src="/pokemon.webp" className="w-full" />
        <div className="from-black via-black/70 to-transparent bg-gradient-to-b h-2/5 w-full top-0 absolute"></div>
        <div className="from-transparent to-black bg-gradient-to-b h-2/5 w-full bottom-0 absolute"></div>
      </div>
    </main>
  );
}

async function ScheduleCard(props: { event: Event }) {
  const type = props.event.summary?.split("]")[0].replace("[", "");

  const game = (await fetchGames()).find((game) =>
    game.name.toLowerCase().includes(type.toLowerCase())
  );

  return (
    <Link
      href={props.event.htmlLink}
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-[calc(33.33%_-_2.67rem)] max-xl:w-[calc(33.33%_-_2.67rem)] max-sm:first:ml-8 max-sm:last:mr-8 max-sm:min-w-[calc(100%_-_6rem)] min-w-[24rem] overflow-hidden select-none aspect-video text-left rounded-xl group drop-shadow-2xl"
    >
      <img
        src={game?.image ?? "/contributor.webp"}
        alt={props.event.summary}
        className="object-cover object-center group-hover:scale-110 transition-transform absolute top-0 w-full h-full"
      />
      <div className="relative z-10 flex flex-col-reverse py-4 px-6 max-sm:py-3.5 max-sm:px-5 w-full h-full shadow-[inset_-20px_-20px_80px_black,inset_20px_20px_80px_black]">
        <p className="text-lightgrey text-base font-cabin">
          <Date timestamp={props.event.start.dateTime} />
        </p>
        <h3 className="drop-shadow-2xl text-4xl font-bebas-neue max-[500px]:text-2xl max-[350px]:text-xl">
          {props.event.summary?.replace(`[${type}]`, "")}
        </h3>
        <div
          style={{ backgroundColor: game?.color ?? "#E93737" }}
          className="text-xs font-cabin font-semibold px-2 py-1 rounded-full w-min mb-2 max-[500px]:mb-1"
        >
          {type}
        </div>
      </div>
    </Link>
  );
}

function ProjectCard(props: { project: Project }) {
  return (
    <Link
      href={props.project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-[calc(25%_-_3rem)] max-xl:w-[calc(25%_-_1.5rem)] max-sm:first:ml-8 max-sm:last:mr-8 max-sm:min-w-[calc(100%_-_6rem)] min-w-[20rem] overflow-hidden select-none aspect-video rounded-xl group drop-shadow-2xl"
    >
      <img
        src={props.project.image}
        alt={props.project.name}
        className="object-cover object-center group-hover:scale-110 brightness-[85%] transition-transform absolute top-0 w-full h-full"
      />
      <div className="relative z-10 grid place-items-center w-full h-full shadow-[inset_-20px_-20px_80px_black,inset_20px_20px_80px_black]">
        <h3 className="text-4xl font-bebas-neue [text-shadow:black_0_0_30px]">
          {props.project.name}
        </h3>
      </div>
    </Link>
  );
}
