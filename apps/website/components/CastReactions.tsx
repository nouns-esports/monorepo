"use client";

import { MessageSquare, RefreshCcw } from "lucide-react";
import { ArrowFatUp } from "phosphor-react-sc";
import { twMerge } from "tailwind-merge";
import Link from "./Link";

export default function CastReactions(props: {
	hash: string;
	user?: {
		liked: boolean;
		recast: boolean;
	};
}) {
	return (
		<div className="flex items-center gap-3">
			<Link href={`/chat/${props.hash.substring(0, 10)}`}>
				<MessageSquare
					className={twMerge(
						"w-5 h-5 text-grey-200 hover:text-white transition-colors  ",
					)}
				/>
			</Link>
			<button>
				<RefreshCcw
					className={twMerge(
						"w-5 h-5  transition-colors",
						props.user?.recast ? "text-red" : "text-grey-200 hover:text-white",
					)}
				/>
			</button>
			<button>
				<ArrowFatUp
					className={twMerge(
						"w-5 h-5  transition-colors",
						props.user?.liked ? "text-red" : "text-grey-200 hover:text-white",
					)}
					weight={props.user?.liked ? "fill" : undefined}
				/>
			</button>
		</div>
	);
}
