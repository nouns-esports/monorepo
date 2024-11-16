"use server";

import { db, votes, proposals, rounds } from "~/packages/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { onlyRanked } from ".";

export const castVotes = onlyRanked
	.schema(
		z.object({
			round: z.string(),
			votes: z.array(z.object({ proposal: z.number(), count: z.number() })),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const round = await db.query.rounds.findFirst({
			where: eq(rounds.id, parsedInput.round),
			with: {
				votes: {
					where: eq(votes.user, ctx.user.id),
				},
				minVoterRank: true,
			},
		});

		if (!round) {
			throw new Error("Round not found");
		}

		if (
			round.minVoterRank &&
			ctx.user.nexus?.rank?.place &&
			ctx.user.nexus?.rank?.place < round.minVoterRank.place
		) {
			throw new Error("You are not eligible to vote in this round");
		}

		const now = new Date();
		const votingStart = new Date(round.votingStart);
		const roundEnd = new Date(round.end);

		if (now < votingStart) {
			throw new Error("Voting has not started yet");
		}

		if (now > roundEnd) {
			throw new Error("Round has ended");
		}

		let votesUsed = round.votes.reduce((votes, vote) => votes + vote.count, 0);

		await db.transaction(async (tx) => {
			for (const vote of parsedInput.votes) {
				if (vote.count === 0) continue;

				const proposal = await tx.query.proposals.findFirst({
					where: eq(proposals.id, vote.proposal),
				});

				if (!proposal) {
					tx.rollback();
					throw new Error("Proposal not found");
				}

				if (proposal.user === ctx.user.id) {
					tx.rollback();
					throw new Error("You cannot vote on your own proposal");
				}

				if (proposal.round !== parsedInput.round) {
					tx.rollback();
					throw new Error("You can only vote on proposals in the same round");
				}

				if (!ctx.user.nexus?.rank) {
					throw new Error("Enter the Nexus to vote");
				}

				if (votesUsed + vote.count > ctx.user.nexus.rank.votes) {
					tx.rollback();
					throw new Error("You have used all your votes");
				}

				votesUsed += vote.count;

				await tx.insert(votes).values([
					{
						user: ctx.user.id,
						proposal: vote.proposal,
						round: round.id,
						count: vote.count,
						timestamp: now,
					},
				]);

				await tx
					.update(proposals)
					.set({
						totalVotes: proposal.totalVotes + vote.count,
					})
					.where(eq(proposals.id, vote.proposal));
			}
		});

		revalidatePath(`/rounds/${parsedInput.round}`);
	});
