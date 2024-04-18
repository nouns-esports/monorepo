"use client";

import PrimaryColor from "@/providers/PrimaryColor";
import Privy from "@/providers/Privy";
import { Game } from "@/db/schema";
import { Toaster } from "react-hot-toast";
import TRPC from "./TRPC";
import { init } from "@multibase/js";
import { env } from "@/env";

// if (env.NEXT_PUBLIC_ENVIRONMENT === "production") {
//   init(env.NEXT_PUBLIC_MULTIBASE_API_KEY);
// }

export default function Providers(props: {
  children: React.ReactNode;
  games: { id: Game["id"]; color: Game["color"] }[];
}) {
  return (
    <TRPC>
      <Privy>
        <PrimaryColor games={props.games}>{props.children}</PrimaryColor>
      </Privy>
      <Toaster position="top-center" />
    </TRPC>
  );
}
