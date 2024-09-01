import type { Nexus } from "~/packages/db/schema";

export default function createAction<T extends Record<string, any>>(
  create: (actionInputs: T) => Promise<{
    description: React.ReactElement<JSX.IntrinsicElements["p"]>;
    url: string;
    help?: string;
    check: (user: Nexus, actionInputs: T) => Promise<boolean>;
  }>
) {
  return create;
}
