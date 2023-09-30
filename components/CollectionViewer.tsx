"use client";

import type { Collection } from "@/utils/fetchCollections";
import { CaretLeft, CaretRight } from "phosphor-react-sc";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Text from "./Text";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useContractWrite } from "wagmi";
import IERC721Drop from "@/contracts/zora/IERC721Drop";
import { parseEther } from "viem";

export default function CollectionViewer(props: { collections: Collection[] }) {
  const [collections, setCollections] = useState(props.collections);

  const [currentCollection, setCurrentCollection] = useState(0);

  return (
    <div
      style={{
        backgroundImage: `url(${collections[currentCollection].image})`,
      }}
      className="relative h-[calc(100vh_-_2.25rem)] bg-no-repeat bg-cover bg-center flex items-center justify-center transition-all"
    >
      <div className="absolute top-0 w-full h-full">
        <div className="from-black to-transparent bg-gradient-to-t h-1/6 w-full bottom-0 z-10 absolute" />
        <div className="w-full h-full backdrop-blur-[64px] brightness-75"></div>
      </div>
      <div className="absolute z-10 left-16 h-full flex items-center justify-center">
        <CaretLeft
          onClick={() => {
            if (currentCollection > 0)
              setCurrentCollection(currentCollection - 1);
          }}
          className={`${
            currentCollection === 0 ? "text-black/25" : "text-white"
          } w-10 h-10 cursor-pointer`}
          weight="bold"
        />
      </div>
      <div className="absolute z-10 right-16 h-full flex items-center justify-center">
        <CaretRight
          onClick={() => {
            if (currentCollection < collections.length - 1)
              setCurrentCollection(currentCollection + 1);
          }}
          className={`${
            currentCollection === collections.length - 1
              ? "text-black/25"
              : "text-white"
          } w-10 h-10 cursor-pointer`}
          weight="bold"
        />
      </div>
      <div className="relative w-full h-full flex px-64 gap-16">
        <div className="w-full h-full flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={collections[currentCollection].name}
              initial={{ opacity: currentCollection === 0 ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <img
                draggable={false}
                src={collections[currentCollection].image}
                className="w-full rounded-2xl select-none drop-shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="w-full h-full flex flex-col justify-center gap-8">
          <h1 className="text-5xl text-white font-bebas-neue select-none">
            {collections[currentCollection].name}
          </h1>
          <p className="text-lg text-white font-cabin select-none">
            {collections[currentCollection].description}
          </p>
          <CollectButton collection={collections[currentCollection]} />
        </div>
      </div>
    </div>
  );
}

function CollectButton(props: { collection: Collection }) {
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
