export function Toaster() {
	return (
		<div className="absolute top-6 -right-4 pt-4 w-[300px] flex flex-col gap-2 items-end max-sm:fixed max-sm:top-0 max-sm:right-0 max-sm:w-full max-sm:px-4 max-sm:items-center">
			<Toast
				image="/logo/logo-square.png"
				title="New achievement unlocked"
				description="Create your first proposal"
			/>
		</div>
	);
}

export function Toast(props: {
	image: string;
	title: string;
	description: string;
}) {
	return (
		<div className="flex w-fit animate-in fade-in-50 slide-in-from-top-4 items-center gap-3 border border-grey-600 rounded-xl p-2 pr-3 bg-grey-800">
			<img src={props.image} className="w-12 h-12 rounded-xl" />
			<div className="flex flex-col">
				<h2 className="text-white">{props.title}</h2>
				<p className="text-grey-200 text-sm">{props.description}</p>
			</div>
		</div>
	);
}
