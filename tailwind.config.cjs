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
      black: "#030303",
      red: "#E93737",
      transparent: "transparent",
      grey: "#858585",
    },
    fontFamily: {
      "luckiest-guy": ["Luckiest Guy"],
      "bebas-neue": ["Bebas Neue"],
      cabin: ["Cabin"],
    },
    transitionDuration: {
      DEFAULT: "300ms",
    },
    // extend: {
    //   boxShadow: {
    //     inner: "inset -80px -80px 100px black, inset 80px 80px 100px black",
    //   },
    // },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hidden": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};
