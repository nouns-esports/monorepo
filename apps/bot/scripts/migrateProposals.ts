import { db, proposals } from "~/packages/db/schema";

// Steps
// add markdown and round type
// run script
// remove image
// add image (new) and video

const allProposals = await db.query.proposals.findMany();

for (const proposal of allProposals) {
  await db.transaction(
    async (tx) =>
      await tx.update(proposals).set({
        markdown: {
          preview: proposal.image,
          content: proposal.content,
        },
      })
  );
}
