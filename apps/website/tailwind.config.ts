import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import typography from "@tailwindcss/typography";

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
      blue: "#4080E0",
      green: "#4CC87D",
      yellow: "#F8C648",
      transparent: "transparent",
      lightgrey: "#454647",
      grey: "#1C1C1C",
      darkgrey: "#0C0C0C",
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
    },
  },
  plugins: [
    typography,
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
