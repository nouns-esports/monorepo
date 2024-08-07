import { getAuthenticatedUser } from "@/server/queries/users";
import Nexus from "@/components/Nexus";
import { getNexus } from "@/server/queries/nexus";
import { getUserAwards } from "@/server/queries/awards";
// Quests are part of nexus page
export default async function NexusPage() {
  const user = await getAuthenticatedUser();

  const nexus = user ? await getNexus({ user: user.id }) : undefined;

  const awards = user ? await getUserAwards({ user: user.id }) : undefined;

  return (
    <div className="pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      <Nexus user={user} nexus={nexus} awards={awards} />
    </div>
  );
}
