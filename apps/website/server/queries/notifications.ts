import { and, desc, eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import { db, notifications } from "~/packages/db/schema";

export const getNotifications = cache(
	async (input: { user: string }) => {
		//
		return db.query.notifications.findMany({
			where: eq(notifications.user, input.user),
			orderBy: desc(notifications.timestamp),
			with: {
				ranking: true,
				round: true,
				quest: true,
				event: true,
			},
			limit: 10,
		});
	},
	["getNotifications"],
	{ revalidate: 60 * 10 },
);
