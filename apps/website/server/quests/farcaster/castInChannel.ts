import type { Nexus } from "~/packages/db/schema";
import createAction from "../createAction";

export const castInChannel = createAction(
  { name: "Cast in channel", description: "" },
  async (user: Nexus) => {
    return false;
  }
);
