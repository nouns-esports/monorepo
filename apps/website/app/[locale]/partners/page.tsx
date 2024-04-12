import Button from "@/components/Button";
import Link from "@/components/Link";
import { DownloadSimple, TwitterLogo, DiscordLogo } from "phosphor-react-sc";
import Text from "@/components/Text";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/[locale]/layout";
import Image from "next/image";
import whiteNoggles from "@/public/noggles-white.svg";
import backgroundPattern from "@/public/pattern.svg";
import { LinkIt } from "react-linkify-it";

export const metadata: Metadata = {
  title: "Become a partner",
  description:
    "Hey there! We're Nouns Esports, a uniquely innovative esports organization with a fast growing fanbase of passionate gamers.",
  keywords: [
    ...baseMetadata.keywords,
    "partner",
    "partnership",
    "deck",
    "sponsor",
    "sponsorship",
  ],
  openGraph: {
    images: ["/partnership-deck.webp"],
  },
  twitter: {
    images: ["/partnership-deck.webp"],
  },
};

export default function Partners() {
  return (
    <div className="flex flex-col">
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="https://nouns.gg/partnership-decks/2024/1.webp"
        />
        <meta property="fc:frame:button:1" content="Next" />
        <meta property="fc:frame:button:2" content="Mint" />
        <meta property="fc:frame:button:2:action" content="mint" />
        <meta
          property="fc:frame:button:2:target"
          content="eip155:8453:0xc2edf80bdaf2f067640fb0f3bf695f3dc76b0cf7:1"
        />
        <meta
          property="fc:frame:post_url"
          content="https://nouns.gg/frames/partnership-decks/2024?n=1"
        />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
      </head>
      <div className="relative flex flex-col gap-6 max-xl:gap-4 justify-center items-center h-[30vw] max-xl:h-[450px]">
        <img
          src="/partners.png"
          alt=""
          className="absolute top-0 object-center blur-[8px] brightness-[35%] h-full w-full object-cover -z-10"
        />
        <h1 className="font-luckiest-guy text-center text-white text-6xl max-xl:text-5xl max-sm:text-4xl mb-2 max-xl:mb-0">
          Meet Our <span className="text-pink">Partners</span>
        </h1>
        <p className="text-[#898a8a] max-w-2xl text-center max-xl:max-w-lg px-4">
          Discover our exceptional partners aligned with the Nouns Esports
          vision. Embark on a journey of mutual growth and cooperation, seize
          the opportunity and become a partner today!
        </p>
        <div className="flex gap-6 items-center max-[400px]:flex-col">
          <Button href="mailto:partners@nouns.gg" animate="hover">
            <Text en="Contact Us" pt="Entre em contato" />
          </Button>
          <Link
            href="https://docsend.com/view/6nsudfgjdg5ezr2a"
            className="flex items-center gap-2 select-none text-white group font-cabin hover:text-white/80 transition-colors"
          >
            <DownloadSimple
              className="text-white w-6 h-6 group-hover:text-white/80 transition-colors"
              weight="bold"
            />
            <Text en="2024 Partnership Deck" pt="Deck de Parceria 2024" />
          </Link>
        </div>
        <div className="h-60 w-full absolute -bottom-6 bg-gradient-to-t from-black to-transparent pointer-events-none -z-10" />
      </div>
      <div className="p-16 max-lg:p-8 max-sm:p-4 flex flex-col gap-16 w-full items-center">
        <div className="flex max-sm:flex-col gap-8 max-w-5xl">
          <img
            src="/nouns-partner.png"
            className="rounded-lg w-96 max-sm:w-full max-xl:w-80 max-lg:w-60 max-lg:h-auto  h-min aspect-video object-cover"
          />
          <div className="flex flex-col justify-center gap-4 py-4 max-xl:py-0 max-lg:gap-4 max-xl:gap-2">
            <h2 className="text-white max-lg:text-2xl font-luckiest-guy text-3xl">
              Nouns
            </h2>
            <p className="max-lg:text-sm">
              Behold, an infinite work of art! Nouns is a community-owned brand
              that makes a positive impact by funding ideas and fostering
              collaboration. From collectors and technologists, to non-profits
              and brands, Nouns is for everyone.
            </p>
            <div className="flex items-center gap-6">
              <Button href="https://nouns.wtf/vote/466" animate="hover">
                Visit
              </Button>
              <div className="flex items-center gap-4">
                <Link href="https://twitter.com/nounsdao">
                  <TwitterLogo
                    className="w-8 h-8 text-white hover:text-white/60 cursor-pointer transition-colors"
                    weight="fill"
                  />
                </Link>
                <Link href="https://warpcast.com/~/channel/nouns">
                  <img
                    src="/farcaster.svg"
                    className="w-7 h-7 hover:brightness-50 transition-all"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex max-sm:flex-col gap-8 max-w-5xl">
          <img
            src="/matcha-banner.svg"
            className="rounded-lg w-96 max-sm:w-full max-xl:w-80 max-lg:w-60 aspect-video max-lg:h-auto h-min object-cover"
          />
          <div className="flex flex-col justify-center gap-4 py-4 max-xl:py-0 max-xl:gap-2 max-lg:gap-4">
            <h2 className="text-white max-lg:text-2xl font-luckiest-guy text-3xl">
              Matcha
            </h2>
            <p className="max-lg:text-sm">
              Matcha is a crypto trading platform powered by 0x Project. They
              are a decentralized exchange, or DEX, meaning that users swap
              their tokens peer-to-peer through the Ethereum smart contract
              infrastructure.
            </p>
            <div className="flex gap-6">
              <Button href="https://matcha.xyz" animate="hover">
                Visit
              </Button>
              <div className="flex items-center gap-4">
                <Link href="https://twitter.com/matchaxyz">
                  <TwitterLogo
                    className="w-8 h-8 text-white hover:text-white/60 cursor-pointer transition-colors"
                    weight="fill"
                  />
                </Link>
                <Link href="https://discord.com/invite/matchaxyz">
                  <DiscordLogo
                    className="w-8 h-8 text-white hover:text-white/60 cursor-pointer transition-colors"
                    weight="fill"
                  />
                </Link>
                <Link href="https://warpcast.com/matchaxyz">
                  <img
                    src="/farcaster.svg"
                    className="w-7 h-7 hover:brightness-50 transition-all"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
