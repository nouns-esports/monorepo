import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { env } from "~/env";

export const shopifyClient = createStorefrontApiClient({
	storeDomain: "https://shop.nouns.gg",
	apiVersion: "2024-10",
	privateAccessToken: env.SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN,
});
