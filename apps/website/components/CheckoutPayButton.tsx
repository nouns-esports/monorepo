"use client";

import { useAction } from "next-safe-action/hooks";
import Button from "./Button";
import { createOrder } from "@/server/mutations/createOrder";

export default function CheckoutPayButton() {
	const createOrderAction = useAction(createOrder);

	return (
		<Button
			onClick={async () => {
				await createOrderAction.executeAsync({
					shipping: {
						firstName: "John",
						lastName: "Doe",
						address1: "123 Main St",
						address2: "Apt 1",
						city: "Anytown",
						province: "CA",
						country: "US",
						zip: "12345",
					},
					goldApplied: 0,
				});
			}}
		>
			Pay now
		</Button>
	);
}
