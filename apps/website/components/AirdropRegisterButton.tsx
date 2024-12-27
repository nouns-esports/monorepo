"use client";

import Button from "./Button";
import type { AuthenticatedUser } from "@/server/queries/users";
import { useModal } from "./Modal";
import { useRouter } from "next/navigation";

export default function AirdropRegisterButton(props: {
	authenticatedUser?: AuthenticatedUser;
	eligible: boolean;
}) {
	const { open } = useModal("sign-in");
	const router = useRouter();

	return (
		<Button
			onClick={() => {
				if (!props.authenticatedUser) {
					return open();
				}

				router.refresh();
			}}
			disabled={props.authenticatedUser && !props.eligible}
		>
			{props.authenticatedUser ? "Register" : "Sign in"}
		</Button>
	);
}
