"use client";

import { Collection } from "@/utils/fetchCollection";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { parseAbiItem, parseEther } from "viem";
import { useAccount, useContractWrite } from "wagmi";
import Text from "./Text";
import IERC720 from "@/contracts/zora/IERC720";
import IERC1155 from "@/contracts/zora/IERC1155";

export default function CollectButton(props: { collection: Collection }) {
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();

  const collectZORAERC721 = useContractWrite({
    address: props.collection.address,
    abi: IERC720,
    functionName: "mintWithRewards",
  });

  const collectZORAERC1155 = useContractWrite({
    address: props.collection.address,
    abi: IERC1155,
    functionName: "mintWithRewards",
  });

  return (
    <button
      onClick={() => {
        if (!isConnected && openConnectModal) {
          openConnectModal();
          return;
        }

        if ("isclosedforminting") {
          return;
        }

        switch (props.collection.type) {
          case "ZORA-ERC721": {
            collectZORAERC721.write({
              value: parseEther("0.00277"),
              args: [1n],
            });

            break;
          }
          case "ZORA-ERC1155": {
            collectZORAERC1155.write();

            break;
          }
        }
      }}
      className="flex py-2.5 px-4 items-center w-min gap-2 select-none text-darkgrey text-xl bg-white hover:bg-white/80 transition-colors rounded-full justify-center leading-none font-bebas-neue whitespace-nowrap"
    >
      <Text en="Collect" pt="Coletar" />
    </button>
  );
}
