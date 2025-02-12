// Reconsile cart with inventory

import CheckoutPayButton from "@/components/CheckoutPayButton";
import TextInput from "@/components/form/TextInput";
import { ToggleModal } from "@/components/Modal";
import LinkEmailModal from "@/components/modals/LinkEmailModal";
import RedeemGold from "@/components/Checkout";
import { getAuthenticatedUser } from "@/server/queries/users";
import { Check, Link } from "lucide-react";
import { redirect } from "next/navigation";
import Checkout from "@/components/Checkout";

// Link email

// Enter shipping info

// Estimate order cost

// Choose gold redemption

// Submit order and wipe cart (if 100% gold finalize, else redirect to payment with applied discount)

export default async function CheckoutPage() {
	const user = await getAuthenticatedUser();

	if (!user?.nexus || user.nexus.carts.length === 0) {
		return redirect("/shop");
	}

	return (
		<>
			<div className="flex justify-center gap-4 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
				<Checkout user={user} />
			</div>
			<LinkEmailModal />
		</>
	);
}
