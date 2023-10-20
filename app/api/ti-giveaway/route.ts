import { NextRequest } from "next/server";
import { db, giveawayEmails } from "@/db/schema";

export async function POST(request: NextRequest) {
  const data = (await request.json()) as { email: string };

  const email = data.email.toLowerCase();

  try {
    await db.insert(giveawayEmails).values({
      email,
    });
    return new Response(JSON.stringify({ success: true }));
  } catch (e) {
    return new Response(JSON.stringify({ success: false }));
  }
}
