"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import { useTransition } from "react";
import { completeQuest } from "@/server/mutations/completeQuest";
import { useAction } from "next-safe-action/hooks";
import { toast } from "react-hot-toast";
import EarnedXPModal, { useXPModal } from "./modals/EarnedXPModal";
import { useModal } from "./Modal";
import { confetti } from "@/utils/confetti";

export default function CheckQuest(props: {
  user: boolean;
  active: boolean;
  quest: string;
  xp: number;
  claimed: boolean;
  completed: boolean;
  userXP: number;
}) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const completeQuestAction = useAction(completeQuest);

  const xpModal = useModal(`earned-xp-quest-${props.quest}`);
  const signInModal = useModal("sign-in");

  const { setXP } = useXPModal();

  return (
    <>
      <Button
        disabled={props.active ? props.claimed : true}
        loading={isPending || completeQuestAction.isPending}
        onClick={async () => {
          if (!props.user) {
            return signInModal.open();
          }

          if (!props.completed) {
            return startTransition(() => router.refresh());
          }

          if (!props.claimed) {
            const result = await completeQuestAction.executeAsync({
              quest: props.quest,
            });

            if (result?.serverError) {
              return toast.error(result.serverError);
            }

            setXP(result?.data ?? 0);
            confetti();
            xpModal.open();
          }
        }}
        size="sm"
      >
        {props.user
          ? props.completed
            ? props.claimed
              ? "Claimed"
              : "Claim"
            : "Check"
          : "Sign in"}
      </Button>
      <EarnedXPModal
        from={`quest-${props.quest}`}
        redirect={{ link: "/quests", text: "View Quests" }}
      />
    </>
  );
}
