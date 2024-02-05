/** @type {import('next').NextConfig} */
const nextConfig = {
  // Polyfills for RainbowKit and Wagmi, see: https://www.rainbowkit.com/docs/installation#react-nextjs-and-webpack
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
