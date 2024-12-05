"use server";

import { onlyUser } from ".";
import { db, notifications } from "~/packages/db/schema";
import { eq } from "drizzle-orm";

export const readNotifications = onlyUser.action(async ({ ctx }) => {
	await db
		.update(notifications)
		.set({ read: true })
		.where(eq(notifications.user, ctx.user.id));
});
