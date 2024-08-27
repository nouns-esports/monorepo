import type { Nexus } from "~/packages/db/schema";

export default function createAction(
  create: (actionInputs?: { [key: string]: any }) => Promise<{
    description: React.ReactElement<JSX.IntrinsicElements["p"]>;
    url: string;
    help?: string;
    check: (
      user: Nexus,
      actionInputs?: { [key: string]: any }
    ) => Promise<boolean>;
  }>
) {
  return create;
}
