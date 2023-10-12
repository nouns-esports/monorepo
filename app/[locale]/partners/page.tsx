import Button from "@/components/Button";
import Link from "@/components/Link";
import { DownloadSimple } from "phosphor-react-sc";
import Text from "@/components/Text";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/[locale]/layout";

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
      <h1 className="relative text-white font-cabin font-medium text-7xl">
        <Text en="Become a partner" pt="Torne-se um parceiro" />
        <img
          src="/noggles-white.svg"
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
        <Button href="/discord">
          <Text en="Get in touch" pt="Entre em contato" />
        </Button>
        <Link
          href="https://ipfs.decentralized-content.com/ipfs/bafybeige4wi2nv7pi2njucrcmm4b4j3bih6evlanopx32cnir6j7svrhce"
          className="flex items-center gap-2 select-none text-white group font-cabin hover:text-white/80 transition-colors"
        >
          <DownloadSimple
            className="text-white w-6 h-6 group-hover:text-white/80 transition-colors"
            weight="bold"
          />
          <Text en="2023 Partnership Deck" pt="Deck de Parceria 2023" />
        </Link>
      </div>

      <img
        src="/pattern.svg"
        className="absolute select-none bottom-0 w-full object-cover pointer-events-none"
      />
      <div className="from-black to-transparent bg-gradient-to-t h-1/6 w-full bottom-0 z-10 absolute" />
    </div>
  );
}
