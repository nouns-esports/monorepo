"use server";

import { unstable_cache as cache } from "next/cache";
import { shopifyClient } from "../clients/shopify";

export type Collection = {
	id: string;
	title: string;
	description: string;
	products: {
		nodes: Product[];
	};
};

export type Product = {
	id: string;
	title: string;
	description: string;
	handle: string;
	collections: {
		nodes: [
			{
				title: string;
				handle: string;
			},
		];
	};
	priceRange: {
		minVariantPrice: {
			amount: string;
			currencyCode: string;
		};
	};
	images: {
		nodes: Array<{
			url: string;
			altText: string;
		}>;
	};
	variants: {
		nodes: Variant[];
	};
};

export type Variant = {
	id: string;
	title: string;
	price: {
		amount: string;
		currencyCode: string;
	};
	availableForSale: boolean;
};

export const getProducts = cache(
	async () => {
		////////
		const products = await shopifyClient.request(
			`query {
				products(first: 100) {
					nodes {
						id
						title
						description
						handle
						collections(first: 1) {
							nodes {
								title
								handle
							}
						}
						priceRange {
							minVariantPrice {
								amount
								currencyCode
							}
						}
						images(first: 1) {
							nodes {
								url
								altText
							}
						}
						variants(first: 100) {
							nodes {
								id
								title
								price {
									amount
									currencyCode
								}
								availableForSale
							}
						}
					}
				}
			}`,
		);

		if (products.data?.products?.nodes) {
			return products.data.products.nodes as Product[];
		}

		return [];
	},
	["getProducts"],
	{ revalidate: 60 * 10 },
);

export const getProduct = cache(
	async (input: { handle: string }) => {
		const product = await shopifyClient.request(
			`query {
				product(handle: "${input.handle}") {
					id
					title
					description
					handle
					priceRange {
						minVariantPrice {
							amount
							currencyCode
						}
					}
					images(first: 1) {
						nodes {
							url
							altText
						}
					}
					variants(first: 100) {
						nodes {
							id
							title
							price {
								amount
								currencyCode
							}
							availableForSale
						}
					}
				}
			}`,
		);

		if (product.data?.product) {
			return product.data.product as Product;
		}
	},
	["getProduct"],
	{ revalidate: 60 * 10 },
);

export const getCollection = cache(
	async (input: { handle: string }) => {
		const collection = await shopifyClient.request(
			`query {
				collection(handle: "${input.handle}") {
					id
					title
					description
					products(first: 100) {
						nodes {
							id
							title
							description
							handle
							priceRange {
								minVariantPrice {
									amount
									currencyCode
								}
							}
							images(first: 1) {
								nodes {
									url
									altText
								}
							}
							variants(first: 100) {
								nodes {
									id
									title
									price {
										amount
										currencyCode
									}
									availableForSale
								}
							}
						}
					}
				}
			}`,
		);

		if (collection.data?.collection) {
			console.log(collection.data.collection);
			return collection.data.collection as Collection;
		}
	},
	["getCollection"],
	{ revalidate: 60 * 10 },
);

export const getOrders = cache(async (input: { email: string }) => {});
