"use client";

import { toast as hotToast } from "react-hot-toast";
import { Level } from "./Level";
import { Sparkles } from "lucide-react";

export const toast = {
	custom: (props: {
		image: string;
		title: string;
		description: string;
	}) =>
		hotToast.custom((t: any) => (
			<div className="flex w-72 animate-in fade-in-50 slide-in-from-top-4 items-center gap-3 border border-grey-600 rounded-xl p-2 pr-3 bg-grey-800">
				<img src={props.image} className="w-12 h-12 rounded-xl" />
				<div className="flex flex-col">
					<h2 className="text-white line-clamp-1">{props.title}</h2>
					<p className="text-grey-200 text-sm">{props.description}</p>
				</div>
			</div>
		)),
	xp: (amount: number) =>
		hotToast.custom((t: any) => (
			<div className="flex flex-col w-80 animate-in fade-in-50 slide-in-from-top-4 gap-3 border border-grey-600 rounded-xl p-2 pr-3 bg-grey-800">
				<div className="flex gap-2 justify-between items-center">
					<p className="text-white">You earned XP!</p>
					<p className="text-white flex items-center gap-1.5">
						<Sparkles className="w-4 h-4 text-green" />
						{amount}
					</p>
				</div>
				<Level xp={amount} />
			</div>
		)),
	error: (message: string) =>
		hotToast.custom((t: any) => (
			<div className="flex w-fit animate-in fade-in-50 slide-in-from-top-4 items-center gap-3 border border-grey-600 rounded-xl p-2 pr-3 bg-grey-800">
				{message}
			</div>
		)),
	success: (message: string) =>
		hotToast.custom((t: any) => (
			<div className="flex w-fit animate-in fade-in-50 slide-in-from-top-4 items-center gap-3 border border-grey-600 rounded-xl p-2 pr-3 bg-grey-800">
				{message}
			</div>
		)),
};
