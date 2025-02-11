"use server";

import { eq } from "drizzle-orm";
import { carts, collections, db } from "~/packages/db/schema";
import { unstable_cache as cache } from "next/cache";
import { products } from "~/packages/db/schema";

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

export const getCart = cache(
	async (input: { user: string }) =>
		db.query.carts.findMany({
			where: eq(carts.user, input.user),
			with: {
				product: true,
			},
		}),
	["getCart"],
	{ revalidate: 60 },
);

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
