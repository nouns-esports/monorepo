"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import { useTransition } from "react";
import { completeQuest } from "@/server/mutations/completeQuest";
import { useAction } from "next-safe-action/hooks";
import { toast } from "react-hot-toast";
import EarnedXPModal from "./modals/EarnedXPModal";
import { useModal } from "./Modal";
import { confetti } from "@/utils/confetti";

export default function CheckQuest(props: {
  quest: string;
  xp: number;
  claimed: boolean;
  completed: boolean;
  userXP: number;
}) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const completeQuestAction = useAction(completeQuest);

  const { open } = useModal(`earned-xp-quest-${props.quest}`);

  return (
    <>
      <Button
        disabled={props.claimed}
        loading={isPending || completeQuestAction.isPending}
        onClick={async () => {
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

            confetti();
            open();
          }
        }}
        size="sm"
      >
        {props.completed ? (props.claimed ? "Claimed" : "Claim") : "Check"}
      </Button>
      <EarnedXPModal
        from={`quest-${props.quest}`}
        xp={props.xp}
        userXP={props.userXP}
      />
    </>
  );
}
