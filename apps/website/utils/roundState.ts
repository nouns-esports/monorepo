import { Round } from "~/packages/db/schema";

export function roundState(round: Round) {
  const now = new Date().getTime();

  const roundStart = new Date(round.start).getTime();
  const votingStart = new Date(round.votingStart).getTime();
  const roundEnd = new Date(round.end ?? Infinity).getTime();

  const state =
    now < roundStart
      ? "starting"
      : now < votingStart
        ? "proposing"
        : now < roundEnd
          ? "voting"
          : "ended";

  return state;
}
