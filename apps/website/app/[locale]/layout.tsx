import "./globals.css";
import type { Metadata, Viewport } from "next";
import {
  Cabin,
  Luckiest_Guy,
  Bebas_Neue,
  Londrina_Solid,
} from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/providers";
import { locales } from "@/middleware";
import { query } from "@/app/api/query/server";

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

export const metadata = {
  title: {
    default: title,
    template: `${title} - %s`,
  },
  description,
  keywords: [
    "esports",
    "nouns",
    "nounsdao",
    "web3",
    "crypto",
    "community",
    "gaming",
    "blockchain",
    "nft",
    "dao",
    "governance",
  ],
  metadataBase: new URL("https://nouns.gg"),
  alternates: {
    canonical: "/",
    languages: Object.keys(locales).reduce(
      (object, locale) => {
        object[locale] = `/${locale}`;
        return object;
      },
      {} as Record<string, string>
    ),
  },
  openGraph: {
    type: "website",
    images: ["/og-banner.webp"],
  },
  twitter: {
    site: "@NounsEsports",
    card: "summary_large_image",
    images: ["/og-banner.webp"],
  },
} satisfies Metadata;

export const viewport = {
  themeColor: "black",
} satisfies Viewport;

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const games = await query.getGames();

  return (
    <html
      lang={props.params.locale}
      className="scroll-smooth overflow-x-hidden"
    >
      <body
        className={`${cabin.variable} ${luckiestGuy.variable} ${bebasNeue.variable} ${londrinaSolid.variable} bg-black text-lightgrey font-cabin selection:text-white selection:bg-red flex flex-col w-full h-full`}
      >
        <Providers
          games={games.map((game) => ({ id: game.id, color: game.color }))}
        >
          <Header locale={props.params.locale} />
          <main className="flex flex-col w-full min-h-[calc(100vh_-_224px)] h-full">
            {props.children}
          </main>
          <Footer locale={props.params.locale} />
        </Providers>
      </body>
    </html>
  );
}
