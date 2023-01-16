/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      white: "white",
      black: "#101010",
      red: "#E93737",
      transparent: "transparent",
      grey: "#858585",
    },
    extend: {
      fontFamily: {
        londrina: ["Londrina Solid"],
        roboto: ["Roboto"],
        bebas: ["Bebas Neue"],
      },
    },
  },
  plugins: [],
};
