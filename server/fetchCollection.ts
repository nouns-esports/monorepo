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

// export type Collection = {
//   id: string;
//   previous: string;
//   next: string;
//   address: Address;
//   chain: keyof typeof chains;
//   type: "ZORA-ERC721" | "ZORA-ERC1155";
//   name: Record<Locale, string>;
//   description: Record<Locale, string>;
//   background?: string;
//   image: string;
//   url: string;
//   closed: boolean;
// };

// export default async function fetchCollection(id: string) {
//   const collections: Record<string, Collection> = {
//     "esports-summer": {
//       id: "esports-summer",
//       previous: "",
//       next: "esports-introduced",
//       address: "0x",
//       chain: "base",
//       type: "ZORA-ERC1155",
//       name: { en: "Esports Summer", pt: "Esports Verão" },
//       description: {
//         en: "We love esports. Get involved in your favorite esports community and you can make a difference! Video made with love by nounish ⌐◨-◨",
//         pt: "Amamos os esports. Envolva-se em sua comunidade de esports favorita e você pode fazer a diferença! Vídeo feito com amor por nounish ⌐◨-◨",
//       },
//       background: "/collections/esports-summer.webp",
//       image: "/collections/esports-summer.gif",
//       url: "https://www.youtube.com/watch?v=SAXzMQ8pPvE",
//       closed: false,
//     },
//     "esports-introduced": {
//       id: "esports-introduced",
//       previous: "esports-summer",
//       next: "",
//       address: "0x298e7881bd9fd35d3b1d860701560364947c4e02",
//       chain: "mainnet",
//       type: "ZORA-ERC721",

//       name: { en: "Esports Introduced", pt: "Esports Apresentados" },
//       description: {
//         en: "Introducing Nouns Esports, a community that spreads the ⌐◨-◨ meme and drives innovation at the intersection of web3 and gaming. This artwork tells the story of decentralization and the opportunities that open source brands, like Nouns, enable for creatives. Mint ‘Esports, Introduced’ to celebrate the testnet launch of Base and join the broader decentralized gaming community. We're excited to build esports together with you.",
//         pt: "Apresentando Nouns Esports, uma comunidade que propaga o meme ⌐◨-◨ e impulsiona a inovação na intersecção de web3 e jogos. Esta obra de arte conta a história da descentralização e as oportunidades que marcas de código aberto, como a Nouns, possibilitam para criativos. Cunhe 'Esports, Apresentados' para celebrar o lançamento da testnet do Base e junte-se à ampla comunidade de jogos descentralizada. Estamos animados para construir esports juntos com você.",
//       },
//       image: "/collections/esports-introduced.webp",
//       url: "https://base.org",
//       closed: true,
//     },
//   };

//   return collections[id];
// }

export type Collection = {
  id: string;
  previous: string;
  next: string;
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
      name: { en: "Esports Summer", pt: "Esports Verão" },
      description: {
        en: "We love esports. Get involved in your favorite esports community and you can make a difference! Video made with love by nounish ⌐◨-◨",
        pt: "Amamos os esports. Envolva-se em sua comunidade de esports favorita e você pode fazer a diferença! Vídeo feito com amor por nounish ⌐◨-◨",
      },
      background: "/collections/esports-summer.webp",
      image: "/collections/esports-summer.gif",
      url: "https://zora.co/collect/base:0xbd627052c6699bd873de44b019ea04b1a191f3fc/1?referrer=0x8b45D1CACcb3593E9F1015BA8e97AFB68DE3a0d1",
    },
    "esports-introduced": {
      id: "esports-introduced",
      previous: "esports-summer",
      next: "",
      name: { en: "Esports Introduced", pt: "Esports Apresentados" },
      description: {
        en: "Introducing Nouns Esports, a community that spreads the ⌐◨-◨ meme and drives innovation at the intersection of web3 and gaming. This artwork tells the story of decentralization and the opportunities that open source brands, like Nouns, enable for creatives. Mint ‘Esports, Introduced’ to celebrate the testnet launch of Base and join the broader decentralized gaming community. We're excited to build esports together with you.",
        pt: "Apresentando Nouns Esports, uma comunidade que propaga o meme ⌐◨-◨ e impulsiona a inovação na intersecção de web3 e jogos. Esta obra de arte conta a história da descentralização e as oportunidades que marcas de código aberto, como a Nouns, possibilitam para criativos. Cunhe 'Esports, Apresentados' para celebrar o lançamento da testnet do Base e junte-se à ampla comunidade de jogos descentralizada. Estamos animados para construir esports juntos com você.",
      },
      image: "/collections/esports-introduced.webp",
      url: "https://zora.co/collect/eth:0x298e7881bd9fd35d3b1d860701560364947c4e02",
    },
  };

  return collections[id];
}
