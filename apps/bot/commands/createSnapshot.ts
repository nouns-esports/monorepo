import { db, nexus, snapshots } from "~/packages/db/schema";
import { createCommand } from "../createCommand";
import { inArray } from "drizzle-orm";

export const createSnapshot = createCommand({
  description: "Creates a snapshot of Discord users",
  params: [
    {
      type: "string",
      name: "type",
      description: "The type of snapshot to create",
      choices: [{ name: "Discord Call", value: "discord-call" }],
      required: true,
    },
    {
      type: "string",
      name: "tag",
      description: "Give the snapshot a tag",
      required: false,
    },
  ],
  onlyAdmin: true,
  execute: async (interaction) => {
    const type = interaction.options.get("type")?.value;
    const tag = interaction.options.get("tag")?.value;

    if (!type) throw new Error("No type provided");
    if (!tag) throw new Error("No tag provided");

    if (!interaction.channel?.isVoiceBased()) {
      throw new Error("This command can only be run in a voice channel");
    }

    const users = await db.query.nexus.findMany({
      where: inArray(
        nexus.discord,
        interaction.channel.members.map(
          (guildMember) => guildMember.user.username
        )
      ),
    });

    await db.transaction(async (tx) => {
      for (const user of users) {
        await tx.insert(snapshots).values({
          type: type.toString() as "discord-call",
          user: user.id,
          tag: tag.toString(),
          timestamp: new Date(),
        });
      }
    });

    return "Snapshot created successfully";
  },
});
