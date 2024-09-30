import { createCommand } from "../createCommand";

export const createSnapshot = createCommand({
  name: "create-snapshot",
  description: "Creates a snapshot of Discord users",
  execute: async (interaction) => {
    return "Snapshot created successfully";
  },
});
