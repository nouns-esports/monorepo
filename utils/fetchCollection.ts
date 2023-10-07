import { Locale } from "@/middleware";
import type { Address } from "viem";
import chains from "viem/chains";

// import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";

// export const zdk = new ZDK({
//   endpoint: "https://api.zora.co/graphql",
//   networks: [
//     {
//       network: ZDKNetwork.Ethereum,
//       chain: ZDKChain.Mainnet,
//     },
//     { network: ZDKNetwork.Base, chain: ZDKChain.BaseMainnet },
//   ],
// });

export type Collection = {
  id: string;
  previous: string;
  next: string;
  address: Address;
  chain: keyof typeof chains;
  type: "ZORA-ERC721" | "ZORA-ERC1155";
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  background?: string;
  image: string;
  url: string;
};

export default async function fetchCollection(id: string) {
  const collections: Record<string, Collection> = {
    "esports-summer": {
      id: "esports-summer",
      previous: "",
      next: "esports-introduced",
      address: "0x",
      chain: "base",
      type: "ZORA-ERC1155",
      name: { en: "Esports Summer", pt: "Esports Summer" },
      description: {
        en: "We love esports. Join the community from our website, nouns.gg Video made with love by nounish ⌐◨-◨",
        pt: "We love esports. Join the community from our website, nouns.gg Video made with love by nounish ⌐◨-◨",
      },
      background: "/collections/esports-summer.webp",
      image: "/collections/esports-summer.gif",
      url: "https://www.youtube.com/watch?v=SAXzMQ8pPvE",
    },
    "esports-introduced": {
      id: "esports-introduced",
      previous: "esports-summer",
      next: "",
      address: "0x298e7881bd9fd35d3b1d860701560364947c4e02",
      chain: "mainnet",
      type: "ZORA-ERC721",

      name: { en: "Esports Introduced", pt: "Esports Introduced" },
      description: {
        en: "Introducing Nouns Esports, a community that spreads the ⌐◨-◨ meme and drives innovation at the intersection of web3 and gaming. This artwork tells the story of decentralization and the opportunities that open source brands, like Nouns, enable for creatives. Mint ‘Esports, Introduced’ to celebrate the testnet launch of @BuildOnBase and join the broader decentralized gaming community. We're excited to build esports together with you. Art inspired by Base, Introduced https://mint.base.org",
        pt: "Introducing Nouns Esports, a community that spreads the ⌐◨-◨ meme and drives innovation at the intersection of web3 and gaming. This artwork tells the story of decentralization and the opportunities that open source brands, like Nouns, enable for creatives. Mint ‘Esports, Introduced’ to celebrate the testnet launch of @BuildOnBase and join the broader decentralized gaming community. We're excited to build esports together with you. Art inspired by Base, Introduced https://mint.base.org",
      },
      image: "/collections/esports-introduced.webp",
      url: "https://mint.base.org",
    },
  };

  return collections[id];
}
