import { formatEther, formatUnits } from "viem";
import ethusdABI from "./ABI/ethusdABI.js";
import usdcABI from "./ABI/usdcABI.js";

export default async function getBalance(client) {
  const ether = await client.getBalance({
    address: process.env.MULTISIG,
  });

  const usdc = await client.readContract({
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    abi: usdcABI,
    functionName: "balanceOf",
    args: [process.env.MULTISIG],
  });

  const ETHUSD = await client.readContract({
    address: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    abi: ethusdABI,
    functionName: "latestAnswer",
  });

  return (
    formatEther(ether) * (Number(ETHUSD) / 10 ** 8) + Number(usdc) / 10 ** 6
  );
}
