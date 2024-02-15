"use client";

import { usePrivy } from "@privy-io/react-auth";
import Text from "@/components/Text";
import { useSmartAccount } from "@/providers/Privy";

export default function ConnectButton() {
  const { login, logout } = usePrivy();

  const { address, connected } = useSmartAccount();

  return (
    <button
      onClick={() => {
        if (connected) logout();
        else login();
      }}
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
          <img
            src={`https://api.cloudnouns.com/v1/pfp?text=${address}`}
            alt={`${address}'s avatar`}
            className="rounded-full w-7 h-7 select-none"
            draggable={false}
          />
          {`${address?.slice(0, 5)}...${address?.slice(-3)}`}
        </>
      ) : (
        <Text en="Connect" pt="Conectar" />
      )}
    </button>
  );
}
