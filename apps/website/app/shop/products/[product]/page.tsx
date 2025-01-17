import { getProduct } from "@/server/queries/shop";

export default async function ProductPage(props: {
	params: { product: string };
}) {
	const params = await props.params;

	const product = await getProduct({ handle: params.product });

	if (!product) {
		return <div>Product not found</div>;
	}

	return <div>{product.title}</div>;
}
