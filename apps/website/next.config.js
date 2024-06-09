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
        source: "/smashprop",
        destination: "https://nouns.wtf/vote/534",
        permanent: true,
      },
      {
        source: "/instagram",
        destination: "https://www.instagram.com/nouns_esports/",
        permanent: true,
      },
      {
        source: "/2024",
        destination: "https://nouns.wtf/vote/466",
        permanent: true,
      },
      {
        source: "/goml",
        destination:
          "https://prop.house/0x3830a19ec7aa113cdc9e8fa84aeb0a5080c66bb2",
        permanent: true,
      },
      {
        source: "/tippedoff",
        destination: "https://shorturl.at/s3BZl",
        permanent: true,
      },
      {
        source: "/combo",
        destination:
          "https://prop.house/0x2b46d2a078ab53972c9e68153998159fea21bbc2",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "https://forms.nouns.gg/signup",
        permanent: true,
      },
      {
        source: "/mint/partnership-deck-2024",
        destination: "https://shorturl.at/bpG09",
        permanent: true,
      },
      {
        source: "/mint/art-contest",
        destination: "https://shorturl.at/hvyVZ",
        permanent: true,
      },
      {
        source: "/bracket",
        destination: "https://shorturl.at/jOzr7",
        permanent: true,
      },
      {
        source: "/artwork-tweet",
        destination:
          "https://fxtwitter.com/nounsesports/status/1754574652335161635",
        permanent: true,
      },
      {
        source: "/matchacup",
        destination:
          "https://www.start.gg/tournament/matcha-cup-east-coast/details",
        permanent: true,
      },
      {
        source: "/duffcity",
        destination:
          "https://www.start.gg/tournament/duff-city-volume-3/details",
        permanent: true,
      },
      {
        source: "/davidscup",
        destination: "https://shorturl.at/glyNS",
        permanent: true,
      },
      {
        source: "/dc",
        destination: "https://start.gg/duffcity",
        permanent: true,
      },
      {
        source: "/matcha",
        destination: "https://x.com/nounsesports/status/1785700745154830376",
        permanent: true,
      },
      {
        source: "/party",
        destination:
          "https://rooms.party.app/party/0x66eD9EF8434771A451D44609304dBf865B82A68a",
        permanent: true,
      },
      {
        source: "/davids-cup",
        destination: "https://shorturl.at/glyNS",
        permanent: true,
      },
      {
        source: "/donate",
        destination: "https://tilt.fyi/zNgsRsgiDQ",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
