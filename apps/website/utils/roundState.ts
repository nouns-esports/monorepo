import type { Round } from "~/packages/db/schema";

export function roundState(
  round: Pick<Round, "start" | "votingStart" | "end">
) {
  const now = new Date().getTime();

  const roundStart = new Date(round.start).getTime();
  const votingStart = new Date(round.votingStart).getTime();
  const roundEnd = new Date(round.end ?? Infinity).getTime();

  const state =
    now < roundStart
      ? "Upcoming"
      : now < votingStart
        ? "Proposing"
        : now < roundEnd
          ? "Voting"
          : "Ended";

  return state;
}
