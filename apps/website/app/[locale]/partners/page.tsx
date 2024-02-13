import Button from "@/components/Button";
import Link from "@/components/Link";
import { DownloadSimple } from "phosphor-react-sc";
import Text from "@/components/Text";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/[locale]/layout";
import Image from "next/image";
import whiteNoggles from "@/public/noggles-white.svg";
import backgroundPattern from "@/public/pattern.svg";

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
    <div className="relative flex flex-col gap-12 items-center justify-center h-screen from-[#131b3a] via-[#1b315f] to-[#202d5c] bg-gradient-to-tr">
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="https://nouns.gg/partnership-decks/2024/1.webp"
        />
        <meta property="fc:frame:button:1" content="Next" />
        <meta property="fc:frame:button:2" content="Mint" />
        <meta property="fc:frame:button:2:action" content="minty" />
        <meta
          property="fc:frame:button:2:target"
          content="eip155:8453:0xc2edf80bdaf2f067640fb0f3bf695f3dc76b0cf7:6"
        />
        <meta
          property="fc:frame:post_url"
          content="https://nouns.gg/frames/partnership-decks/2024?n=1"
        />
      </head>
      <h1 className="relative text-white font-cabin font-medium text-7xl">
        <Text en="Become a partner" pt="Torne-se um parceiro" />
        <Image
          src={whiteNoggles}
          alt="A pair of white noggles"
          draggable={false}
          className="absolute w-12 top-0 -right-12 select-none"
        />
      </h1>
      <p className="text-white max-w-lg text-center">
        <Text
          en="Hey there! We're Nouns Esports, a uniquely innovative esports organization with a fast growing fanbase of passionate gamers"
          pt="Olá! Somos a Nouns Esports, uma organização de esports singularmente inovadora com uma base de fãs apaixonados por jogos que cresce rapidamente"
        />
      </p>
      <div className="flex gap-6 items-center">
        <Button href="mailto:partners@nouns.gg">
          <Text en="Get in touch" pt="Entre em contato" />
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

      <Image
        src={backgroundPattern}
        sizes="100vw"
        objectFit="cover"
        priority
        alt="Background pattern"
        className="absolute select-none bottom-0 w-full pointer-events-none"
      />
      <div className="from-black to-transparent bg-gradient-to-t h-1/6 w-full bottom-0 z-10 absolute" />
    </div>
  );
}
