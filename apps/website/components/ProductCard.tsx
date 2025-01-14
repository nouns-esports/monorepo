"use client";

import Link from "./Link";
import { useCartModal } from "./modals/CartModal";
import { toast } from "./Toasts";

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
			href={`/shop/products/${props.handle}`}
			newTab
			className="flex flex-col gap-4 rounded-xl bg-grey-800 hover:bg-grey-600 transition-colors p-4"
		>
			<img
				alt={props.name}
				src={props.image}
				className="aspect-square w-full object-contain"
			/>
			<div className="flex flex-col gap-2">
				<h2 className="text-white">{props.name}</h2>
				<div className="flex gap-2.5 items-center">
					<p className="text-white">${Number(props.price).toFixed(0)}</p>
					<div className="w-0.5 h-4 bg-grey-500 rounded-full" />
					<div className="flex items-center gap-1.5">
						<img
							src="https://ipfs.nouns.gg/ipfs/bafkreiccw4et522umioskkazcvbdxg2xjjlatkxd4samkjspoosg2wldbu"
							alt="Gold"
							className="w-5 h-5"
						/>
						<p className="text-[#FEBD1C] font-semibold">
							{Number(props.price) * 100}
						</p>
					</div>
				</div>
			</div>
			<button
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					// addItem({
					// 	id: props.id,
					// 	image: props.image,
					// 	count: 1,
					// 	price: props.price,
					// 	title: props.name,
					// });
					toast.custom({
						image: props.image,
						title: props.name,
						description: "Added to cart",
					});
				}}
				className="flex justify-center items-center gap-2 w-full text-black bg-white hover:bg-white/70 font-semibold rounded-lg p-2.5 transition-colors"
			>
				Add to Cart
			</button>
		</Link>
	);
}
