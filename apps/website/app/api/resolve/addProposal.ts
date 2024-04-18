import { db, proposals } from "@/db/schema";
import { publicProcedure } from "../trpc";

export const addProposal = publicProcedure.query(async () => {
  return db.insert(proposals).values([
    {
      title: "Test Propoasl",
      description: "This is a proposal",
      round: "goml-2024",
      user: "sam",
      value: "0",
      createdAt: new Date(),
    },
  ]);
});
