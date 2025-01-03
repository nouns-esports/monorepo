import { twMerge } from "tailwind-merge";
import Link from "./Link";

export default function ArticleCard(props: {
	id: string;
	title: string;
	image: string;
	className?: string;
}) {
	return (
		<Link
			href={`/articles/${props.id}`}
			className={twMerge("flex flex-col gap-2 group", props.className)}
		>
			<div className="rounded-xl overflow-hidden w-full rotate-[0.01deg] aspect-video max-lg:w-[300px]">
				<img
					draggable={false}
					src={props.image}
					alt={props.title}
					className="rounded-xl select-none group-hover:scale-105 transition-transform"
				/>
			</div>
			<h3 className="group-hover:text-white transition-colors">
				{props.title}
			</h3>
		</Link>
	);
}
