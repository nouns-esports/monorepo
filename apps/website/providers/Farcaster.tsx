"use client";
import frameSdk, { type FrameContext } from "@farcaster/frame-sdk";
import { useEffect } from "react";

export default function FarcasterProvider(props: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		frameSdk.actions.ready();
	}, []);

	return props.children;
}
