"use client";

import IERC721Drop from "@/contracts/zora/IERC721Drop";
import { Collection } from "@/utils/fetchCollection";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { parseEther } from "viem";
import { useAccount, useContractWrite } from "wagmi";
import Text from "./Text";

export default function CollectButton(props: { collection: Collection }) {
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: props.collection.address,
    abi: IERC721Drop,
    functionName: "purchase",
  });

  return (
    <button
      onClick={() => {
        if (!isConnected && openConnectModal) {
          openConnectModal();
        }

        if (props.collection.type === "ZORA-ERC721") {
          write({
            value: parseEther("0.00277"),
            args: [1n],
          });
        } else write();
      }}
      className="flex py-2.5 px-4 items-center w-min gap-2 select-none text-darkgrey text-xl bg-white hover:bg-white/80 transition-colors rounded-full justify-center leading-none font-bebas-neue whitespace-nowrap"
    >
      <Text en="Collect" pt="Coletar" />
    </button>
  );
}
