import { agent } from "../";
import { db, nexus, xp, seasons, snapshots } from "~/packages/db/schema";
import { and, gte, lte, desc, eq, inArray, or } from "drizzle-orm";

agent.addTool({
	description:
		"Takes a snapshot and distributes xp to attendees of a weekly contributor voice call",
	providers: ["discord"],
	execute: async (context) => {
		if (
			![
				"samscolari",
				"sasquatch",
				"peterpandam",
				"ohantheman",
				"patyiutazza",
			].includes(context.author)
		) {
			return "ERROR: User is not authorized to take this action";
		}

		const now = new Date();

		const channel =
			await agent.plugins.discord.client.channels.fetch("967723008116531219");

		if (!channel) {
			return "ERROR: Voice channel could not be found";
		}

		if (!channel.isVoiceBased()) {
			return "ERROR: Channel must be a voice channel";
		}

		const members = channel.members.map(
			(guildMember) => guildMember.user.username,
		);

		if (members.length === 0) {
			return "ERROR: There are no members currently in the voice channel";
		}

		const [users, currentSeason] = await Promise.all([
			db.query.nexus.findMany({
				where: inArray(nexus.discord, members),
			}),
			db.query.seasons.findFirst({
				where: and(lte(seasons.start, now), gte(seasons.end, now)),
				orderBy: desc(seasons.start),
			}),
		]);

		if (!currentSeason) {
			return "ERROR: There is not an ongoing season";
		}

		await db.transaction(async (tx) => {
			for (const user of users) {
				const [snapshot] = await tx
					.insert(snapshots)
					.values({
						type: "discord-call",
						user: user.id,
						timestamp: now,
					})
					.returning({ id: snapshots.id });

				const amount = 300;

				await tx.insert(xp).values({
					user: user.id,
					amount,
					timestamp: now,
					snapshot: snapshot.id,
					season: currentSeason.id,
				});

				await tx
					.update(nexus)
					.set({
						xp: user.xp + amount,
					})
					.where(eq(nexus.id, user.id));
			}
		});
	},
});
