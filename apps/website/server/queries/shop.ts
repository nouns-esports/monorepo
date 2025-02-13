"use server";

import { eq } from "drizzle-orm";
import { carts, collections, db } from "~/packages/db/schema";
import { unstable_cache as cache } from "next/cache";
import { products } from "~/packages/db/schema";
import { shopifyClient } from "../clients/shopify";

export const getProducts = cache(
	async (input: { collection?: string }) => {
		return db.query.products.findMany({
			where: input.collection
				? eq(products.collection, input.collection)
				: undefined,
		});
	},
	["getProducts"],
	{ revalidate: 60 },
);

export const getCollections = cache(
	async () => db.query.collections.findMany(),
	["getCollections"],
	{ revalidate: 60 },
);

export const getProduct = cache(
	async (input: { id: string }) =>
		db.query.products.findFirst({
			where: eq(products.id, input.id),
		}),
	["getProduct"],
	{ revalidate: 60 },
);

export const getCollection = cache(
	async (input: { id: string }) =>
		db.query.collections.findFirst({
			where: eq(collections.id, input.id),
			with: {
				products: true,
			},
		}),

	["getCollection"],
	{ revalidate: 60 },
);

export async function checkCart(input: { user: string }) {
	const cart = await db.query.carts.findMany({
		where: eq(carts.user, input.user),
		with: {
			product: true,
		},
	});

	const variants = cart.map((item) => item.variant);

	try {
		const response = await shopifyClient.request(
			`query($variantIds: [ID!]!) {
			nodes(ids: $variantIds) {
				... on ProductVariant {
					id
					price
					inventoryQuantity
				}
			}
		}`,
			{
				variables: {
					variantIds: variants.map(
						(id) => `gid://shopify/ProductVariant/${id}`,
					),
				},
			},
		);

		const refreshedVariants =
			(response.data?.nodes as Array<{
				id: string;
				price: string;
				inventoryQuantity: number;
			}>) ?? [];

		await db.transaction(async (tx) => {
			for (const variant of refreshedVariants) {
				const variantId = Number(variant.id.split("Product/")[1]);

				const product = cart.find(
					(item) => item.variant === variantId,
				)?.product;

				if (!product) continue;

				const existingVariant = product.variants.find(
					(v) => v.shopifyId === variantId,
				);

				if (!existingVariant) continue;

				if (existingVariant.inventory === variant.inventoryQuantity) continue;
				if (existingVariant.price.toFixed(2) !== variant.price) continue;

				await tx
					.update(products)
					.set({
						variants: product.variants.map((v) => {
							if (v.shopifyId === variantId) {
								return {
									...v,
									inventory: variant.inventoryQuantity,
									price: Number(variant.price),
								};
							}

							return v;
						}),
					})
					.where(eq(products.id, product.id));
			}
		});

		for (const variant of refreshedVariants) {
			const item = cart.find(
				(item) => item.variant === Number(variant.id.split("Product/")[1]),
			);

			if (!item) continue;

			if (variant.inventoryQuantity < item.quantity) {
				return false;
			}
		}
	} catch (e) {
		console.error(e);
	}

	return true;
}

export async function estimateOrderCost(input: {
	items: Array<{ product: string; variant: number; quantity: number }>;
	shipping: {
		address1: string;
		address2: string;
		city: string;
		province: string;
		country: string;
		zip: string;
	};
	appliedGold: number;
}) {
	// call draftOrderCalculate
	return 100;
}
