"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useAction } from "next-safe-action/hooks";
import { placeRank } from "@/server/mutations/placeRank";
import { usePrivy } from "@privy-io/react-auth";
import type { AuthenticatedUser } from "@/server/queries/users";

export default function CheckDiscordServer(props: {
  user?: AuthenticatedUser;
}) {
  const router = useRouter();

  const placeRankAction = useAction(placeRank);

  const [isPending, startTransition] = useTransition();

  const { linkDiscord } = usePrivy();

  return (
    <div>
      <Button
        onClick={() => {
          if (!props.user?.discord) {
            return linkDiscord();
          }

          startTransition(() => {
            placeRankAction.executeAsync().then((result) => {
              if (result?.serverError) return toast.error(result.serverError);

              router.refresh();
            });
          });
        }}
        size="sm"
        loading={isPending}
      >
        {props.user?.discord ? "Check" : "Connect Discord"}
      </Button>
    </div>
  );
}
