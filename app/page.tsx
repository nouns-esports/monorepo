"use client";

import Button from "../components/Button";
import Marquee from "react-fast-marquee";
import { Locale, useDictionary } from "../lang/dictionaries";
import Line from "../components/Line";
import {
  TwitchLogo,
  TwitterLogo,
  YoutubeLogo,
  TiktokLogo,
  DiscordLogo,
  PlayCircle,
  InstagramLogo,
} from "@phosphor-icons/react";
import Link from "next/link";
import { Game, Project } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Home() {
  const { locale, dictionary } = useDictionary();

  function highlightTagline(text: string, words: Record<Locale, string[]>) {
    return text.split(" ").map((word) => {
      if (words[locale || "en"].includes(word)) {
        return <span className="text-red">{word} </span>;
      }

      return `${word} `;
    });
  }

  function highlightRedefineEsports(
    text: string,
    words: Record<Locale, string>
  ) {
    return text.split(" ").map((word) => {
      if (words[locale || "en"] === word) {
        return (
          <span className="text-[#51D06D] relative">
            <Line />
            {word}{" "}
          </span>
        );
      }

      return `${word} `;
    });
  }

  // const query = useQuery({
  //   queryKey: ["events"],
  //   queryFn: async () => {
  //     const response = await fetch(
  //       "https://www.googleapis.com/calendar/v3/calendars/2gl6iku9kcb2qjdrtgdthgng3s@group.calendar.google.com/events?" +
  //         // @ts-ignore
  //         new URLSearchParams({
  //           singleEvents: "true",
  //           orderBy: "startTime",
  //           timeMin: new Date().toISOString(),
  //           maxResults: "3",
  //           key: process.env.GOOGLE_CALENDAR,
  //         })
  //     );

  //     const calendar = await response.json();

  //     return calendar.items;
  //   },
  // });

  // useEffect(() => {
  //   console.log(query.data);
  // }, [query.data]);

  const games: Game[] = [];
  const projects: Project[] = [];

  return (
    <main className="cursor-crosshair flex flex-col">
      <div className="h-screen bg-cover flex flex-col justify-center items-center gap-8 shadow-[inset_-80px_-80px_120px_black,inset_80px_80px_120px_black]">
        <video
          autoPlay
          muted
          loop
          src="/landing.webm"
          className="absolute top-9 select-none w-full h-full object-cover object-top brightness-75 -z-10"
        />

        <h1 className="text-white text-6xl w-1/2 text-center font-luckiest-guy max-lg:w-full max-lg:px-16 max-sm:px-8 max-md:text-5xl max-[450px]:text-4xl">
          {highlightTagline(dictionary("tagline"), {
            en: ["community", "esports"],
            pt: ["comunidade", "esportes"],
          })}
        </h1>
        <div className="flex gap-8 max-md:flex-col items-center">
          <Button href="/about">{dictionary("learnMore")}</Button>
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
            {dictionary("watchVideo")}
          </a>
        </div>
        <div className="flex gap-4 w-fit items-center">
          <TwitchLogo
            className="w-9 h-9 text-white hover:text-white/60 cursor-pointer transition-colors"
            weight="fill"
          />
          <TwitterLogo
            className="w-9 h-9 text-white hover:text-white/60 cursor-pointer transition-colors"
            weight="fill"
          />
          <YoutubeLogo
            className="w-9 h-9 text-white hover:text-white/60 cursor-pointer transition-colors"
            weight="fill"
          />
          <TiktokLogo
            className="w-9 h-9 text-white hover:text-white/60 cursor-pointer transition-colors"
            weight="fill"
          />
          <DiscordLogo
            className="w-9 h-9 text-white hover:text-white/60 cursor-pointer transition-colors"
            weight="fill"
          />
          <InstagramLogo
            className="w-9 h-9 text-white hover:text-white/60 cursor-pointer transition-colors"
            weight="fill"
          />
        </div>
      </div>
      <Marquee autoFill className="bg-red flex items-center h-8">
        <img src="/logo-white.svg" className="w-4 h-4 select-none" />
        <p className="px-4 text-white text-lg font-bebas-neue pt-[0.19rem]">
          {dictionary("marquee")}
        </p>
      </Marquee>
      {/* <h2 className="flex items-center py-8 text-white font-luckiest-guy text-6xl">
        Funded So Far
      </h2> */}
      {/* <div className="flex gap-4 items-center justify-center py-32 relative">
        <p className="text-white font-luckiest-guy text-6xl">$1,234,567 x</p>
        <img src="/coin2.gif" className="w-16 h-16" />
        <img
          src="/pipe.png"
          className="rotate-90 absolute left-0 top-16 h-32"
        />
      </div> */}

      {/* <div className="h-screen "> */}
      {/* 
        We have funded x amount of (players, teams, projects) section so far (the number animates ticking up to the amount)
        - Maybe like retro mario style and incorporate the coins as the amount

        Nouns esports is 
        - transparent
        - community driven
        - nounish (anything, anyone, anywhere)
        */}
      {/* </div> */}
      <div
        id="games"
        className="px-16 max-sm:px-0 py-32 max-sm:py-16 text-center text-white text-5xl font-luckiest-guy flex flex-col gap-20 max-sm:gap-10 items-center"
      >
        {dictionary("ourGames")}
        <div className="flex flex-wrap max-sm:flex-nowrap max-sm:overflow-x-scroll max-sm:justify-start justify-center max-w-[1920px] gap-16 w-full max-2xl:gap-8">
          {/* {games
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((game) => (
              <GameCard game={game} />
            ))} */}
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
            {dictionary("pog")}
          </p>
          <Button href="https://pog.nouns.gg">{dictionary("explore")}</Button>
        </div>
        <div className="from-black via-black/70/ to-transparent bg-gradient-to-b h-64 w-full top-0 absolute" />
        <div className="from-transparent to-black bg-gradient-to-b h-64 w-full bottom-0 absolute" />
      </div>

      <div className="px-16 max-sm:px-0 py-32 max-sm:py-16 text-white text-5xl text-center font-luckiest-guy flex flex-col gap-20 max-sm:gap-10 items-center">
        {dictionary("upcomingEvents")}
        <div className="flex flex-wrap max-sm:flex-nowrap max-sm:overflow-x-scroll max-sm:justify-start justify-center max-w-[1920px] gap-16 w-full max-2xl:gap-8">
          {/* {schedule.map((event) => (
            <ScheduleCard event={event} />
          ))} */}
        </div>
      </div>
      <div className="px-16 max-sm:px-0 pb-32 max-sm:pb-16 text-white text-5xl font-luckiest-guy flex flex-col gap-20 max-sm:gap-10 items-center">
        {dictionary("projects")}
        <div className="flex flex-wrap max-sm:flex-nowrap max-sm:overflow-x-scroll max-sm:justify-start justify-center max-w-[1920px] gap-16 w-full max-2xl:gap-8">
          {/* {projects.map((project) => (
            <ProjectCard project={project} />
          ))} */}
        </div>
      </div>
      <div className="flex flex-col gap-12 items-center justify-center ">
        <h2 className="text-white text-5xl font-luckiest-guy">
          {highlightRedefineEsports(dictionary("redefineEsports"), {
            en: "redefine",
            pt: "redefinir",
          })}
        </h2>
        <Button href="">{dictionary("joinUs")}</Button>
      </div>
      <div className="relative mb-8">
        <img src="/pokemon.jpg" className="w-full" />
        <div className="from-black via-black/70 to-transparent bg-gradient-to-b h-64 w-full top-0 absolute"></div>
        <div className="from-transparent to-black bg-gradient-to-b h-64 w-full bottom-0 absolute"></div>
      </div>
    </main>
  );
}

function GameCard(props: { game: Game }) {
  return (
    <Link
      href={`/games/${props.game.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/ /g, "-")}`}
      style={{ backgroundImage: `url(${props.game.image})` }}
      className="relative w-[calc(25%_-_3rem)] max-xl:w-[calc(25%_-_1.5rem)] max-sm:first:ml-8 max-sm:last:mr-8 max-sm:min-w-[calc(100%_-_6rem)] min-w-[12rem] rounded-xl select-none aspect-square group overflow-hidden"
    >
      <img
        src={props.game.image}
        alt={props.game.name}
        className="object-cover object-center absolute w-full top-0 h-full brightness-[85%] group-hover:scale-110 transition-transform"
      />
      <div className="relative z-10 w-full h-full grid place-items-center shadow-[inset_-20px_-20px_80px_black,inset_20px_20px_80px_black]">
        <h3 className="drop-shadow-2xl text-center p-4 text-5xl max-2xl:text-4xl max-sm:text-3xl font-bebas-neue [text-shadow:black_0_0_30px]">
          {props.game.name}
        </h3>
      </div>
    </Link>
  );
}

function ScheduleCard(props: { event: any }) {
  return (
    <Link
      href={props.event.htmlLink}
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-[calc(33.33%_-_2.67rem)] max-xl:w-[calc(33.33%_-_2.67rem)] max-sm:first:ml-8 max-sm:last:mr-8 max-sm:min-w-[calc(100%_-_6rem)] min-w-[24rem] overflow-hidden select-none aspect-video text-left rounded-xl group drop-shadow-2xl"
    >
      <img
        // src={game?.image || "/contributor.webp"}
        alt={props.event.summary}
        className="object-cover object-center group-hover:scale-110 transition-transform absolute top-0 w-full h-full"
      />
      <div className="relative z-10 flex flex-col-reverse py-4 px-6 max-sm:py-3.5 max-sm:px-5 w-full h-full shadow-[inset_-20px_-20px_80px_black,inset_20px_20px_80px_black]">
        <p className="text-lightgrey text-base font-cabin">
          {props.event.start.dateTime}
        </p>
        <h3 className="drop-shadow-2xl text-4xl font-bebas-neue max-[500px]:text-2xl max-[350px]:text-xl">
          {/* {event.summary?.replace(`[${type}]`, "")} */}
        </h3>
        <div
          // style={{ backgroundColor: game?.color || "#E93737" }}
          className="text-xs font-cabin font-semibold px-2 py-1 rounded-full w-min mb-2 max-[500px]:mb-1"
        >
          {/* {type} */}
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
