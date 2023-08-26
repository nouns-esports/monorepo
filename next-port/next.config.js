const { i18nRewriter } = require("next-i18n-router");
const i18nConfig = require("./i18nConfig");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      afterFiles: i18nRewriter(i18nConfig),
    };
  },
};

module.exports = nextConfig;
