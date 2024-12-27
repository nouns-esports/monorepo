import { db, snapshots } from "~/packages/db/schema";
import { privyClient } from ".";

const users = await privyClient.getUsers();
const now = new Date();

await db.transaction(async (tx) => {
	let count = 0;
	for (const user of users) {
		count++;
		console.log(`User ${count}/${users.length}`);
		if (user.linkedAccounts.some((account) => account.type === "wallet")) {
			await tx.insert(snapshots).values({
				user: user.id,
				type: "cgx-airdrop",
				timestamp: now,
			});
		}
	}
});
