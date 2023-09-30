import "./globals.css";
import type { Metadata } from "next";
import {
  Cabin,
  Luckiest_Guy,
  Bebas_Neue,
  Londrina_Solid,
} from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Providers from "../providers";
import { currentLocale } from "next-i18n-router";
import fetchGames from "@/utils/fetchGames";
import { Analytics } from "@vercel/analytics/react";
import baseKeywords from "@/utils/metadata/baseKeywords";
import i18nConfig from "@/i18nConfig";

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
    languages: i18nConfig.locales.reduce((object, locale) => {
      object[locale] = `/${locale}`;
      return object;
    }, {} as Record<string, string>),
  },
  openGraph: {
    type: "website",
    title,
    description,
  },
  twitter: {
    site: "@NounsEsports",
    card: "summary_large_image",
    title,
    description,
    creator: "@NounsEsports",
  },
  themeColor: "black",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const games = await fetchGames();

  return (
    <html
      lang={currentLocale() ?? "en"}
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
