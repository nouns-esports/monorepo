import { db, snapshots } from "~/packages/db/schema";
import { getAuthenticatedUser } from "@/server/queries/users";
import { redirect } from "next/navigation";

export default async function CheckinCode(props: {
	params: Promise<{ event: string; code: string }>;
}) {
	const params = await props.params;
	const user = await getAuthenticatedUser();

	if (!user) redirect(`/events/${params.event}/checkin`);

	await db.insert(snapshots).values({
		type: "check-in",
		tag: `${params.event}:${params.code}`,
		user: user.id,
		timestamp: new Date(),
	});

	return redirect(`/events/${params.event}/checkin`);
}
