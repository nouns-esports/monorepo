"use server";

import { unstable_cache as cache } from "next/cache";
import { shopifyClient } from "../clients/shopify";

export type Product = {
	id: string;
	title: string;
	description: string;
	handle: string;
	priceRange: {
		minVariantPrice: {
			amount: string;
			currencyCode: string;
		};
	};
	images: {
		edges: Array<{
			node: {
				url: string;
				altText: string;
			};
		}>;
	};
	variants: {
		edges: Array<{
			node: {
				id: string;
				title: string;
				price: {
					amount: string;
					currencyCode: string;
				};
				availableForSale: boolean;
			};
		}>;
	};
};

export const getProducts = cache(
	async () => {
		const products = await shopifyClient.request(
			`query {
				products(first: 100) {
					edges {
						node {
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
								edges {
									node {
										url
										altText
									}
								}
							}
							variants(first: 100) {
								edges {
									node {
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
				}
			}`,
		);

		if (products.data?.products?.edges) {
			return products.data.products.edges as Array<{
				node: Product;
			}>;
		}

		return [];
	},
	["getProducts"],
	{ revalidate: 60 * 10 },
);

export const getProduct = cache(
	async (id: string) => {
		const product = await shopifyClient.request(
			`query {
				product(id: "${id}") {
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
						edges {
							node {
								url
								altText
							}
						}
					}
					variants(first: 100) {
						edges {
							node {
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

		if (product.data?.product) {
			return product.data.product as Product;
		}
	},
	["getProduct"],
	{ revalidate: 60 * 10 },
);

export const getCollection = cache(
	async (handle: string) => {
		const collection = await shopifyClient.request(
			`query {
			collection(handle: "${handle}") {
				id
			}
		}`,
		);

		if (collection.data?.collection) {
			return collection.data.collection as { products: Product[] };
		}
	},
	["getCollection"],
	{ revalidate: 60 * 10 },
);
