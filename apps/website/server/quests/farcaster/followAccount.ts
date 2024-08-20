import type { Nexus } from "~/packages/db/schema";
import createAction from "../createAction";

export const followAccount = createAction(
  { name: "Follow @esports", description: "" },
  async (user: Nexus) => {
    return false;
  }
);
