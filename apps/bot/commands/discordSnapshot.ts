import { db, nexus, seasons, snapshots, xp } from "~/packages/db/schema";
import { createCommand } from "../createCommand";
import { and, gte, lte, desc, inArray } from "drizzle-orm";

export const discordSnapshot = createCommand({
  description: "Creates a snapshot of Discord users in a voice channel",
  params: [
    {
      type: "string",
      name: "tag",
      description: "Give the snapshot a tag",
      required: false,
    },
  ],
  onlyAdmin: true,
  execute: async (interaction) => {
    const tag = interaction.options.get("tag")?.value?.toString();

    if (!interaction.channel?.isVoiceBased()) {
      throw new Error("This command can only be run in a voice channel");
    }

    const now = new Date();

    const [users, currentSeason] = await Promise.all([
      db.query.nexus.findMany({
        where: inArray(
          nexus.discord,
          interaction.channel.members.map(
            (guildMember) => guildMember.user.username
          )
        ),
      }),
      db.query.seasons.findFirst({
        where: and(lte(seasons.start, now), gte(seasons.end, now)),
        orderBy: desc(seasons.start),
      }),
    ]);

    if (!currentSeason) throw new Error("No season found");

    await db.transaction(async (tx) => {
      for (const user of users) {
        const [snapshot] = await tx
          .insert(snapshots)
          .values({
            type: "discord-call",
            user: user.id,
            tag: tag?.toString(),
            timestamp: now,
          })
          .returning({ id: snapshots.id });

        await tx.insert(xp).values({
          user: user.id,
          amount: 300,
          timestamp: now,
          snapshot: snapshot.id,
          season: currentSeason.id,
        });
      }
    });

    return "Snapshot created successfully";
  },
});
