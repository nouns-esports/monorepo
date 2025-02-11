"use client";

import { X } from "lucide-react";
import { Modal, useModal } from "../Modal";
import { useRouter } from "next/navigation";
import type { getCart } from "@/server/queries/shop";
import { useAction } from "next-safe-action/hooks";
import { removeFromCart } from "@/server/mutations/removeFromCart";

export default function CartModal(props: {
	cart: Awaited<ReturnType<typeof getCart>>;
}) {
	const { close } = useModal("cart");

	const router = useRouter();

	const items = props.cart.map((item) => ({
		id: item.product.id,
		image: item.product.variants[0].images[0],
		title: item.product.name,
		count: item.quantity,
		price: item.product.variants[0].price,
	}));

	const subtotal = items.reduce(
		(acc, item) => acc + Number(item.price) * item.count,
		0,
	);

	const removeFromCartAction = useAction(removeFromCart);

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
			{items.length > 0 ? (
				<div className="flex flex-col gap-4 max-h-80 overflow-y-auto custom-scrollbar">
					{items.map((item) => (
						<div key={item.id} className="flex items-center gap-4">
							<div className="flex items-center gap-2 bg-grey-600 rounded-lg p-2">
								<img
									src={item.image}
									alt={item.title}
									className="w-12 h-12 object-cover"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<p className="text-white line-clamp-1">{item.title}</p>
								<div className="flex items-center gap-2">
									<p className="text-white">${item.price}</p>
									<p className="text-grey-200">x{item.count}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<p>Your cart is empty</p>
			)}
			{items.length > 0 ? (
				<div className="flex justify-between items-center">
					<p className="text-white text-2xl font-bebas-neue leading-none">
						Subtotal
					</p>

					<div className="flex gap-2.5 items-center">
						<p className="text-white text-2xl font-bebas-neue leading-none">
							${Number.isInteger(subtotal) ? subtotal : subtotal.toFixed(2)}
						</p>

						<div className="w-0.5 h-4 bg-grey-500 rounded-full" />
						<div className="flex items-center gap-1.5">
							<img
								src="https://ipfs.nouns.gg/ipfs/bafkreiccw4et522umioskkazcvbdxg2xjjlatkxd4samkjspoosg2wldbu"
								alt="Gold"
								className="w-5 h-5"
							/>
							<p className="text-[#FEBD1C] font-semibold">
								{(subtotal * 100).toLocaleString()}
							</p>
						</div>
					</div>
				</div>
			) : null}
			<button
				onClick={() => {
					if (items.length > 0) {
						return window.open("/shop/checkout", "_blank");
					}

					router.push("/shop");
					close();
				}}
				className="flex justify-center items-center gap-2 w-full text-black bg-white hover:bg-white/70 font-semibold rounded-lg p-2.5 transition-colors"
			>
				{items.length > 0 ? "Checkout" : "Visit Shop"}
			</button>
		</Modal>
	);
}
