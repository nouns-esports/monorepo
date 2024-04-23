import Link from "@/components/Link";
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
import Logo from "./Logo";
import { getGames } from "@/server/queries/games";

export default async function Footer(props: { locale: string }) {
  const games = await getGames();

  return (
    <footer className="flex justify-center w-full">
      <div className="flex max-w-[1920px] w-full max-lg:flex-col gap-16 justify-between items-center py-8 px-32 max-xl:px-16 relative /z-20">
        <div className="flex flex-col gap-8 max-lg:items-center">
          <div className="flex flex-col gap-4">
            <Link
              href={`/${props.locale}`}
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
                pt="Liderando a revolução nos esportes conduzidos pela comunidade"
              />
            </p>
          </div>
          <ANounsThing />
        </div>
        <div className="flex gap-40 max-2xl:gap-20 max-[500px]:flex-col max-[500px]:gap-8">
          <FooterSection title={<Text en="Explore" pt="Explorar" />}>
            <FooterLink href="/getfunded">
              <Text en="Get Funded" pt="Seja financiado" />
            </FooterLink>
            <FooterLink href="https://www.youtube.com/watch?v=SAXzMQ8pPvE">
              <Text en="About" pt="Sobre" />
            </FooterLink>
            <FooterLink href="/shop">
              <Text en="Shop" pt="Loja" />
            </FooterLink>
          </FooterSection>
          <FooterSection title={<Text en="Rosters" pt="Jogos" />}>
            {games.map((game, index) =>
              index < 3 ? (
                <FooterLink
                  key={game.id}
                  href={`/${props.locale}/rosters/${game.id}`}
                >
                  {game.name}
                </FooterLink>
              ) : (
                ""
              )
            )}
            {games.length > 3 ? (
              <FooterLink href={`/${props.locale}/#rosters`}>All</FooterLink>
            ) : (
              ""
            )}
          </FooterSection>
          <FooterSection title={<Text en="Contribute" pt="Contribuir" />}>
            <FooterLink href={`/${props.locale}/partners`}>
              <Text en="Partners" pt="Parceiros" />
            </FooterLink>
            <FooterLink href="https://app.safe.global/eth:0x8b45D1CACcb3593E9F1015BA8e97AFB68DE3a0d1/balances">
              <Text en="Treasury" pt="Tesouraria" />
            </FooterLink>
          </FooterSection>
        </div>
        <div className="flex max-lg:flex-row max-[300px]:flex-col gap-4 items-center justify-center text-white">
          <div className="flex flex-col gap-4 max-lg:flex-row">
            <Link href="/discord">
              <DiscordLogo
                className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
                weight="fill"
              />
            </Link>
            <Link href="/instagram">
              <InstagramLogo
                className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
                weight="fill"
              />
            </Link>
            <Link href="/twitter">
              <TwitterLogo
                className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
                weight="fill"
              />
            </Link>
            <Link href="/youtube">
              <YoutubeLogo
                className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
                weight="fill"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink(props: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={props.href}
      className="hover:text-white select-none transition-colors max-lg:text-center text-nowrap"
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
    <div className="flex flex-col max-[500px]:items-center gap-2">
      <h3 className="text-2xl font-bebas-neue text-white max-lg:text-center">
        {props.title}
      </h3>
      <div className="flex flex-col gap-2 max-[500px]:flex-row max-[500px]:gap-6">
        {props.children}
      </div>
    </div>
  );
}
