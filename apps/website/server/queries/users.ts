import * as jose from "jose";
import { env } from "~/env";
import { createPublicKey } from "crypto";
import { eq, isNotNull, or } from "drizzle-orm";
import { db, nexus, xp } from "~/packages/db/schema";
import { unstable_cache as cache } from "next/cache";
import { cookies, headers } from "next/headers";

export async function getAuthenticatedUser() {
	const token = (await cookies()).get("privy-id-token");

	const headersList = await headers();
	const cookiesList = await cookies();

	headersList.forEach(async (value, key) => {
		console.log("Header: ", key, value);
	});

	cookiesList.getAll().forEach(async (value, key) => {
		console.log("Cookie: ", key, value);
	});

	if (!token) return;

	try {
		const { payload, protectedHeader } = await jose.jwtVerify(
			token.value,
			createPublicKey(env.PRIVY_VERIFICATION_KEY),
			{
				issuer: "privy.io",
				audience: env.NEXT_PUBLIC_PRIVY_APP_ID,
			},
		);

		if (!payload.sub) return;

		let discord:
			| {
					subject: string;
					username: string;
			  }
			| undefined;

		let twitter:
			| {
					subject: string;
					username: string;
			  }
			| undefined;

		let farcaster:
			| {
					fid: number;
					username: string;
			  }
			| undefined;

		const wallets: Array<{
			address: string;
			chain_type: string;
			wallet_client_type: string;
		}> = [];

		let smartWallet: string | undefined;

		let email: string | undefined;

		for (const { type, ...account } of JSON.parse(
			payload.linked_accounts as any,
		)) {
			if (type === "discord_oauth") discord = account;
			if (type === "twitter_oauth") twitter = account;
			if (type === "farcaster") farcaster = account;
			if (type === "smart_wallet") {
				smartWallet = account.address;
			}
			if (type === "wallet" && account.wallet_client_type !== "privy") {
				wallets.push(account);
			}
			if (type === "email") email = account.address;
		}

		return {
			id: payload.sub,
			discord,
			twitter,
			farcaster,
			wallets,
			smartWallet,
			email,
			nexus: await db.query.nexus.findFirst({
				where: eq(nexus.id, payload.sub),
				with: {
					rank: true,
				},
			}),
		};
	} catch (e) {
		console.error(e);
	}
}

export type AuthenticatedUser = NonNullable<
	Awaited<ReturnType<typeof getAuthenticatedUser>>
>;

export const getUser = cache(
	async (input: { user: string }) => {
		//////
		return db.query.nexus.findFirst({
			where: or(
				eq(nexus.id, input.user),
				eq(nexus.discord, input.user.split("#")[0]),
				eq(nexus.username, input.user),
			),
			with: {
				rank: true,
			},
		});
	},
	["getUser"],
	{ tags: ["getUser"], revalidate: 60 * 10 },
);

export const getUserStats = cache(
	async (input: { user: string }) => {
		const user = await db.query.nexus.findFirst({
			where: eq(nexus.id, input.user),
			with: {
				proposals: true,
				xpRecords: {
					where: isNotNull(xp.quest),
				},
				votes: true,
			},
		});

		return {
			proposalsCreated: user?.proposals.length ?? 0,
			questsCompleted: user?.xpRecords.length ?? 0,
			votesCast: user?.votes.length ?? 0,
		};
	},
	["getUserStats"],
	{ tags: ["getUserStats"], revalidate: 60 * 10 },
);
