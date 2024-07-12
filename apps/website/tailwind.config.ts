import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";
const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
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
        marquee: {
          from: { backgroundPosition: "0% 0" },
          to: { backgroundPosition: "100% 0" },
        },
        scroll: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(-100%)" },
        },
        "scroll-reverse": {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(100%)" },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
        shimmer: "shimmer 1s infinite",
        scroll: "scroll 20s linear infinite",
        "scroll-reverse": "scroll-reverse 20s linear infinite",
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
      });
    }),
  ],
};

export default config;
