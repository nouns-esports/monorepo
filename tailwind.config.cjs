const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
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
      "luckiest-guy": ["Luckiest Guy"],
      "bebas-neue": ["Bebas Neue"],
      cabin: ["Cabin"],
    },
    extend: {
      transitionDuration: {
        DEFAULT: "300ms",
      },
      backgroundSize: {
        grow: "125%",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".border-fix": {
          "background-clip": "content-box",
          padding: "1px",
        },
      });
    }),
  ],
};
