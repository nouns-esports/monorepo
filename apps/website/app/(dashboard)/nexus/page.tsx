import { getAuthenticatedUser } from "@/server/queries/users";
import { isInServer } from "@/server/queries/discord";
import Nexus from "@/components/Nexus";
import { getNexus } from "@/server/queries/nexus";

export default async function NexusPage() {
  const user = await getAuthenticatedUser(true);

  const inServer = user?.discord
    ? await isInServer({ user: user.discord.subject })
    : false;

  const nexus =
    user && inServer ? await getNexus({ user, inServer }) : undefined;

  return <Nexus user={user} inServer={inServer} nexus={nexus} />;
}
