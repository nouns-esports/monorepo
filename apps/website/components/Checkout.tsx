"use client";

import { useState } from "react";
import TextInput from "./form/TextInput";
import { ToggleModal } from "./Modal";
import { Check, Link } from "lucide-react";
import type { AuthenticatedUser } from "@/server/queries/users";

export default function Checkout(props: {
	user: AuthenticatedUser;
}) {
	const items =
		props.user.nexus?.carts.map((item) => {
			const variant =
				item.product.variants.find(
					(variant) => variant.shopifyId === item.variant,
				) ?? item.product.variants[0];

			return {
				product: item.product.id,
				variant: item.variant,
				image: item.product.images[0],
				title: item.product.name,
				quantity: item.quantity,
				price: variant.price,
			};
		}) ?? [];

	const subtotal = items.reduce(
		(acc, item) => acc + Number(item.price) * item.quantity,
		0,
	);

	const tax = 5;
	const shipping = 10;

	const [goldUsed, setGoldUsed] = useState(0);

	const total = subtotal + tax + shipping;
	const totalWithDiscount = subtotal + tax + shipping - goldUsed / 100;

	return (
		<>
			<div className="flex flex-col gap-8 bg-grey-800 rounded-xl p-4 h-min">
				<div className="flex flex-col gap-4">
					<h1 className="text-white text-2xl font-bebas-neue leading-none">
						Your Cart
					</h1>
					<div className="flex flex-col gap-4">
						{items.map((item) => (
							<div key={item.product} className="flex items-center gap-4">
								<div className="flex items-center gap-2 bg-grey-600 rounded-lg p-2 w-16 h-16 aspect-square">
									<img
										src={`${item.image}?img-height=100&img-onerror=redirect`}
										alt={item.title}
										className="w-full h-full object-contain"
									/>
								</div>
								<div className="flex flex-col gap-2 w-full">
									<p className="text-white line-clamp-1">{item.title}</p>
									<div className="flex items-center gap-2">
										<p className="text-white">${item.price}</p>
										<p className="text-grey-200">x{item.quantity}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-1">
						<div className="flex justify-between items-center">
							<p className="text-sm">Tax</p> <p className="text-sm">$5</p>
						</div>
						<div className="flex justify-between items-center">
							<p className="text-sm">Shipping</p>
							<p className="text-sm">$10</p>
						</div>
						{goldUsed > 0 ? (
							<div className="flex justify-between items-center">
								<p className="text-sm text-gold-500">Gold Used</p>
								<p className="text-sm text-gold-500">-${goldUsed / 100}</p>
							</div>
						) : null}
					</div>
					<div className="flex justify-between items-center">
						<p className="text-white text-xl font-bebas-neue leading-none">
							Subtotal
						</p>

						<div className="flex gap-2.5 items-center">
							{goldUsed > 0 ? (
								<p className="line-through text-xl font-bebas-neue leading-none">
									${total.toFixed(2)}
								</p>
							) : null}
							<p className="text-white text-xl font-bebas-neue leading-none">
								${totalWithDiscount.toFixed(2)}
							</p>
						</div>
					</div>
					<button
						onClick={async () => {
							// await createOrderAction.executeAsync({
							// 	shipping: {
							// 		firstName: "John",
							// 		lastName: "Doe",
							// 		address1: "123 Main St",
							// 		address2: "Apt 1",
							// 		city: "Anytown",
							// 		province: "CA",
							// 		country: "US",
							// 		zip: "12345",
							// 	},
							// 	goldApplied: 0,
							// });
						}}
						className="flex justify-center items-center gap-2 w-full text-black bg-white hover:bg-white/70 font-semibold rounded-lg p-2.5 transition-colors"
					>
						{totalWithDiscount <= 0 ? "Place Order" : "Continue to payment"}
					</button>
				</div>
			</div>
			<div className="w-full max-w-lg flex flex-col gap-4">
				<div className="w-full flex flex-col gap-4 bg-grey-800 rounded-xl p-4">
					<h1 className="text-white text-2xl font-bebas-neue leading-none">
						Email
					</h1>
					{props.user.email ? (
						<p className="text-green flex items-center gap-1">
							<Check className="w-4 h-4" />
							{props.user.email.address}
						</p>
					) : (
						<ToggleModal
							id="link-email"
							className="text-red hover:text-red/70 transition-colors flex items-center gap-1"
						>
							<Link className="w-4 h-4" />
							Link an email
						</ToggleModal>
					)}
				</div>
				<div className=" w-full flex flex-col gap-4 bg-grey-800 rounded-xl p-4">
					<h1 className="text-white text-2xl font-bebas-neue leading-none">
						Shipping
					</h1>
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-2">
							<TextInput label="First Name" placeholder="John" />
							<TextInput label="Last Name" placeholder="Doe" />
						</div>
						<div className="flex items-center gap-2">
							<TextInput label="Address" placeholder="123 Main St" />
							<TextInput
								label="Address 2"
								placeholder="Apt 1"
								className="w-40 flex-shrink-0"
							/>
						</div>
						<div className="flex items-center gap-2">
							<TextInput label="City" placeholder="Anytown" />
							<TextInput label="State" placeholder="CA" />
						</div>
						<div className="flex items-center gap-2">
							<TextInput label="Zip" placeholder="12345" />
							<TextInput label="Country" placeholder="United States" />
						</div>
					</div>
				</div>
				<div className="w-full flex flex-col gap-4 bg-grey-800 rounded-xl p-4">
					<h1 className="text-white text-2xl font-bebas-neue leading-none">
						Redeem Gold
					</h1>
					<input
						type="range"
						onChange={(e) => setGoldUsed(Number(e.target.value))}
						min={0}
						max={props.user.nexus?.gold ?? 0}
						value={goldUsed}
						className="accent-gold-500"
					/>
				</div>
			</div>
		</>
	);
}
