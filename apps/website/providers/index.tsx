"use client";

import PostHog from "@/providers/PostHog";
import PrimaryColor from "@/providers/PrimaryColor";
import Privy from "@/providers/Privy";
import { Game } from "@/db/schema";

export default function Providers(props: {
  children: React.ReactNode;
  games: { id: Game["id"]; color: Game["color"] }[];
}) {
  return (
    <PostHog>
      <Privy>
        <PrimaryColor games={props.games}>{props.children}</PrimaryColor>
      </Privy>
    </PostHog>
  );
}
