import "./globals.css";
import type { Metadata } from "next";
import {
  Cabin,
  Luckiest_Guy,
  Bebas_Neue,
  Londrina_Solid,
} from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/providers";
import fetchGames from "@/utils/fetchGames";
import { Analytics } from "@vercel/analytics/react";
import baseKeywords from "@/utils/metadata/baseKeywords";
import { locales } from "@/middleware";

const cabin = Cabin({ subsets: ["latin"], variable: "--font-cabin" });

const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-luckiest-guy",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

const londrinaSolid = Londrina_Solid({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-londrina-solid",
});

const title = "Nouns Esports";
const description = "Leading the revolution in community driven esports!";

export const metadata: Metadata = {
  title: {
    default: title,
    template: `${title} - %s`,
  },
  description,
  keywords: baseKeywords,
  metadataBase: new URL("https://nouns.gg"),
  alternates: {
    canonical: "/",
    // TODO: See how this works for subpages; is /pt valid for /games/csgo?
    languages: Object.keys(locales).reduce((object, locale) => {
      object[locale] = `/${locale}`;
      return object;
    }, {} as Record<string, string>),
  },
  openGraph: {
    type: "website",
    title,
    description,
    images: ["https://nouns.gg/pokemon.webp"],
    url: "https://nouns.gg",
  },
  twitter: {
    site: "@NounsEsports",
    card: "summary_large_image",
    images: ["https://nouns.gg/pokemon.webp"],
    title,
    description,
  },
  themeColor: "black",
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const games = await fetchGames();

  return (
    <html
      lang={props.params.locale}
      className="scroll-smooth overflow-x-hidden"
    >
      <body
        className={`cursor-crosshair ${cabin.variable} ${luckiestGuy.variable} ${bebasNeue.variable} ${londrinaSolid.variable} bg-black text-lightgrey font-cabin selection:text-white selection:bg-red w-full`}
      >
        <Providers games={games}>
          <Header />
          {props.children}
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
