import { getAuthenticatedUser } from "@/server/queries/users";
import { and, ilike } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { db, snapshots } from "~/packages/db/schema";

export default async function Checkin(props: { params: { event: string } }) {
	const user = await getAuthenticatedUser();
	const checkins = user
		? await db.query.snapshots.findMany({
				where: and(
					eq(snapshots.type, "check-in"),
					eq(snapshots.user, user.id),
					ilike(snapshots.tag, `${props.params.event}:%`),
				),
			})
		: [];

	return <div>Checkin</div>;
}
