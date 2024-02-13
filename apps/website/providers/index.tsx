"use client";

import PostHog from "@/providers/PostHog";
import PrimaryColor from "@/providers/PrimaryColor";
import Privy from "@/providers/Privy";
import ReactQuery from "@/providers/ReactQuery";
import Wagmi from "@/providers/Wagmi";
import { Game } from "@/db/schema";

export default function Providers(props: {
  children: React.ReactNode;
  games: { id: Game["id"]; color: Game["color"] }[];
}) {
  return (
    <PostHog>
      <Wagmi>
        <ReactQuery>
          <PrimaryColor games={props.games}>
            <Privy>{props.children}</Privy>
          </PrimaryColor>
        </ReactQuery>
      </Wagmi>
    </PostHog>
  );
}
