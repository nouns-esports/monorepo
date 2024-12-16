"use client";

import { X } from "lucide-react";
import { Modal, useModal } from "../Modal";
import Link from "../Link";
import { create } from "zustand";

type Item = {
	id: string;
	image: string;
	count: number;
	price: string;
};

export const useCartModal = create<{
	items: Item[];
	addItem: (item: Item) => void;
	removeItem: (item: Item) => void;
}>((set) => ({
	items: [],
	addItem: (item) => {
		set((state) => {
			const existingItem = state.items.find((i) => i.id === item.id);
			if (existingItem) {
				return {
					items: state.items.map((i) =>
						i.id === item.id ? { ...i, count: i.count + item.count } : i,
					),
				};
			}
			return {
				items: [...state.items, item],
			};
		});
	},
	removeItem: (item) => {
		set((state) => ({
			items: state.items.filter((p) => p.id !== item.id),
		}));
	},
}));

export default function CartModal() {
	const { close } = useModal("cart");

	const { items } = useCartModal();

	return (
		<Modal id="cart" className="p-4 flex flex-col min-w-80 gap-6">
			<div className="flex justify-between items-center">
				<p className="text-white text-2xl font-bebas-neue leading-none">
					Your cart
				</p>
				<button
					onClick={close}
					className="p-1 rounded-full bg-grey-600 hover:bg-grey-500 transition-colors"
				>
					<X className="w-4 h-4 text-grey-200" />
				</button>
			</div>
			<div className="flex flex-col gap-4">
				{items.map((item) => (
					<div key={item.id} className="flex items-center gap-4">
						<img src={item.image} alt={item.id} className="w-16 h-16" />
						<p>{item.count}</p>
					</div>
				))}
			</div>
			<div className="flex justify-between items-center">
				<p className="text-white text-2xl font-bebas-neue leading-none">
					Total
				</p>
				<p className="text-white text-2xl font-bebas-neue leading-none">
					$
					{items.reduce(
						(acc, item) => acc + Number(item.price) * item.count,
						0,
					)}
				</p>
			</div>
			<Link
				href="/shop/checkout"
				className="flex justify-center items-center gap-2 w-full text-black bg-white hover:bg-white/70 font-semibold rounded-lg p-2.5 transition-colors"
			>
				Checkout
			</Link>
		</Modal>
	);
}
