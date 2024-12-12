export default function ProductCard(props: { product: any }) {
	console.log(props.product.node);
	return (
		<div className="flex flex-col gap-4 rounded-xl bg-grey-800 p-4">
			<img
				src={props.product.node.images.edges[0].node.url}
				className="aspect-square w-full"
			/>
			<h2 className="text-white">{props.product.node.title}</h2>
			<p className="text-white">
				${props.product.node.priceRange.minVariantPrice.amount}
			</p>
		</div>
	);
}
