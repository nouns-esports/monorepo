export function nextFridayAt2pmCST() {
	const now = new Date();
	const nextUpdate = new Date(now);

	// 1) Set the time to 20:00:00 (8 PM) UTC.
	nextUpdate.setUTCHours(20, 0, 0, 0);

	// 2) Calculate how many days until Friday (UTC day 5).
	//    getUTCDay() → 0 (Sun) .. 6 (Sat)
	const dayOfWeek = nextUpdate.getUTCDay();
	const daysUntilFriday = (5 - dayOfWeek + 7) % 7;
	// This yields 0 if it’s already Friday, or a positive integer if it’s earlier in the week.

	// 3) Move `nextUpdate` to this upcoming Friday at 20:00 UTC.
	nextUpdate.setDate(nextUpdate.getDate() + daysUntilFriday);

	// 4) If this Friday's 20:00 UTC has already passed, move ahead by another 7 days.
	if (nextUpdate <= now) {
		nextUpdate.setDate(nextUpdate.getDate() + 7);
	}

	return nextUpdate;
}
