import { db, seasons, xp } from "~/packages/db/schema";
import { getAuthenticatedUser } from "@/server/queries/users";
import { redirect } from "next/navigation";
import { and, desc, eq, gte, lte } from "drizzle-orm";
import { getStation } from "@/server/queries/stations";

export default async function Station(props: {
	params: Promise<{ event: string; station: string }>;
}) {
	const params = await props.params;

	const now = new Date();

	const [user, station, currentSeason] = await Promise.all([
		getAuthenticatedUser(),
		getStation({ id: Number(params.station) }),
		db.query.seasons.findFirst({
			where: and(lte(seasons.start, now), gte(seasons.end, now)),
			orderBy: desc(seasons.start),
		}),
	]);

	if (!user || !station || !currentSeason) {
		redirect(`/events/${params.event}/stations`);
	}

	const alreadyClaimed = await db.query.xp.findFirst({
		where: and(eq(xp.user, user.id), eq(xp.station, Number(params.station))),
	});

	if (alreadyClaimed) return redirect(`/events/${params.event}/stations`);

	const [record] = await db
		.insert(xp)
		.values({
			user: user.id,
			timestamp: now,
			season: currentSeason.id,
			station: Number(params.station),
			amount: station.xp,
		})
		.returning({ id: xp.id });

	console.log(
		params.event,
		record.id,
		`/events/${params.event}/stations?claimed=${record.id}`,
	);

	return redirect(`/events/${params.event}/stations?claimed=${record.id}`);
}
