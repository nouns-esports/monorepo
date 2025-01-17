import ProductCard from "@/components/ProductCard";
import { getCollection } from "@/server/queries/shop";

export default async function CollectionPage(props: {
	params: { collection: string };
}) {
	const params = await props.params;

	const collection = await getCollection({ handle: params.collection });

	if (!collection) {
		return <div>Collection not found</div>;
	}

	return (
		<div className="flex flex-col gap-16 pt-32 max-xl:pt-28 max-sm:pt-20">
			<div className="px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4 flex flex-col gap-16 max-sm:gap-8">
				<div className="flex flex-col gap-8 max-sm:gap-4">
					<div className="flex justify-between items-center">
						<h1 className="text-white font-luckiest-guy text-4xl">
							{collection.title}
						</h1>
					</div>
					<div className="grid grid-cols-4 gap-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
						{collection.products.nodes.map((product) => {
							if (!product.images.nodes[0]) return;
							if (
								!product.variants.nodes.some(
									(variant) => variant.availableForSale,
								)
							) {
								return;
							}

							return (
								<ProductCard
									key={product.id}
									id={product.id}
									handle={product.handle}
									image={product.images.nodes[0].url}
									name={product.title}
									price={product.variants.nodes[0].price.amount}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
