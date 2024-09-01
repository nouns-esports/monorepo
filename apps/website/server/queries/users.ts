import { privyClient } from "@/server/clients/privy";
import { eq, isNotNull, or } from "drizzle-orm";
import { cookies } from "next/headers";
import { db, nexus as nexusTable, xp } from "~/packages/db/schema";
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
  async (input: { user: string }) => {
    return db.query.nexus.findFirst({
      where: or(
        eq(nexusTable.id, input.user),
        eq(nexusTable.handle, input.user)
      ),
    });
  },
  ["getUser"],
  { tags: ["getUser"], revalidate: 60 * 10 }
);

export const getUserStats = cache(
  async (input: { user: string }) => {
    const user = await db.query.nexus.findFirst({
      where: eq(nexusTable.id, input.user),
      with: {
        proposals: true,
        xpRecords: {
          where: isNotNull(xp.quest),
        },
        votes: true,
      },
    });

    return {
      earnedXP: user?.xp ?? 0,
      proposalsCreated: user?.proposals.length ?? 0,
      questsCompleted: user?.xpRecords.length ?? 0,
      votesCast: user?.votes.length ?? 0,
    };
  },
  ["getUserStats"],
  { tags: ["getUserStats"], revalidate: 60 * 10 }
);
