// Reconsile cart with inventory

import CheckoutPayButton from "@/components/CheckoutPayButton";
import { getAuthenticatedUser } from "@/server/queries/users";

// Link email

// Enter shipping info

// Estimate order cost

// Choose gold redemption

// Submit order and wipe cart (if 100% gold finalize, else redirect to payment with applied discount)

export default async function CheckoutPage() {
	const user = await getAuthenticatedUser();

	console.log(user?.nexus?.carts);

	return (
		<div className="flex flex-col items-center gap-16 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
			<div className="max-w-2xl w-full flex flex-col gap-4 bg-grey-800 rounded-xl p-6">
				<h1 className="text-white text-2xl font-luckiest-guy leading-none">
					Checkout
				</h1>
				<CheckoutPayButton />
			</div>
		</div>
	);
}
