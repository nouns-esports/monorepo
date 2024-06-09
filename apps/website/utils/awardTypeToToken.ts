export const tokens = {
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913": {
    name: "USDC",
    image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    decimals: 6,
  },
  "0xb15e3327351ea46ab314f809652076f9c37ece07": {
    name: "Nouns Esports Builders",
    image:
      "https://i.seadn.io/s/raw/files/000d9574d11b6f6669c753729bb5adf0.png?auto=format&dpr=1&w=1000",
    decimals: 0,
  },
  "0x0000000000000000000000000000000000000000": {
    name: "ETH",
    image: "https://cdn.worldvectorlogo.com/logos/ethereum-eth.svg",
    decimals: 18,
  },
  "nouns-fest-showcase": {
    name: "Nouns Fest Showcase",
    image: "/rounds/nouns-fest/logo.jpg",
    decimals: 0,
  },
};

export function awardTypeToToken(type: string) {
  const [eip115, chainId, address, tokenId] = type.split(":");

  return {
    ...tokens[address as keyof typeof tokens],
    chainId,
    address,
    tokenId,
  };
}
