"use client";

import { ArrowFatUp } from "phosphor-react-sc";
import { twMerge } from "tailwind-merge";

export default function Upvote(props: {
	hash: string;
	upvoted: boolean;
}) {
	return (
		<button className="relative z-10">
			<ArrowFatUp
				className={twMerge(
					"w-5 h-5 transition-colors",
					props.upvoted ? "text-red" : "text-grey-200 hover:text-white",
				)}
				weight={props.upvoted ? "fill" : undefined}
			/>
		</button>
	);
}
