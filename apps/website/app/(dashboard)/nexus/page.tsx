import { getAuthenticatedUser } from "@/server/queries/users";
import { getUserId } from "@/server/queries/discord";
import Nexus from "@/components/Nexus";
import { getNexus } from "@/server/queries/nexus";
import { revalidatePath } from "next/cache";

export default async function NexusPage() {
  const user = await getAuthenticatedUser(true);

  const discordId = user?.discord?.username
    ? await getUserId({ user: user.discord.username })
    : undefined;

  const nexus =
    user && discordId ? await getNexus({ user, discordId }) : undefined;

  revalidatePath("/nexus");

  return <Nexus user={user} discordId={discordId} nexus={nexus} />;
}
