import { getAuthenticatedUser, getUserProfile } from "@/server/queries/users";
import { isInServer } from "@/server/queries/discord";
import Nexus from "@/components/Nexus";
import { getNexus } from "@/server/queries/nexus";
import { revalidatePath } from "next/cache";

export default async function NexusPage() {
  const user = await getAuthenticatedUser(true);

  const requirements = user?.discord?.username
    ? { inDiscord: await isInServer({ user: user.discord.username }) }
    : undefined;

  const nexus = user ? await getNexus({ user: user.id }) : undefined;

  return <Nexus user={user} requirements={requirements} nexus={nexus} />;
}
