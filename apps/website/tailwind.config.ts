import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
      blue: {
        500: "#789AF4",
        700: "#3569EE",
        900: "#002688",
      },
      grey: {
        200: "#909497",
        400: "#4D4D4D",
        500: "#333333",
        600: "#1A1A1A",
        800: "#121213",
      },
      gold: {
        500: "#EEAF36",
        900: "#664300",
      },
      silver: {
        500: "#CBD4D7",
        900: "#656565",
      },
      bronze: {
        500: "#D4682B",
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
          /* IE and Edge */
          "-ms-overflow-style": "none",

          /* Firefox */
          "scrollbar-width": "none",

          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".prevent-scroll": {
          /* IE and Edge */
          "-ms-overflow-style": "none",

          /* Firefox */
          "scrollbar-width": "none",

          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },

          "touch-action": "none",
          "-webkit-overflow-scrolling": "none",
          "overflow-y": "hidden",

          /* Other browsers */
          "overscroll-behavior": "none",
        },
      });
    }),
  ],
};

export default config;
