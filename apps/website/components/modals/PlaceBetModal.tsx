"use client";

import { Modal, useModal } from "../Modal";
import { ArrowRight, X } from "lucide-react";
import Link from "../Link";
import { usePrivy } from "@privy-io/react-auth";
import { env } from "~/env";
import { create } from "zustand";

export const usePlaceBetModal = create<{
	outcome?: {
		id: number;
		name: string;
	};
	setState: (state: {
		outcome: {
			id: number;
			name: string;
		};
	}) => void;
}>((set) => ({
	outcome: undefined,
	setState: (state) => {
		set({ ...state });
	},
}));

export default function PlaceBetModal() {
	const { outcome } = usePlaceBetModal();

	const { close } = useModal("place-bet");
	const { user } = usePrivy();

	return (
		<Modal id="place-bet" className="p-4 flex flex-col min-w-80 gap-6">
			<div className="flex justify-between items-center">
				<p className="text-white text-2xl font-bebas-neue leading-none">
					Place Bet
				</p>
				<button
					onClick={close}
					className="p-1 rounded-full bg-grey-600 hover:bg-grey-500 transition-colors"
				>
					<X className="w-4 h-4 text-grey-200" />
				</button>
			</div>
			<p className="text-white leading-none">
				You are betting for{" "}
				<span className="font-semibold text-green">{outcome?.name}</span>
			</p>
			<button
				onClick={() => close()}
				className="flex justify-center items-center gap-2 w-full text-black bg-white hover:bg-white/70 font-semibold rounded-lg p-2.5 transition-colors"
			>
				Confirm
			</button>
		</Modal>
	);
}
