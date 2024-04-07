import { Award } from "@/server/db/schema";

// type is defined as a CAIP-10 string with an optional ID for 1155 token ids
// See https://docs.farcaster.xyz/reference/frames/spec#mint
// USDC on Base: eip155:8453:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
// ETH on Base: eip155:8453:0x0000000000000000000000000000000000000000
// An ERC1155: eip155:8453:0xADDRESS:2

const usdcType = "eip155:8453:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const usdcDecimals = "000000";

const builderTokenType =
  "eip155:1:0xb15e3327351ea46ab314f809652076f9c37ece07:2";

const ethTokenType = "eip155:1:0x0000000000000000000000000000000000000000";
const ethDecimalsMinus1 = "00000000000000000";

const awards: Award[] = [
  // Offchian (Infinite)
  {
    round: "compete",
    place: 0,
    type: usdcType,
    value: `10000${usdcDecimals}`,
  },
  {
    round: "tournaments",
    place: 0,
    type: usdcType,
    value: `10000${usdcDecimals}`,
  },
  // Onchain
  ...[
    {
      round: "builders-build",
      place: 1,
      type: builderTokenType,
      value: "1",
    },
    {
      round: "builders-build",
      place: 1,
      type: builderTokenType,
      value: "2",
    },
    {
      round: "builders-build",
      place: 1,
      type: builderTokenType,
      value: "3",
    },
    {
      round: "builders-build",
      place: 1,
      type: builderTokenType,
      value: "4",
    },
    {
      round: "builders-build",
      place: 1,
      type: builderTokenType,
      value: "5",
    },
  ],
  ...[
    {
      round: "genesis-x",
      place: 1,
      type: "eip155:1:0x0938c5372675e58ea315cbb574e5ceafae9a8f5a:1",
      value: "1",
    },
  ],
  ...[
    {
      round: "gaming-art-contest",
      place: 1,
      type: ethTokenType,
      value: `5${ethDecimalsMinus1}`,
    },
    {
      round: "gaming-art-contest",
      place: 2,
      type: ethTokenType,
      value: `2${ethDecimalsMinus1}`,
    },
    {
      round: "gaming-art-contest",
      place: 3,
      type: ethTokenType,
      value: `1${ethDecimalsMinus1}`,
    },
    {
      round: "gaming-art-contest",
      place: 4,
      type: ethTokenType,
      value: `1${ethDecimalsMinus1}`,
    },
    {
      round: "gaming-art-contest",
      place: 5,
      type: ethTokenType,
      value: `1${ethDecimalsMinus1}`,
    },
  ],
  ...[
    {
      round: "collision-2024",
      place: 1,
      type: "eip155:1:0x0938c5372675e58ea315cbb574e5ceafae9a8f5a:3",
      value: "1",
    },
  ],
  ...[
    {
      round: "battle-of-bc-2024",
      place: 1,
      type: "eip155:1:0x0938c5372675e58ea315cbb574e5ceafae9a8f5a:4",
      value: "1",
    },
  ],
  ...[
    {
      round: "goml-2024",
      place: 1,
      type: usdcType,
      value: `1500${usdcDecimals}`,
    },
  ],
  ...[
    {
      round: "tipped-off-15",
      place: 1,
      type: usdcType,
      value: `1500${usdcDecimals}`,
    },
  ],
  ...[
    {
      round: "combo-breaker-2024",
      place: 1,
      type: usdcType,
      value: `1500${usdcDecimals}`,
    },
  ],
  ...[
    {
      round: "pokemon-art-contest",
      place: 1,
      type: usdcType,
      value: `500${usdcDecimals}`,
    },
    {
      round: "pokemon-art-contest",
      place: 2,
      type: usdcType,
      value: `250${usdcDecimals}`,
    },
  ],
  ...[
    {
      round: "evo-japan-2024",
      place: 1,
      type: usdcType,
      value: `300${usdcDecimals}`,
    },
    {
      round: "evo-japan-2024",
      place: 2,
      type: usdcType,
      value: `300${usdcDecimals}`,
    },
    {
      round: "evo-japan-2024",
      place: 3,
      type: usdcType,
      value: `300${usdcDecimals}`,
    },
    {
      round: "evo-japan-2024",
      place: 4,
      type: usdcType,
      value: `300${usdcDecimals}`,
    },
    {
      round: "evo-japan-2024",
      place: 5,
      type: usdcType,
      value: `300${usdcDecimals}`,
    },
    {
      round: "evo-japan-2024",
      place: 6,
      type: usdcType,
      value: `300${usdcDecimals}`,
    },
    {
      round: "evo-japan-2024",
      place: 7,
      type: usdcType,
      value: `300${usdcDecimals}`,
    },
    {
      round: "evo-japan-2024",
      place: 8,
      type: usdcType,
      value: `300${usdcDecimals}`,
    },
    {
      round: "evo-japan-2024",
      place: 9,
      type: usdcType,
      value: `300${usdcDecimals}`,
    },
    {
      round: "evo-japan-2024",
      place: 10,
      type: usdcType,
      value: `300${usdcDecimals}`,
    },
  ],
];
