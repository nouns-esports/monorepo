import { NextRequest } from "next/server";
import { db, giveawayEmails } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const data = (await request.json()) as { email: string; twitter: string };

  const email = data.email.toLowerCase();

  const twitter = data.twitter.replace("@", "").toLowerCase();

  try {
    await db
      .update(giveawayEmails)
      .set({
        email,
        twitter,
      })
      .where(eq(giveawayEmails.email, email));

    return new Response();
  } catch (e) {
    return new Response();
  }
}
