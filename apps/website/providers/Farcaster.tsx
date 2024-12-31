"use client";
import frameSdk, { type FrameContext } from "@farcaster/frame-sdk";
import { use } from "react";

export default function FarcasterProvider(props: {
	children: React.ReactNode;
}) {
	use(frameSdk.actions.ready());

	return props.children;
}
