import type { Nexus } from "~/packages/db/schema";
import createAction from "../createAction";

export const followChannel = createAction(
  { name: "Follow the /nouns-esports channel", description: "" },
  async (user: Nexus) => {
    return false;
  }
);
