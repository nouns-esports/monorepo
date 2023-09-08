const { i18nRewriter } = require("next-i18n-router");
const i18nConfig = require("./i18nConfig");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      afterFiles: i18nRewriter(i18nConfig),
    };
  },
  // Polyfills for RainbowKit and Wagmi, see: https://www.rainbowkit.com/docs/installation#react-nextjs-and-webpack
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = nextConfig;
