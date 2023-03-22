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
      black: "#101010",
      red: "#E93737",
      transparent: "transparent",
      grey: "#858585",
    },
    extend: {
      screens: {
        xs: "450px",
        "3xl": "1921px",
      },
      fontFamily: {
        "luckiest-guy": ["Luckiest Guy"],
        "bebas-neue": ["Bebas Neue"],
        cabin: ["Cabin"],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
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
