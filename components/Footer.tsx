"use client";

import Link from "next/link";
import { useDictionary } from "../lang/dictionaries";
import { useMouse } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import {
  TwitchLogo,
  TwitterLogo,
  YoutubeLogo,
  TiktokLogo,
  DiscordLogo,
  InstagramLogo,
} from "@phosphor-icons/react";

export default function Footer() {
  const { dictionary } = useDictionary();

  const [mouse, ref] = useMouse();

  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    setRotate(
      (Math.atan2(mouse.elementY - 8, mouse.elementX - 8) * 180) / Math.PI
    );
  }, [mouse]);

  return (
    <footer className="flex max-md:flex-col max-md:gap-16 justify-between items-center py-8 px-32 relative z-20">
      <div className="flex flex-col gap-8 max-md:items-center">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            draggable={false}
            className="flex gap-3 group items-center cursor-pointer select-none"
          >
            <img
              src="/logo.svg"
              className="group-hover:rotate-[14deg] w-10 transition-transform duration-150"
            />
            <p className="text-white font-luckiest-guy text-3xl select-none">
              Nouns
            </p>
          </Link>
          <p className="w-64 max-md:text-center">{dictionary("tagline")}</p>
        </div>
        <Link
          href="https://nouns.wtf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-2 items-center text-white font-londrina-solid"
        >
          {dictionary("aNounsThing1")}

          <img
            src="/noggles.png"
            // @ts-ignore
            ref={ref}
            className="w-10 origin-center"
            style={{ rotate: `${rotate}deg` }}
          />
          {dictionary("aNounsThing2")}
        </Link>
      </div>
      <div className="flex gap-40 max-lg:gap-20 max-[500px]:gap-8 max-[300px]:flex-col max-[300px]:gap-16">
        <FooterSection title={dictionary("explore")}>
          <FooterLink href="/getfunded">{dictionary("getFunded")}</FooterLink>
          <FooterLink href="/about">{dictionary("about")}</FooterLink>
          <FooterLink href="/shop">{dictionary("shop")}</FooterLink>
        </FooterSection>
        <FooterSection title={dictionary("games")}>
          {/* {games.map(({ name }, index) =>
            index < 3 ? (
              <FooterLink
                url={`/games/${name
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase()
                  .replace(/ /g, "-")}`}
              >
                {name}
              </FooterLink>
            ) : (
              ""
            )
          )} */}
          {/* {games.length > 3 ? <FooterLink href="/#games">All</FooterLink> : ""} */}
        </FooterSection>
        <FooterSection title={dictionary("contributors")}>
          <FooterLink href="https://nouns-esports.notion.site/Contributor-Dashboard-776148bfb6164afea843ee59ff559236">
            {dictionary("dashboard")}
          </FooterLink>
          <FooterLink href="https://nouns-esports.notion.site/95a06dc09ca34c93aa945bcb4392b445?v=5782f93244024a64bf04c2284a5ccba4">
            {dictionary("proposals")}
          </FooterLink>
          <FooterLink href="https://app.safe.global/eth:0x8b45D1CACcb3593E9F1015BA8e97AFB68DE3a0d1/balances">
            {dictionary("multisig")}
          </FooterLink>
        </FooterSection>
      </div>
      <div className="flex max-md:flex-row gap-4 items-center justify-center text-white">
        <div className="flex flex-col gap-4">
          <TwitchLogo
            className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
            weight="fill"
          />
          <TwitterLogo
            className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
            weight="fill"
          />
          <YoutubeLogo
            className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
            weight="fill"
          />
        </div>
        <div className="flex flex-col gap-4">
          <TiktokLogo
            className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
            weight="fill"
          />
          <DiscordLogo
            className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
            weight="fill"
          />
          <InstagramLogo
            className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
            weight="fill"
          />
        </div>
      </div>
    </footer>
  );
}

function FooterLink(props: { href: string; children: React.ReactNode }) {
  const offsite = props.href.includes("://");

  return (
    <Link
      href={props.href}
      target={offsite ? "_blank" : "_self"}
      rel={offsite ? "noopener noreferrer" : ""}
      draggable={false}
      className="hover:text-white transition-colors max-md:text-center"
    >
      {props.children}
    </Link>
  );
}

function FooterSection(props: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 select-none">
      <h3 className="text-2xl font-bebas-neue text-white max-md:text-center">
        {props.title}
      </h3>
      {props.children}
    </div>
  );
}
