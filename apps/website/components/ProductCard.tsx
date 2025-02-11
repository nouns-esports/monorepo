"use client";

import type { getProduct } from "@/server/queries/shop";
import Link from "./Link";
import { toast } from "./Toasts";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { addToCart } from "@/server/mutations/addToCard";
import { useRouter } from "next/navigation";
export default function ProductCard(props: {
	product: NonNullable<Awaited<ReturnType<typeof getProduct>>>;
}) {
	const coverVariant = props.product.variants.find(
		(variant) => variant.images.length > 0,
	);

	if (!coverVariant) {
		console.error("No cover variant found");
		return null;
	}

	const [image, setImage] = useState(coverVariant.images[0]);

	const price = Number(props.product.variants[0]?.price);

	const addToCartAction = useAction(addToCart);

	const router = useRouter();

	return (
		<Link
			href={`/shop/products/${props.product.id}`}
			newTab
			className="flex flex-col gap-4 rounded-xl bg-grey-800 hover:bg-grey-600 transition-colors p-4"
		>
			<img
				alt={props.product.name}
				src={`${image}?img-width=500&img-onerror=redirect`}
				className="aspect-square w-full object-contain"
			/>

			<div className="flex flex-col gap-2">
				<h2 className="text-white">{props.product.name}</h2>
				<div className="flex gap-2.5 items-center">
					<p className="text-white">
						${Number.isInteger(price) ? price : price.toFixed(2)}
					</p>

					<div className="w-0.5 h-4 bg-grey-500 rounded-full" />
					<div className="flex items-center gap-1.5">
						<img
							src="https://ipfs.nouns.gg/ipfs/bafkreiccw4et522umioskkazcvbdxg2xjjlatkxd4samkjspoosg2wldbu"
							alt="Gold"
							className="w-5 h-5"
						/>
						<p className="text-[#FEBD1C] font-semibold">
							{(price * 100).toLocaleString()}
						</p>
					</div>
				</div>
			</div>
			<button
				disabled={addToCartAction.isPending}
				onClick={async (e) => {
					e.preventDefault();
					e.stopPropagation();

					await addToCartAction.executeAsync({
						product: props.product.id,
						variant: props.product.variants[0].shopifyId,
						quantity: 1,
					});

					toast.custom({
						image: image,
						title: props.product.name,
						description: "Added to cart",
						objectFit: "contain",
					});

					router.refresh();
				}}
				className="flex justify-center items-center gap-2 w-full text-black bg-white hover:bg-white/70 font-semibold rounded-lg p-2.5 transition-colors"
			>
				{addToCartAction.isPending ? (
					<img
						alt="loading spinner"
						src="/spinner.svg"
						className="h-[18px] animate-spin"
					/>
				) : null}
				Add to Cart
			</button>
		</Link>
	);
}
