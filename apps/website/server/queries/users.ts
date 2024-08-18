import { privyClient } from "@/server/clients/privy";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { db, nexus as nexusTable } from "~/packages/db/schema";

export async function getAuthenticatedUser() {
  const session = cookies().get("privy-token")?.value;

  try {
    if (!session) return;

    const user = await privyClient.verifyAuthToken(session);

    return db.query.nexus.findFirst({
      where: eq(nexusTable.id, user.userId),
      with: {
        rank: true,
      },
    });
  } catch (error) {}
}
