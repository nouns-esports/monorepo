const createJiti = require("jiti");
const jiti = createJiti(__filename);

jiti("./env");

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
  async redirects() {
    return [
    {
      "source": "/getfunded",
      "destination": "https://prop.house/0x1034a90081f8c4972637516a3f420564a4b2ab64",
      "permanent": true
    },
    {
      "source": "/shop",
      "destination": "https://shop.nouns.gg",
      "permanent": true
    },
    {
      "source": "/jerseys",
      "destination": "https://raven.gg/stores/nounsesports/",
      "permanent": true
    },
    {
      "source": "/duff-hoodie",
      "destination": "https://shop.nouns.gg/collections/duff-city",
      "permanent": true
    },
    {
      "source": "/mint",
      "destination": "https://shorturl.at/mJKPS",
      "permanent": true
    },
    {
      "source": "/discord",
      "destination": "https://discord.com/invite/nounsesports",
      "permanent": true
    },
    {
      "source": "/twitter",
      "destination": "https://x.com/nounsesports",
      "permanent": true
    },
    {
      "source": "/twitch",
      "destination": "https://www.twitch.tv/nounsesports/",
      "permanent": true
    },
    {
      "source": "/youtube",
      "destination": "https://www.youtube.com/@nounsesports",
      "permanent": true
    },
    {
      "source": "/tiktok",
      "destination": "https://www.tiktok.com/@nounsesports",
      "permanent": true
    },
    {
      "source": "/smashprop",
      "destination": "https://nouns.wtf/vote/534",
      "permanent": true
    },
    {
      "source": "/instagram",
      "destination": "https://www.instagram.com/nouns_esports/",
      "permanent": true
    },
    {
      "source": "/2024",
      "destination": "https://nouns.wtf/vote/466",
      "permanent": true
    },
    {
      "source": "/GOML",
      "destination": "https://prop.house/0x3830a19ec7aa113cdc9e8fa84aeb0a5080c66bb2",
      "permanent": true
    },
    {
      "source": "/goml",
      "destination": "https://prop.house/0x3830a19ec7aa113cdc9e8fa84aeb0a5080c66bb2",
      "permanent": true
    },
    {
      "source": "/tippedoff",
      "destination": "https://prop.house/0x972fe18d946cbba02e398aa1749e0c400100deb1",
      "permanent": true
    },
    {
      "source": "/combo-breaker",
      "destination": "https://prop.house/0x2b46d2a078ab53972c9e68153998159fea21bbc2",
      "permanent": true
    },
    {
      "source": "/combo",
      "destination": "https://prop.house/0x2b46d2a078ab53972c9e68153998159fea21bbc2",
      "permanent": true
    },
    {
      "source": "/signup",
      "destination": "https://forms.nouns.gg/signup",
      "permanent": true
    },
    {
      "source": "/mint/partnership-deck-2024",
      "destination": "https://shorturl.at/bpG09",
      "permanent": true
    },
    {
      "source": "/mint/art-contest",
      "destination": "https://shorturl.at/hvyVZ",
      "permanent": true
    },
    {
      "source": "/artwork-tweet",
      "destination": "https://fxtwitter.com/nounsesports/status/1754574652335161635",
      "permanent": true
    },
    {
      "source": "/matchacup",
      "destination": "https://www.start.gg/tournament/matcha-cup/details",
      "permanent": true
    },
    {
      "source": "/duffcity",
      "destination": "https://www.start.gg/tournament/duff-city-volume-2/details",
      "permanent": true
    },
    {
      "source": "/davidscup",
      "destination": "https://tiltify.com/+davids-cup/davids-cup",
      "permanent": true
    },
    {
      "source": "/matcha",
      "destination": "https://x.com/nounsesports/status/1785700745154830376",
      "permanent": true
    },
    {
      "source": "/party",
      "destination": "https://rooms.party.app/party/0x66eD9EF8434771A451D44609304dBf865B82A68a",
      "permanent": true
    },
    {
      "source": "/davids-cup",
      "destination": "https://tiltify.com/+davids-cup/davids-cup",
      "permanent": true
    },
    {
      "source": "/donate",
      "destination": "https://tilt.fyi/zNgsRsgiDQ",
      "permanent": true
    }
  ];
  }
};

module.exports = nextConfig;
