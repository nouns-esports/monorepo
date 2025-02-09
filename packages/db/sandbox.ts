import { db, products } from "./schema";

await db.insert(products).values([
	{
		id: "cloud-hoodie-vintage-black",
		shopifyId: "gid://shopify/Product/9654241329453",
		name: "Cloud Hoodie - Vintage Black",
		description: "",
		collection: "dopamine",
		variants: [
			{
				key: "Size",
				value: "S",
				shopifyId: "gid://shopify/Variant/49592108187949",
				images: [
					"https://ipfs.nouns.gg/ipfs/bafybeibkgnoq3iymnvjtbjmlwgpmqscyekwmlpbxozvrnfsndzi3wgfdgq",
					"https://ipfs.nouns.gg/ipfs/bafkreialdgrza5bkasezzy23xfwqew4xxx7a53lxfkczyf62glymam7vju",
				],
				price: 75,
				inventory: 1,
			},
			{
				key: "Size",
				value: "M",
				shopifyId: "gid://shopify/Variant/49592108253485",
				images: [],
				price: 75,
				inventory: 3,
			},
			{
				key: "Size",
				value: "L",
				shopifyId: "gid://shopify/Variant/49592108319021",
				images: [],
				price: 75,
				inventory: 6,
			},
			{
				key: "Size",
				value: "XL",
				shopifyId: "gid://shopify/Variant/49592108384557",
				images: [],
				price: 75,
				inventory: 8,
			},
			{
				key: "Size",
				value: "2XL",
				shopifyId: "gid://shopify/Variant/49592108450093",
				images: [],
				price: 75,
				inventory: 0,
			},
		],
	},
]);
