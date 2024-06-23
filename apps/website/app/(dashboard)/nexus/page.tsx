import { getAuthenticatedUser } from "@/server/queries/users";
import Nexus from "@/components/Nexus";
import { getNexus } from "@/server/queries/nexus";
import { getUserAwards } from "@/server/queries/awards";

export default async function NexusPage() {
  const user = await getAuthenticatedUser(true);

  const nexus = user ? await getNexus({ user: user.id }) : undefined;

  const awards = user ? await getUserAwards({ user: user.id }) : undefined;

  return <Nexus user={user} nexus={nexus} awards={awards} />;
}
