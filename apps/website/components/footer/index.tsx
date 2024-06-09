import Link from "@/components/Link";
import {
  TwitchLogo,
  TwitterLogo,
  YoutubeLogo,
  TiktokLogo,
  DiscordLogo,
  InstagramLogo,
} from "phosphor-react-sc";
import ANounsThing from "@/components/footer/ANounsThing";
import Logo from "../Logo";
import { getGames } from "@/server/queries/games";
import FooterLink from "@/components/footer/FooterLink";
import FooterSection from "@/components/footer/FooterSection";

export default async function Footer() {
  const games = await getGames();

  return (
    <footer className="flex justify-center w-full">
      <div className="flex max-w-[1920px] w-full max-lg:flex-col gap-16 justify-between items-center py-8 px-32 max-xl:px-16 relative /z-20">
        <div className="flex flex-col gap-8 max-lg:items-center">
          <div className="flex flex-col gap-4">
            <Link
              href=""
              className="flex gap-3 group max-lg:justify-center items-center cursor-pointer select-none"
            >
              <Logo className="group-hover:rotate-[14deg] w-10 transition-transform duration-150" />
              <p className="text-white font-luckiest-guy text-3xl select-none">
                Nouns
              </p>
            </Link>
            <p className="w-64 max-lg:text-center max-xl:w-48 max-lg:w-64">
              Leading the revolution in community driven esports
            </p>
          </div>
          <ANounsThing />
        </div>
        <div className="flex gap-40 max-2xl:gap-20 max-[500px]:flex-col max-[500px]:gap-8">
          <FooterSection title="Explore">
            <FooterLink href="/getfunded">Get Funded</FooterLink>
            <FooterLink href="https://www.youtube.com/watch?v=SAXzMQ8pPvE">
              About
            </FooterLink>
            <FooterLink href="/shop">Shop</FooterLink>
          </FooterSection>
          <FooterSection title="Rosters">
            {games.map((game, index) =>
              index < 3 ? (
                <FooterLink key={game.id} href={`/rosters/${game.id}`}>
                  {game.name}
                </FooterLink>
              ) : (
                ""
              )
            )}
            {games.length > 3 ? (
              <FooterLink href={`/#rosters`}>All</FooterLink>
            ) : (
              ""
            )}
          </FooterSection>
          <FooterSection title="Contribute">
            <FooterLink href={`/partners`}>Partners</FooterLink>
            <FooterLink href="https://app.safe.global/eth:0x8b45D1CACcb3593E9F1015BA8e97AFB68DE3a0d1/balances">
              Treasury
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
