import { db, rounds } from "~/packages/db/schema";
// import { discordClient, privyClient } from ".";
import { eq } from "drizzle-orm";
// import { env } from "~/env";
// import type { GuildMember } from "discord.js";
import fs from "fs";

import type { User } from "@privy-io/server-auth";
import type { GuildMember } from "discord.js";

// console.log("Getting privy users");
// const users = await privyClient.getUsers();

// console.log("Getting round");
const round = await db.query.rounds.findFirst({
	where: eq(rounds.id, "smash-2025"),
	with: {
		proposals: {
			with: {
				votes: {
					with: {
						user: {
							with: {
								rank: true,
							},
						},
					},
				},
			},
		},
	},
});

if (!round) throw new Error("Round not found");

// const voters = round.proposals.flatMap((proposal) =>
// 	proposal.votes
// 		.filter((vote) => vote.nexus)
// 		.map((vote) => ({
// 			nexus: vote.nexus,
// 			proposal: vote.proposal,
// 		})),
// );

// const targets: Record<
// 	string,
// 	{
// 		proposal: number;
// 		guildMember: GuildMember;
// 		privyUser: (typeof users)[number];
// 		nexus: (typeof round)["proposals"][number]["votes"][number]["nexus"];
// 	}
// > = {};

// console.log("Getting guild members");
// const guildMembers = await discordClient.guilds.cache
// 	.get(env.DISCORD_GUILD_ID)
// 	?.members.fetch();

// if (guildMembers) {
// 	let i = 0;
// 	for (const member of guildMembers.values()) {
// 		i++;
// 		console.log(`Getting ${i} of ${guildMembers.size}`);
// 		const privyUser = users.find(
// 			(user) =>
// 				user.discord?.username?.replace("#0", "") === member.user.username,
// 		);

// 		if (!privyUser) continue;

// 		const nexus = voters.find((voter) => voter.nexus.id === privyUser.id);

// 		if (!nexus) continue;

// 		targets[member.id] = {
// 			proposal: nexus.proposal,
// 			guildMember: member,
// 			privyUser,
// 			nexus: nexus.nexus,
// 		};
// 	}
// } else console.log("No guild members found");

const targets: Record<
	string,
	{
		proposal: number;
		guildMember: GuildMember;
		privyUser: User;
		nexus: (typeof round)["proposals"][number]["votes"][number]["user"];
	}
> = JSON.parse(fs.readFileSync("targets.json", "utf-8"));

const flagged = [];

for (const target of Object.values(targets)) {
	// if (!target.guildMember.joinedAt) continue;

	// const joined = new Date(target.guildMember.joinedAt);

	// if (joined > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) continue;
	if (![510, 511].includes(target.proposal)) continue;

	console.log(target.privyUser.discord?.username);

	if (target.privyUser.discord?.username?.replace("#0", "").match(/\d{5}$/))
		flagged.push(target.privyUser.discord?.username);
}

console.log("Flagged", flagged.length);

fs.writeFileSync("flagged.json", JSON.stringify(flagged));
