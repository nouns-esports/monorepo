"use client";

import { LoaderCircle, Trash2, X } from "lucide-react";
import { Modal, useModal } from "../Modal";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { removeFromCart } from "@/server/mutations/removeFromCart";
import { addToCart } from "@/server/mutations/addToCard";
import { twMerge } from "tailwind-merge";
import type { AuthenticatedUser } from "@/server/queries/users";

export default function CartModal(props: {
	user: string;
	cart: NonNullable<AuthenticatedUser["nexus"]>["carts"];
}) {
	const { close } = useModal("cart");

	const router = useRouter();

	const subtotal = props.cart.reduce((acc, item) => {
		const variant = item.product.variants.find(
			(variant) => variant.shopifyId === item.variant,
		);

		if (!variant) return acc;

		return acc + Number(variant.price) * item.quantity;
	}, 0);

	const removeFromCartAction = useAction(removeFromCart);
	const addToCartAction = useAction(addToCart);

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
			{props.cart.length > 0 ? (
				<div className="flex flex-col gap-4 max-h-80 max-w-96 overflow-y-auto custom-scrollbar">
					{props.cart
						.toSorted((a, b) => a.product.name.localeCompare(b.product.name))
						.map((item) => {
							const variant = item.product.variants.find(
								(variant) => variant.shopifyId === item.variant,
							);

							if (!variant) return;

							return (
								<div key={item.variant} className="flex items-center gap-4">
									<div className="flex items-center gap-2 bg-grey-600 rounded-lg p-2 w-14 h-14 aspect-square">
										<img
											src={`${item.product.images[0]}?img-height=100&img-onerror=redirect`}
											alt={item.product.name}
											className="w-full h-full object-contain"
										/>
									</div>
									<div className="flex flex-col gap-2 w-full">
										<div className="flex items-center justify-between gap-4">
											<p className="text-white line-clamp-1">
												{item.product.name}
											</p>
											<button
												onClick={async () => {
													await removeFromCartAction.executeAsync({
														product: item.product,
														variant: item.variant,
														quantity: item.quantity,
													});

													router.refresh();
												}}
											>
												<Trash2 className="w-4 h-4 text-red hover:text-red/70 transition-colors" />
											</button>
										</div>
										<div className="flex items-center gap-4">
											<p className="text-white">${variant?.price}</p>
											<div className="flex items-center gap-2">
												<button
													onClick={async () => {
														await removeFromCartAction.executeAsync({
															product: item.product,
															variant: item.variant,
															quantity: 1,
														});

														router.refresh();
													}}
													className="w-4 h-4 bg-grey-600 hover:bg-grey-500 transition-colors rounded-full flex items-center justify-center"
												>
													-
												</button>
												<p className="text-white">{item.quantity}</p>
												<button
													onClick={async () => {
														await addToCartAction.executeAsync({
															product: item.product,
															variant: item.variant,
															quantity: 1,
														});

														router.refresh();
													}}
													className="w-4 h-4 bg-grey-600 hover:bg-grey-500 transition-colors rounded-full flex items-center justify-center"
												>
													+
												</button>
											</div>
											<p>{variant.size?.toUpperCase()}</p>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			) : (
				<p>Your cart is empty</p>
			)}
			{props.cart.length > 0 ? (
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
				disabled={addToCartAction.isPending || removeFromCartAction.isPending}
				onClick={() => {
					if (addToCartAction.isPending || removeFromCartAction.isPending) {
						return;
					}

					if (props.cart.length > 0) {
						// Revalidate inventory - if issues reconcile else redirect
						return window.open("/shop/checkout", "_blank");
					}

					router.push("/shop");
					close();
				}}
				className={twMerge(
					"flex justify-center items-center gap-2 w-full text-black bg-white hover:bg-white/70 font-semibold rounded-lg p-2.5 transition-colors",
					(addToCartAction.isPending || removeFromCartAction.isPending) &&
						"pointer-events-none opacity-50",
				)}
			>
				{addToCartAction.isPending || removeFromCartAction.isPending ? (
					<LoaderCircle className="w-4 h-4 animate-spin" />
				) : null}
				{props.cart.length > 0 ? "Checkout" : "Visit Shop"}
			</button>
		</Modal>
	);
}
