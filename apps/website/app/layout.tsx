import "./globals.css";
import type { Metadata, Viewport } from "next";
import {
	Cabin,
	Luckiest_Guy,
	Bebas_Neue,
	Londrina_Solid,
	Archivo_Black,
	Koulen,
	Tilt_Warp,
	Dela_Gothic_One,
} from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

export const metadata = {
	title: {
		default: "Nouns Esports",
		template: "Nouns Esports - %s",
	},
	description: "Leading the revolution in community driven esports!",
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
	metadataBase: new URL(env.NEXT_PUBLIC_DOMAIN),
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

export default async function RootLayout(props: { children: React.ReactNode }) {
	const user = await getAuthenticatedUser();
	return (
		<html lang="en" className="/scroll-smooth overflow-x-hidden scrollbar-main">
			<head>
				<meta
					name="fc:frame"
					content='{"version":"next","imageUrl":"https://nouns.gg/banner-red.png","button":{"title":"Launch","action":{"type":"launch_frame","name":"Nouns","url":"https://beta.nouns.gg","splashImageUrl":"https://nouns.gg/logo/logo-square.png","splashBackgroundColor":"#E93737"}}}'
				/>
			</head>
			<body
				className={`${cabin.variable} ${luckiestGuy.variable} ${bebasNeue.variable} ${londrinaSolid.variable} bg-black text-grey-200 font-cabin selection:text-white selection:bg-red flex flex-col items-center w-full h-full`}
			>
				<Providers user={user?.id}>
					<Header />
					<main className="flex flex-col w-full min-h-[calc(100vh_-_224px)] h-full max-w-[1920px]">
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
