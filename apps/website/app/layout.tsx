import "./globals.css";
import type { Metadata, Viewport } from "next";
import {
  Cabin,
  Luckiest_Guy,
  Bebas_Neue,
  Londrina_Solid,
} from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "@/providers";
import { getAuthenticatedUser } from "@/server/queries/users";
import Script from "next/script";
import { env } from "~/env";

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
  openGraph: {
    type: "website",
    images: ["/pokemon.webp"],
  },
  twitter: {
    site: "@NounsEsports",
    card: "summary_large_image",
    images: ["/pokemon.webp"],
  },
} satisfies Metadata;

export const viewport = {
  themeColor: "black",
} satisfies Viewport;

export default async function RootLayout(props: { children: React.ReactNode }) {
  const user = await getAuthenticatedUser();

  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body
        className={`${cabin.variable} ${luckiestGuy.variable} ${bebasNeue.variable} ${londrinaSolid.variable} bg-black text-grey-400 font-cabin selection:text-white selection:bg-red flex flex-col w-full h-full`}
      >
        <Providers user={user}>
          <Header />
          <main className="flex flex-col w-full min-h-[calc(100vh_-_224px)] h-full">
            {props.children}
          </main>
          <Footer />
        </Providers>
      </body>
      {env.NEXT_PUBLIC_ENVIRONMENT === "production" ? (
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="114c634e-5845-4e09-9653-7df37301aed9"
        />
      ) : (
        ""
      )}
    </html>
  );
}
