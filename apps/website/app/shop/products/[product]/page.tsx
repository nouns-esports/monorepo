import { getProduct } from "@/server/queries/shop";

export default async function ProductPage(props: {
	params: Promise<{ product: string }>;
}) {
	const params = await props.params;

	const product = await getProduct({ id: params.product });

	if (!product) {
		return <div>Product not found</div>;
	}

	return <div>{product.name}</div>;
}
