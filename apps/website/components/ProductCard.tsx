"use client";

import Link from "./Link";
import { useCartModal } from "./modals/CartModal";

export default function ProductCard(props: {
	id: string;
	handle: string;
	image: string;
	name: string;
	price: string;
}) {
	const { addItem } = useCartModal();
	return (
		<Link
			href={`/shop/products/${props.handle}?test=true`}
			newTab
			className="flex flex-col gap-4 rounded-xl bg-grey-800 hover:bg-grey-600 transition-colors p-4"
		>
			<img src={props.image} className="aspect-square w-full object-contain" />
			<div className="flex flex-col gap-2">
				<h2 className="text-white">{props.name}</h2>
				<p className="text-white">${props.price}</p>
			</div>
			<button
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					addItem({
						id: props.id,
						image: props.image,
						count: 1,
						price: props.price,
					});
				}}
				className="flex justify-center items-center gap-2 w-full text-black bg-white hover:bg-white/70 font-semibold rounded-lg p-2.5 transition-colors"
			>
				Add to Cart
			</button>
		</Link>
	);
}
