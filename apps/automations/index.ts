import { privySync } from "./jobs/privySync";
import { refreshLeaderboard } from "./jobs/refreshLeaderboard";
import { refreshRoles } from "./jobs/refreshRoles";

const jobs = [privySync, refreshLeaderboard, refreshRoles];

for (const job of jobs) {
	job.start();
}
