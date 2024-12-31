"use client";
import frameSdk, { type FrameContext } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";

export default function FarcasterProvider(props: {
	children: React.ReactNode;
}) {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		async function load() {
			setLoaded(true);
			await frameSdk.actions.ready();
		}

		if (!loaded) {
			load();
		}
	}, [loaded]);

	return props.children;
}
