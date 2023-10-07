import Button from "@/components/Button";
import Link from "next/link";
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
    <div className="relative flex flex-col gap-16 items-center justify-center h-screen from-[#131b3a] via-[#1b315f] to-[#202d5c] bg-gradient-to-tr">
      <h1 className="relative text-white font-cabin font-medium text-7xl">
        <Text en="Become a partner" pt="Torne-se um parceiro" />
        <img
          src="/noggles-white.svg"
          className="absolute w-12 top-0 -right-12"
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
          href="https://cdn.discordapp.com/attachments/1076213087251726366/1150901156378333296/Nouns_Esports_-_Partnership_Deck_1.pdf?ex=652da6ba&is=651b31ba&hm=e9c52a1700ecef0f705c7be09c127898807b9cd3d3de44f9e7e1d9c3a101f3b3&"
          className="flex items-center gap-2 text-white group font-cabin hover:text-white/80 transition-colors"
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
        className="absolute bottom-0 w-full object-cover pointer-events-none"
      />
      <div className="from-black to-transparent bg-gradient-to-t h-1/6 w-full bottom-0 z-10 absolute" />
    </div>
  );
}
