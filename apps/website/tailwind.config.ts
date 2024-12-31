import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";
const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./server/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		colors: {
			white: "#F2F2F2",
			black: "#040404",
			red: "#E93737",
			pink: "#f26262",
			purple: "#BC30ED",
			green: "#4CC87D",
			yellow: "#F8C648",
			transparent: "transparent",
			farcaster: "#855DCD",
			twitter: "#1DA1F2",
			discord: "#5865F2",
			"coinbase-wallet": "#0052FF",
			"wallet-connect": {
				light: "#526EFE",
				dark: "#3455FC",
			},
			metamask: {
				light: "#FA9130",
				dark: "#6C3D12",
			},
			rainbow: {
				light: "#174299",
				dark: "#001E59",
			},
			blue: {
				500: "#789AF4",
				700: "#3569EE",
				800: "#042c91",
				900: "#002688",
			},
			grey: {
				200: "#909497",
				300: "#606060",
				400: "#4D4D4D",
				500: "#333333",
				600: "#1A1A1A",
				800: "#121213",
			},
			gold: {
				500: "#EEAF36",
				800: "#704a02",
				900: "#664300",
			},
			silver: {
				500: "#CBD4D7",
				800: "#706e6e",
				900: "#656565",
			},
			bronze: {
				500: "#D4682B",
				800: "#632502",
				900: "#5B2100",
			},
		},
		fontFamily: {
			"luckiest-guy": ["var(--font-luckiest-guy)"],
			"bebas-neue": ["var(--font-bebas-neue)"],
			cabin: ["var(--font-cabin)"],
			"londrina-solid": ["var(--font-londrina-solid)"],
		},
		extend: {
			transitionDuration: {
				DEFAULT: "300ms",
			},
			transitionProperty: {
				height: "height",
			},
			backgroundSize: {
				grow: "125%",
			},
			cursor: {
				crosshair: "url('/crosshair.svg') 16 16, auto",
			},
			keyframes: {
				"art-marquee-top": {
					from: { transform: "translateX(0%)" },
					to: { transform: "translateX(calc(-2079.5px - 0.5rem))" },
				},
				"art-marquee-bottom": {
					from: { transform: "translateX(0%)" },
					to: { transform: "translateX(calc(2004.5px + 0.5rem))" },
				},
				shimmer: {
					"100%": {
						transform: "translateX(100%)",
					},
				},
			},
			animation: {
				shimmer: "shimmer 1s infinite",
				"art-marquee-top": "art-marquee-top 20s linear infinite",
				"art-marquee-bottom": "art-marquee-bottom 20s linear infinite",
			},
		},
	},
	plugins: [
		typography,
		animate,
		plugin(({ matchUtilities, addUtilities }) => {
			matchUtilities({
				perspective: (value) => ({
					perspective: value,
				}),
			});
			addUtilities({
				".scrollbar-hidden": {
					"-ms-overflow-style": "none",
					"scrollbar-width": "none",
					"&::-webkit-scrollbar": {
						display: "none",
					},
				},
				".custom-scrollbar": {
					"&::-webkit-scrollbar": {
						width: "8px",
					},
					"&::-webkit-scrollbar-track": {
						background: "#1A1A1A",
						borderRadius: "1000px",
						width: "8px",
						marginLeft: "4px", // Add left margin to the track
					},
					"&::-webkit-scrollbar-thumb": {
						background: "#333333",
						borderRadius: "1000px",
						cursor: "grab",
						width: "8px",
						marginLeft: "4px", // Add left margin to the thumb
					},
					"&::-webkit-scrollbar-thumb:hover": {
						background: "#4D4D4D",
					},
					"&::-webkit-scrollbar-thumb:active": {
						background: "#4D4D4D",
						cursor: "grabbing",
					},

					paddingRight: "12px", // Add padding
				},
				".scrollbar-main": {
					"&::-webkit-scrollbar": {
						width: "16px",
					},
					"&::-webkit-scrollbar-track": {
						background: "#1A1A1A",
						width: "16px",
					},
					"&::-webkit-scrollbar-thumb": {
						background: "#333333",
						cursor: "grab",
						width: "8px",
					},
					"&::-webkit-scrollbar-thumb:hover": {
						background: "#4D4D4D",
					},
					"&::-webkit-scrollbar-thumb:active": {
						background: "#4D4D4D",
						cursor: "grabbing",
					},
				},
				".prevent-scroll": {
					"-ms-overflow-style": "none",
					"scrollbar-width": "none",
					"&::-webkit-scrollbar": {
						display: "none",
					},
					"touch-action": "none",
					"-webkit-overflow-scrolling": "none",
					"overflow-y": "hidden",
					"overscroll-behavior": "none",
				},
				".textarea-resize": {
					display: "grid",
					"&::after": {
						content: 'attr(data-replicated-value) " "',
						whiteSpace: "pre-wrap",
						visibility: "hidden",
					},
					"& > textarea": {
						resize: "none",
						overflow: "hidden",
						gridArea: "1 / 1 / 2 / 2",
						font: "inherit",
					},
					"&::after, & > textarea": {
						padding: "0.5rem",
						gridArea: "1 / 1 / 2 / 2",
						font: "inherit",
					},
				},
			});
		}),
	],
};

export default config;
