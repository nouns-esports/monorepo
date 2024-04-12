"use client";

import PostHog from "@/providers/PostHog";
import PrimaryColor from "@/providers/PrimaryColor";
import Privy from "@/providers/Privy";
import { Game } from "@/db/schema";
import { Toaster } from "react-hot-toast";
import TRPC from "./TRPC";

export default function Providers(props: {
  children: React.ReactNode;
  games: { id: Game["id"]; color: Game["color"] }[];
}) {
  return (
    <TRPC>
      <PostHog>
        <Privy>
          <PrimaryColor games={props.games}>{props.children}</PrimaryColor>
        </Privy>
        <Toaster position="top-center" />
      </PostHog>
    </TRPC>
  );
}
