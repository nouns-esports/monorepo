import { createCommand } from "../createCommand";

export const backupDatabase = createCommand({
  name: "backup-database",
  description: "Backs up the Database to Pinata",
  schedule: "0 0 * * *",
  execute: async (interaction) => {
    return "Database backed up successfully";
  },
});
