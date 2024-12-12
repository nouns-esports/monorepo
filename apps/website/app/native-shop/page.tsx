import ProductCard from "@/components/ProductCard";
import { getItems } from "@/server/queries/shop";

export default async function Shop() {
	// const items = await getItems();

	// console.log(items.data.products);

	return (
		<div className="flex flex-col gap-16 pt-32 max-xl:pt-28 max-sm:pt-20">
			<div className="px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
				<h1 className="text-white font-luckiest-guy text-4xl">Shop</h1>
				{/* <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
					{items.data.products.edges.map((product) => (
						<ProductCard key={product.node.id} product={product} />
					))}
				</div> */}
			</div>
		</div>
	);
}
