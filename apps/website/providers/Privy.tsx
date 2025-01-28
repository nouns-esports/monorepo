"use client";

import {
	PrivyProvider,
	getAccessToken,
	usePrivy,
	type PrivyClientConfig,
	type WalletListEntry,
} from "@privy-io/react-auth";
import { env } from "~/env";
import { base, baseSepolia } from "viem/chains";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { create } from "zustand";
import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";
import { useLoginToFrame } from "@privy-io/react-auth/farcaster";
import frameSdk from "@farcaster/frame-sdk";

export const usePrivyModalState = create<{
	loginMethods?: PrivyClientConfig["loginMethods"];
	externalWallets?: PrivyClientConfig["externalWallets"];
	walletList?: WalletListEntry[];
	setPrivyModalState: (
		state: Partial<{
			loginMethods: PrivyClientConfig["loginMethods"];
			externalWallets: PrivyClientConfig["externalWallets"];
			walletList: WalletListEntry[];
		}>,
	) => void;
}>((set) => ({
	loginMethods: ["discord", "twitter", "wallet", "farcaster", "email"],
	externalWallets: {
		coinbaseWallet: {
			connectionOptions: "all",
		},
	},
	walletList: undefined,
	setPrivyModalState: (state) => set(state),
}));

export default function Privy(props: {
	user?: string;
	children: React.ReactNode;
}) {
	const { loginMethods, walletList, externalWallets } = usePrivyModalState();

	return (
		<PrivyProvider
			appId={env.NEXT_PUBLIC_PRIVY_APP_ID}
			config={{
				loginMethods,
				defaultChain:
					env.NEXT_PUBLIC_ENVIRONMENT === "production" ? base : baseSepolia,
				supportedChains: [
					env.NEXT_PUBLIC_ENVIRONMENT === "production" ? base : baseSepolia,
				],
				appearance: {
					theme: "#040404",
					accentColor: "#E93737",
					logo: "/logo/logo.svg",
					walletList,
				},
				externalWallets,
			}}
		>
			<PrivySync>
				<SmartWalletsProvider>{props.children}</SmartWalletsProvider>
			</PrivySync>
		</PrivyProvider>
	);
}

function PrivySync(props: { children: React.ReactNode; user?: string }) {
	const { user, ready, authenticated } = usePrivy();
	const { initLoginToFrame, loginToFrame } = useLoginToFrame();

	const router = useRouter();

	useEffect(() => {
		async function refresh() {
			const token = await getAccessToken();

			if (token) {
				router.refresh();
			}
		}

		if (authenticated && !props.user) {
			refresh();
		}

		const intervalId = setInterval(() => {
			refresh();
		}, 900_000);

		return () => clearInterval(intervalId);
	}, [authenticated, user]);

	useEffect(() => {
		if (ready && !authenticated) {
			const login = async () => {
				const { nonce } = await initLoginToFrame();
				const result = await frameSdk.actions.signIn({ nonce });
				await loginToFrame({
					message: result.message,
					signature: result.signature,
				});
				const context = await frameSdk.context;
				console.log(context);
				await frameSdk.actions.ready();
			};
			login();
		}
	}, [ready, authenticated]);

	return props.children;
}
