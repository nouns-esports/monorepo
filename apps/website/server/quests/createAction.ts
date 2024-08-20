import type { Nexus } from "~/packages/db/schema";

export default function createAction(
  create: (
    user: Nexus,
    parameters?: { [key: string]: any }
  ) => {
    name: string;
    description: string;
    check: (
      user: Nexus,
      parameters?: { [key: string]: any }
    ) => Promise<boolean>;
  }
) {
  return create;
}
