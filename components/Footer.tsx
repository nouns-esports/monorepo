import Link from "next/link";
import {
  TwitchLogo,
  TwitterLogo,
  YoutubeLogo,
  TiktokLogo,
  DiscordLogo,
  InstagramLogo,
} from "phosphor-react-sc";
import Text from "@/components/Text";
import ANounsThing from "./ANounsThing";
import fetchGames from "@/utils/fetchGames";
import Logo from "./Logo";

export default async function Footer() {
  const games = await fetchGames();

  return (
    <footer className="flex max-lg:flex-col gap-16 justify-between items-center py-8 px-32 max-xl:px-16 relative z-20">
      <div className="flex flex-col gap-8 max-lg:items-center">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            draggable={false}
            className="flex gap-3 group max-lg:justify-center items-center cursor-pointer select-none"
          >
            <Logo className="group-hover:rotate-[14deg] w-10 transition-transform duration-150" />
            <p className="text-white font-luckiest-guy text-3xl select-none">
              Nouns
            </p>
          </Link>
          <p className="w-64 max-lg:text-center max-xl:w-48 max-lg:w-64">
            <Text
              en="Leading the revolution in community driven esports"
              pt="Liderando a revolução nos esportes eletrônicos conduzidos pela comunidade"
            />
          </p>
        </div>
        <ANounsThing />
      </div>
      <div className="flex gap-40 max-2xl:gap-20 max-[500px]:flex-col max-[500px]:gap-16">
        <FooterSection title={<Text en="Explore" pt="Explorar" />}>
          <FooterLink href="/getfunded">
            <Text en="Get Funded" pt="Seja financiado" />
          </FooterLink>
          <FooterLink href="https://www.youtube.com/watch?v=SAXzMQ8pPvE">
            <Text en="About" pt="Sobre" />
          </FooterLink>
          <FooterLink href="/shop">
            <Text en="Shop" pt="Comprar" />
          </FooterLink>
        </FooterSection>
        <FooterSection title={<Text en="Games" pt="Jogos" />}>
          {games.map(({ id, name }, index) =>
            index < 3 ? (
              <FooterLink href={`/games/${id}`}>{name}</FooterLink>
            ) : (
              ""
            )
          )}
          {games.length > 3 ? <FooterLink href="/#games">All</FooterLink> : ""}
        </FooterSection>
        <FooterSection title={<Text en="Contributors" pt="Contribuidores" />}>
          <FooterLink href="https://nouns-esports.notion.site/Contributor-Dashboard-776148bfb6164afea843ee59ff559236">
            <Text en="Dashboard" pt="Painel" />
          </FooterLink>
          <FooterLink href="https://nouns-esports.notion.site/95a06dc09ca34c93aa945bcb4392b445?v=5782f93244024a64bf04c2284a5ccba4">
            <Text en="Proposals" pt="Propostas" />
          </FooterLink>
          <FooterLink href="https://app.safe.global/eth:0x8b45D1CACcb3593E9F1015BA8e97AFB68DE3a0d1/balances">
            <Text en="Multisig" pt="Multisig" />
          </FooterLink>
        </FooterSection>
      </div>
      <div className="flex max-lg:flex-row max-[300px]:flex-col gap-4 items-center justify-center text-white">
        <div className="flex flex-col gap-4 max-lg:flex-row ">
          <a href="/twitch" target="_blank" rel="noopener noreferrer">
            <TwitchLogo
              className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
              weight="fill"
            />
          </a>
          <a href="/x" target="_blank" rel="noopener noreferrer">
            <TwitterLogo
              className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
              weight="fill"
            />
          </a>
          <a href="/youtube" target="_blank" rel="noopener noreferrer">
            <YoutubeLogo
              className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
              weight="fill"
            />
          </a>
        </div>
        <div className="flex flex-col gap-4 max-lg:flex-row">
          <a href="/tiktok" target="_blank" rel="noopener noreferrer">
            <TiktokLogo
              className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
              weight="fill"
            />
          </a>
          <a href="/discord" target="_blank" rel="noopener noreferrer">
            <DiscordLogo
              className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
              weight="fill"
            />
          </a>
          <a href="/instagram" target="_blank" rel="noopener noreferrer">
            <InstagramLogo
              className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
              weight="fill"
            />
          </a>
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
      className="hover:text-white transition-colors max-lg:text-center"
    >
      {props.children}
    </Link>
  );
}

function FooterSection(props: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 select-none">
      <h3 className="text-2xl font-bebas-neue text-white max-lg:text-center">
        {props.title}
      </h3>
      {props.children}
    </div>
  );
}
