"use client";

import { usePrivy } from "@privy-io/react-auth";
import Button from "./Button";
import { useEffect } from "react";

export default function ConnectButton() {
  const { login, logout, ready, authenticated, user } = usePrivy();

  useEffect(() => {
    console.log({ ready, authenticated, user });
  }, [ready, authenticated, user]);

  return (
    <Button
      onClick={() => {
        if (authenticated) logout();
        else login();
      }}
    >
      {authenticated ? "Connected" : "Connect"}
    </Button>
  );
}
