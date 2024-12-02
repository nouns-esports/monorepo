import type { AuthenticatedUser } from "@/server/queries/users";
import type { JSX } from "react";

export default function createAction<T extends Record<string, any>>(
	create: (actionInputs: T) => Promise<{
		description: React.ReactElement<JSX.IntrinsicElements["p"]>;
		url: string;
		help?: string;
		check: (user: AuthenticatedUser, actionInputs: T) => Promise<boolean>;
	}>,
) {
	return create;
}
