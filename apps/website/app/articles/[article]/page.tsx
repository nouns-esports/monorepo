import MarkdownTipTap from "@/components/MarkdownTipTap";
import { getArticle } from "@/server/queries/articles";
import { notFound } from "next/navigation";

export default async function ArticlePage() {
	const article = await getArticle({ id: "enter-the-nexus" });

	if (!article) {
		return notFound();
	}

	return (
		<div className="flex flex-col items-center gap-8 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
			<div className="flex flex-col gap-4 max-w-3xl bg-grey-800 rounded-xl">
				<img
					src={article.image}
					alt={article.title}
					className="aspect-video rounded-xl object-cover"
				/>
				<div className="flex flex-col gap-4 p-4">
					<h1 className="text-4xl text-white font-luckiest-guy">
						{article.title}
					</h1>
					<MarkdownTipTap content={article.content} />
				</div>
			</div>
		</div>
	);
}
