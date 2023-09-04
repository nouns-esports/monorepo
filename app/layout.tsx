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
import { CSSProperties } from "react";

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

export const metadata: Metadata = {
  title: "Nouns Esports",
  description: "Leading the revolution in community driven esports",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang={currentLocale() ?? "en"}
      className="scroll-smooth overflow-x-hidden"
      style={
        {
          "--primaryColor": "#E93737",
        } as CSSProperties
      }
    >
      <body
        className={`cursor-crosshair ${cabin.variable} ${luckiestGuy.variable} ${bebasNeue.variable} ${londrinaSolid.variable} bg-black text-lightgrey font-cabin selection:text-white selection:bg-red w-full`}
      >
        <Providers>
          <Header />
          {props.children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
