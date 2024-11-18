import { db, snapshots } from "~/packages/db/schema";
import { getAuthenticatedUser } from "@/server/queries/users";
import { redirect } from "next/navigation";

export default async function CheckinCode(props: {
	params: { event: string; code: string };
}) {
	const user = await getAuthenticatedUser();

	if (!user) redirect(`/events/${props.params.event}/checkin`);

	await db.insert(snapshots).values({
		type: "check-in",
		tag: `${props.params.event}:${props.params.code}`,
		user: user.id,
		timestamp: new Date(),
	});

	return redirect(`/events/${props.params.event}/checkin`);
}
