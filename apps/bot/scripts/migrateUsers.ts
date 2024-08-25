import { eq } from "drizzle-orm";
import { db, nexus } from "~/packages/db/schema";

const users = await db.query.nexus.findMany();

for (const user of users) {
  await db
    .update(nexus)
    .set({
      image: `https://api.cloudnouns.com/v1/pfp?text=${user.id}&background=1`,
    })
    .where(eq(nexus.id, user.id));
}
