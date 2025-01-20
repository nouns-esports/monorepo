import Link from "@/components/Link";
import MarkdownTipTap from "@/components/MarkdownTipTap";
import { getArticle } from "@/server/queries/articles";
import { getAuthenticatedUser } from "@/server/queries/users";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { env } from "~/env";

export async function generateMetadata(props: {
	params: Promise<{ article: string }>;
}): Promise<Metadata> {
	const params = await props.params;

	const article = await getArticle({ id: params.article });

	if (!article) {
		return notFound();
	}

	return {
		title: article.title,
		description: "",
		metadataBase: new URL(env.NEXT_PUBLIC_DOMAIN),
		openGraph: {
			type: "website",
			images: [article.image],
		},
		twitter: {
			site: "@NounsEsports",
			card: "summary_large_image",
			images: [article.image],
		},
	};
}

export default async function ArticlePage(props: {
	params: Promise<{ article: string }>;
}) {
	const params = await props.params;

	const [article, user] = await Promise.all([
		getArticle({ id: params.article }),
		getAuthenticatedUser(),
	]);

	if (!article) {
		return notFound();
	}

	// if (
	// 	article.id === "eurank-2024" &&
	// 	(!user ||
	// 		![
	// 			"did:privy:clx8g9mui0c1k10947grzks2a",
	// 			"did:privy:cm0u971uh00gxzujycovcgkzc",
	// 			"did:privy:clzipnabz023r3kppwk34w5qw",
	// 			"did:privy:clzigrp2u0bnt73v7seyd0gfl",
	// 			"did:privy:clzzr9beu04rp14cds53dnfai",
	// 		].includes(user.id))
	// ) {
	// 	return notFound();
	// }

	return (
		<div className="flex flex-col items-center gap-8 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
			<div className="flex flex-col gap-4 max-w-3xl">
				<Link href="/" className="text-red flex items-center gap-1 group w-fit">
					<ArrowLeft className="w-5 h-5 text-red group-hover:-translate-x-1 transition-transform" />
					Back to home
				</Link>
				<img
					src={article.image}
					alt={article.title}
					className="aspect-video rounded-xl object-cover max-h-64"
				/>
				<div className="flex flex-col gap-4">
					<h1 className="text-4xl text-white font-luckiest-guy">
						{article.title}
					</h1>
					<MarkdownTipTap content={article.content} />
				</div>
			</div>
		</div>
	);
}
