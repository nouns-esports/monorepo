"use client";

import { useFromExternal } from "@/providers";
import { useRouter } from "next/navigation";
import Link from "./Link";

export default function GoBack(props: {
	children: React.ReactNode;
	fallback: string;
	className?: string;
}) {
	const router = useRouter();
	const fromExternal = useFromExternal();

	if (fromExternal) {
		return (
			<Link href={props.fallback} className={props.className}>
				{props.children}
			</Link>
		);
	}

	return (
		<button onClick={() => router.back()} className={props.className}>
			{props.children}
		</button>
	);
}
