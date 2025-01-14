import { X } from "lucide-react";
import { Modal, ToggleModal } from "../Modal";
import { generateOnRampURL } from "@coinbase/cbpay-js";
import Link from "../Link";
import { env } from "~/env";
import { getQuote } from "@/server/queries/coinbase";

export default async function GoldModal() {
	const quote = await getQuote();

	return (
		<Modal id="gold" className="p-4 flex flex-col max-w-[500px] w-80 gap-8">
			<div className="flex justify-between items-center">
				<p className="text-white text-2xl font-bebas-neue leading-none">
					Your Balance
				</p>
				<ToggleModal
					id="gold"
					className="p-1 rounded-full bg-grey-600 hover:bg-grey-500 transition-colors"
				>
					<X className="w-4 h-4 text-grey-200" />
				</ToggleModal>
			</div>

			<div className="flex justify-center gap-2.5 items-center">
				<img
					alt="Gold coin"
					src="https://ipfs.nouns.gg/ipfs/bafkreiccw4et522umioskkazcvbdxg2xjjlatkxd4samkjspoosg2wldbu"
					className="rounded-full h-10 w-10 shadow-xl"
				/>
				<p className="font-semibold text-4xl text-[#FEBD1C]">100</p>
			</div>
			<Link
				href={generateOnRampURL({
					appId: env.NEXT_PUBLIC_CDP_PROJECT_ID,
					destinationWallets: [
						{
							address: "0xE3ff24a97BFB65CAdEF30F6Ad19a6EA7E6F6149d",
							blockchains: ["base"],
						},
					],
					// defaultAsset: "2b92315d-eab7-5bef-84fa-089a131333f5",
					assets: ["USDC"],
					defaultAsset: "USDC",
					defaultPaymentMethod: "CARD",
					fiatCurrency: "USD",
					presetFiatAmount: 10,
					quoteId: quote,
				})}
				newTab
				className="flex justify-center items-center gap-2 w-full text-black bg-white hover:bg-white/70 font-semibold rounded-lg p-2.5 transition-colors"
			>
				Buy
			</Link>
		</Modal>
	);
}
