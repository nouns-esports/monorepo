import { eq } from "drizzle-orm";
import { db, proposals } from "~/packages/db/schema";

// Steps
// add markdown and round type
// run script
// remove image
// add image (new) and video

const allProposals = await db.query.proposals.findMany();

await db.transaction(async (tx) => {
  for (const proposal of allProposals) {
    await tx
      .update(proposals)
      .set({
        content: proposal.markdown?.content,
        image: proposal.markdown?.preview,
      })
      .where(eq(proposals.id, proposal.id));
  }
});
