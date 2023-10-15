"use client";

import { Collection } from "@/utils/server/fetchCollection";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useContractWrite } from "wagmi";
import Text from "./Text";
import IERC720 from "@/contracts/zora/IERC720";
import IERC1155 from "@/contracts/zora/IERC1155";
import fireworks from "@/utils/confetti/fireworks";

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
      id="collect"
      onClick={() => {
        if (!isConnected && openConnectModal) {
          openConnectModal();
          return;
        }

        if ("isclosedforminting") {
          fireworks();
          return;
        }

        switch (props.collection.type) {
          case "ZORA-ERC721": {
            // collectZORAERC721.write({
            //   value: parseEther("0.00277"),
            //   args: [1n],
            // });

            break;
          }
          case "ZORA-ERC1155": {
            // collectZORAERC1155.write();

            break;
          }
        }
      }}
      className="flex py-2.5 px-4 items-center w-min gap-2 select-none text-darkgrey text-xl bg-white hover:bg-white/80 transition-colors rounded-full justify-center leading-none font-bebas-neue whitespace-nowrap"
    >
      <Spinner />
      <Text en="Collect" pt="Coletar" />
    </button>
  );
}

function Spinner() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin w-4 h-4"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
        fill="black"
        fillOpacity="0.2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 24V20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4V0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill="black"
      />
    </svg>
  );
}
