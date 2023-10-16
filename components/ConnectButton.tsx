"use client";

import { ConnectButton as RainbowKitConnectButton } from "@rainbow-me/rainbowkit";
import Text from "./Text";
import Image from "next/image";

export default function ConnectButton() {
  return (
    <RainbowKitConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <button
            onClick={() =>
              connected ? openAccountModal() : openConnectModal()
            }
            style={{
              paddingTop: connected ? "6px" : "10px",
              paddingBottom: connected ? "6px" : "10px",
              paddingLeft: connected ? "6px" : "16px",
              paddingRight: connected ? "14px" : "16px",
            }}
            className="flex items-center gap-2 select-none text-darkgrey py-1.5 pl-1.5 pr-3.5  text-xl bg-white hover:bg-white/80 transition-colors rounded-full justify-center leading-none font-bebas-neue whitespace-nowrap"
          >
            {connected ? (
              <>
                {account?.ensAvatar && (
                  <img
                    src={account.ensAvatar}
                    alt={`${account.ensName ?? account.address}'s avatar`}
                    className="rounded-full w-7 h-7 select-none"
                    draggable={false}
                  />
                )}
                {account?.ensName
                  ? formatENSName(account.ensName)
                  : formatAddress(account?.address ?? "")}
              </>
            ) : (
              <Text en="Sign in" pt="Entrar" />
            )}
          </button>
        );
      }}
    </RainbowKitConnectButton.Custom>
  );
}

function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatENSName(name: string) {
  return name.replace(".eth", "");
}
