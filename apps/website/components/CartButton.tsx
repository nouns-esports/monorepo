"use client";

import Button from "./Button";
import { useModal } from "./Modal";
import { useCartModal } from "./modals/CartModal";

export default function CartButton() {
	const { items } = useCartModal();

	const { open } = useModal("cart");

	return (
		<div className="flex items-center gap-4">
			<p className="text-white">
				{items.length === 0
					? "Add items to your cart"
					: `${items.length} item${items.length > 1 ? "s" : ""} in your cart`}
			</p>
			<Button onClick={open} disabled={items.length === 0}>
				View Cart
			</Button>
		</div>
	);
}
