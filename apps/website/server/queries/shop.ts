"use server";

import { unstable_cache as cache } from "next/cache";
import { shopifyClient } from "../clients/shopify";

export const getItems = cache(
	async () => {
		return shopifyClient.request(
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
	},
	["getItems"],
	{ revalidate: 60 * 10 },
);
