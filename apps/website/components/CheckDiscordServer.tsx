"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useAction } from "next-safe-action/hooks";
import { placeRank } from "@/server/mutations/placeRank";

export default function CheckDiscordServer() {
  const router = useRouter();

  const placeRankAction = useAction(placeRank);

  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <Button
        onClick={() => {
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
        Check
      </Button>
    </div>
  );
}
