"use server";

import { env } from "~/env";
import { onlyUser } from ".";
import { db, nexus, rankings, ranks } from "~/packages/db/schema";
import { desc, eq, asc } from "drizzle-orm";
import checkDiscordAccountAge from "@/utils/checkDiscordAccountAge";
import { revalidatePath } from "next/cache";

export const placeRank = onlyUser.action(async ({ ctx }) => {
	if (ctx.user.nexus?.rank) {
		throw new Error("You are already ranked");
	}

	if (!ctx.user.discord?.subject) {
		throw new Error("You must connect a Discord account first");
	}

	if (!checkDiscordAccountAge(ctx.user.discord.subject)) {
		throw new Error("Your Discord account is not old enough");
	}

	const response = await fetch(
		`https://discord.com/api/guilds/${env.DISCORD_GUILD_ID}/members/${ctx.user.discord.subject}`,
		{
			headers: {
				Authorization: `Bot ${env.DISCORD_TOKEN}`,
			},
		},
	);

	if (!response.ok) {
		throw new Error("User not in server");
	}

	const lowestRank = await db.query.ranks.findFirst({
		orderBy: asc(ranks.place),
	});

	if (!lowestRank) {
		throw new Error("No ranks found");
	}

	await db.transaction(async (tx) => {
		await tx
			.update(nexus)
			.set({ rank: lowestRank.id })
			.where(eq(nexus.id, ctx.user.id));
	});

	revalidatePath(`/users/${ctx.user.id}`);
	if (ctx.user.nexus?.discord) {
		revalidatePath(`/users/${ctx.user.nexus.discord}`);
	}
	revalidatePath("/nexus");
});
