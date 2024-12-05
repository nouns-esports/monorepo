import type { Round } from "~/packages/db/schema";

export function roundState(props: {
	start: Round["start"];
	votingStart: Round["votingStart"];
	end: Round["end"];
}) {
	const now = new Date().getTime();

	const roundStart = new Date(props.start).getTime();
	const votingStart = new Date(props.votingStart).getTime();
	const roundEnd = new Date(props.end).getTime();

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
