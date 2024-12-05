"use client";

import { RefreshCcw } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function Recast(props: {
	hash: string;
	recast: boolean;
}) {
	return (
		<button className="relative z-10">
			<RefreshCcw
				className={twMerge(
					"w-5 h-5 transition-colors",
					props.recast ? "text-red" : "text-grey-200 hover:text-white",
				)}
			/>
		</button>
	);
}
