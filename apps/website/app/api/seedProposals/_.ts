import { db, proposals } from "@/db/schema";

export async function GET() {
  await db.insert(proposals).values([]);

  return new Response("OK");
}
