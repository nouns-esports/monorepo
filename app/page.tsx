import Image from "next/image";
import Button from "./Button";
import Marquee from "react-fast-marquee";
import { currentLocale } from "next-i18n-router";
import { Locale, getDictionary } from "./dictionaries";
import Line from "./Line";
import { Horse, Heart, Cube } from "@phosphor-icons/react";

export default async function Home() {
  const dictionary = getDictionary(currentLocale());

  function highlightTagline(text: string, words: Record<Locale, string[]>) {
    return text.split(" ").map((word) => {
      if (words[(currentLocale() as Locale) || "en"].includes(word)) {
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
      if (words[(currentLocale() as Locale) || "en"] === word) {
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
            className="text-white group font-cabin flex gap-2 items-center"
          >
            <img
              src="/icons/video.svg"
              className="w-6 h-6 group-hover:animate-spin"
            />
            {dictionary("watchVideo")}
          </a>
        </div>
        <div className="flex gap-4 w-fit items-center">
          {/* <Heart color="#AE2983" weight="fill" size={32} /> */}
          {/* <Twitch class="w-[26px]" />
      <Twitter class="w-[34px]" />
      <Youtube class="w-9" />
      <Discord class="w-9" /> */}
        </div>
      </div>
      <Marquee autoFill className="bg-red flex items-center h-8">
        <img src="/logo-white.svg" className="w-4 h-4 select-none" />
        <p className="px-4 text-white text-lg font-bebas-neue pt-[0.19rem]">
          {dictionary("marquee")}
        </p>
      </Marquee>
      <h2 className="flex items-center py-8 text-white font-luckiest-guy text-6xl">
        Funded So Far
      </h2>
      <div className="flex gap-4 items-center justify-center py-32">
        <p className="text-white font-luckiest-guy text-6xl">$1,234,567 x</p>
        <img src="/coin.gif" className="w-16 h-16" />
      </div>

      <div className="h-screen ">
        {/* 
        We have funded x amount of (players, teams, projects) section so far (the number animates ticking up to the amount)
        - Maybe like retro mario style and incorporate the coins as the amount

        Nouns esports is 
        - transparent
        - community driven
        - nounish (anything, anyone, anywhere)
        */}
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
