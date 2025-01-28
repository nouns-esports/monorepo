"use client";

import { useEffect, useState } from "react";

export default function Test() {
	const [isFrame, setIsFrame] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			if ("frame" in window) {
				setIsFrame(true);
			}
		}
	}, [window]);

	return (
		<div className="text-white mt-40">
			<p>{isFrame ? "Frame" : "Not Frame"}</p>
			{/* @ts-ignore */}
			<p>{isFrame ? window.frame : "{}"}</p>
		</div>
	);
}
