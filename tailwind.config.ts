import type { Config } from "tailwindcss";

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
      white: "white",
      black: "black",
      red: "#E93737",
      transparent: "transparent",
      lightgrey: "#858585",
      darkgrey: "#0A0A0A",
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
  plugins: [],
};

export default config;
