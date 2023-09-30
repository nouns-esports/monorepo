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
  address: Address;
  chain: keyof typeof chains;
  type: "ZORA-ERC721" | "ZORA-ERC1155";
  name: string;
  description: string;
  image: string;
  url: string;
};

export default async function fetchCollections() {
  const collections: Collection[] = [
    {
      id: "esports-summer",
      address: "0x",
      chain: "base",
      type: "ZORA-ERC1155",
      name: "Esports Summer ⌐◨-◨",
      description:
        "We love esports. Join the community from our website, nouns.gg Video made with love by nounish ⌐◨-◨",
      image: "/collections/esports-summer.jpg",
      url: "https://nouns.gg",
    },
    {
      id: "esports-introduced",
      address: "0x298e7881bd9fd35d3b1d860701560364947c4e02",
      chain: "mainnet",
      type: "ZORA-ERC721",

      name: "Esports, Introduced",
      description:
        "Introducing Nouns Esports, a community that spreads the ⌐◨-◨ meme and drives innovation at the intersection of web3 and gaming. This artwork tells the story of decentralization and the opportunities that open source brands, like Nouns, enable for creatives. Mint ‘Esports, Introduced’ to celebrate the testnet launch of @BuildOnBase and join the broader decentralized gaming community. We’re excited to build esports together with you. Art inspired by Base, Introduced https://mint.base.org",
      image: "/collections/esports-introduced.webp",
      url: "https://mint.base.org",
    },
  ];

  return collections;
}
