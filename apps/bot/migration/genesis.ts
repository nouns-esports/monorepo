import { db, nexus, snapshots, xp } from "~/packages/db/schema";

const users = [] as Array<{
  id: string;
  tier: "Explorer" | "Challenger" | "Champion";
  proposals: Array<{
    votes: Array<{
      user: string;
    }>;
  }>;
  votes: Array<{
    round: string;
  }>;
}>;

const scoredUsers = users
  .map((user) => {
    const uniqueRounds = new Set(user.votes.map((vote) => vote.round)).size;

    return {
      id: user.id,
      tier: user.tier,
      score: uniqueRounds,
    };
  })
  .sort((a, b) => {
    const tierOrder = { Explorer: 1, Challenger: 2, Champion: 3 };
    if (a.tier !== b.tier) {
      return tierOrder[a.tier] - tierOrder[b.tier];
    }
    return a.score - b.score;
  });

const now = new Date();

for (let i = 0; i < scoredUsers.length; i++) {
  const scoredUser = scoredUsers[i];
  const earnedXP = Math.round(900 * ((i + 1) / scoredUsers.length) + 100);

  console.log(scoredUser.id, earnedXP);
}
// await db.transaction(async (tx) => {
//   for (let i = 0; i < scoredUsers.length; i++) {
//     const scoredUser = scoredUsers[i];
//     const earnedXP = Math.round(900 * ((i + 1) / scoredUsers.length) + 100);

//     const snapshot = await tx
//       .insert(snapshots)
//       .values({
//         user: scoredUser.id,
//         type: "genesis",
//         timestamp: now,
//       })
//       .returning({ id: snapshots.id });

//     await tx.insert(xp).values({
//       user: scoredUser.id,
//       amount: earnedXP,
//       timestamp: now,
//       season: 1,
//       snapshot: snapshot[0].id,
//     } as any);
//   }
// });
