const createJiti = require("jiti");
const jiti = createJiti(__filename);

jiti("../../env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "**",
      },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "**" },
      { protocol: "https", hostname: "ipfs.nouns.gg", pathname: "**" },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async redirects() {
    return [
      {
        source: "/shop",
        destination: "https://shop.nouns.gg",
        permanent: true,
      },
      {
        source: "/cup",
        destination: "https://start.gg/matchacup",
        permanent: true,
      },
      {
        source: "/jerseys",
        destination: "https://raven.gg/stores/nounsesports/",
        permanent: true,
      },
      {
        source: "/duff-hoodie",
        destination: "https://shop.nouns.gg/collections/duff-city",
        permanent: true,
      },
      {
        source: "/raffle",
        destination: "https://app.rep3.gg/matcha/quest/Matchaon0xv2",
        permanent: true,
      },
      {
        source: "/mint",
        destination: "https://shorturl.at/mJKPS",
        permanent: true,
      },
      {
        source: "/discord",
        destination: "https://discord.com/invite/nounsesports",
        permanent: true,
      },
      {
        source: "/twitter",
        destination: "https://x.com/nounsesports",
        permanent: true,
      },
      {
        source: "/twitch",
        destination: "https://www.twitch.tv/nounsesports/",
        permanent: true,
      },
      {
        source: "/youtube",
        destination: "https://www.youtube.com/@nounsesports",
        permanent: true,
      },
      {
        source: "/tiktok",
        destination: "https://www.tiktok.com/@nounsesports",
        permanent: true,
      },
      {
        source: "/instagram",
        destination: "https://www.instagram.com/nouns_esports/",
        permanent: true,
      },
      {
        source: "/tippedoff",
        destination: "https://shorturl.at/s3BZl",
        permanent: true,
      },
      {
        source: "/bracket",
        destination: "https://shorturl.at/jOzr7",
        permanent: true,
      },
      {
        source: "/matchacup",
        destination:
          "https://www.start.gg/tournament/matcha-cup-east-coast-1/details",
        permanent: true,
      },
      {
        source: "/duffcity",
        destination:
          "https://www.start.gg/tournament/duff-city-volume-4/details",
        permanent: true,
      },
      {
        source: "/dc",
        destination: "https://start.gg/duffcity",
        permanent: true,
      },
      {
        source: "/matcha",
        destination: "https://matcha.xyz/?utm_source=nouns&utm_campaign=2q24",
        permanent: true,
      },
      {
        source: "/events",
        destination:
          "https://calendar.google.com/calendar/embed?src=2gl6iku9kcb2qjdrtgdthgng3s%40group.calendar.google.com",
        permanent: true,
      },
      {
        source: "/about",
        destination: "https://www.youtube.com/watch?v=SAXzMQ8pPvE",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
