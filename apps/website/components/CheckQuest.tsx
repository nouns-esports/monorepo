"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

export default function CheckQuest(props: {
  claimed: boolean;
  completed: boolean;
}) {
  const router = useRouter();

  return (
    <Button
      disabled={props.claimed}
      onClick={() => {
        if (!props.completed) {
          return router.refresh();
        }

        if (!props.claimed) {
          return; //completeQuest();
        }
      }}
      size="sm"
    >
      {props.completed ? (props.claimed ? "Claimed" : "Claim") : "Check"}
    </Button>
  );
}
