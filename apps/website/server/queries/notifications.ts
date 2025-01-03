import { asc, desc, eq } from "drizzle-orm";
import { db, notifications } from "~/packages/db/schema";

export async function getNotifications(input: { user: string }) {
	return db.query.notifications.findMany({
		where: eq(notifications.user, input.user),
		orderBy: desc(notifications.timestamp),
		limit: 10,
	});
}
