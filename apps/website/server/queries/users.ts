import { privyClient } from "@/server/clients/privy";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { db, nexus as nexusTable } from "~/packages/db/schema";
import { unstable_cache as cache } from "next/cache";

export async function getAuthenticatedPrivyUser() {
  const session = cookies().get("privy-token")?.value;

  try {
    if (!session) return;

    const user = await privyClient.verifyAuthToken(session);

    return user.userId;
  } catch (error) {}
}

export async function getAuthenticatedPrivyUserWithData() {
  const user = await getAuthenticatedPrivyUser();

  if (!user) return;

  try {
    const privyUser = await privyClient.getUser(user);

    if (!privyUser) return;

    return privyUser;
  } catch (error) {}
}

export async function getAuthenticatedUser() {
  const user = await getAuthenticatedPrivyUser();

  if (!user) return;

  return db.query.nexus.findFirst({
    where: eq(nexusTable.id, user),
    with: {
      rank: true,
    },
  });
}

export const getUser = cache(
  async (input: { id: string }) => {
    return db.query.nexus.findFirst({
      where: eq(nexusTable.id, input.id),
    });
  },
  ["getUser"],
  { tags: ["getUser"], revalidate: 60 * 10 }
);
