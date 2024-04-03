import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: (value) => ({
          perspective: value,
        }),
      });
    }),
  ],
};

export default config;
