/** @type {import('next').NextConfig} */
const nextConfig = {
  // async rewrites() {
  //   return {
  //     afterFiles: (() => {
  //       const locales = ["en", "es"];

  //       const rewrites = [];

  //       for (const locale of locales) {
  //         if (locale === "en") continue;

  //         rewrites.push({
  //           source: `/${locale}`,
  //           destination: `/`,
  //         });

  //         rewrites.push({
  //           source: `/${locale}/:path*`,
  //           destination: `/:path*`,
  //         });
  //       }

  //       return rewrites;
  //     })(),
  //   };
  // },
  // Polyfills for RainbowKit and Wagmi, see: https://www.rainbowkit.com/docs/installation#react-nextjs-and-webpack
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = nextConfig;
