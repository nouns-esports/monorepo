import crypto from "crypto";
import { env } from "~/env";
import { type SignOptions, sign } from "jsonwebtoken";

async function createCoinbaseRequest(request: {
	method: string;
	path: string;
	body?: Record<string, string>;
	searchParams?: Record<string, string>;
}) {
	const host = "api.developer.coinbase.com";

	const uri = `${request.method} ${host}${request.path}`;

	const payload = {
		iss: "coinbase-cloud",
		nbf: Math.floor(Date.now() / 1000),
		exp: Math.floor(Date.now() / 1000) + 120,
		sub: env.CDP_API_KEY_NAME,
		uri,
	};

	const signOptions: SignOptions = {
		algorithm: "ES256",
		header: {
			kid: env.CDP_API_KEY_NAME,
			// @ts-ignore
			nonce: crypto.randomBytes(16).toString("hex"), // non-standard, coinbase-specific header that is necessary
		},
	};

	const jwt = sign(payload, env.CDP_SECRET_KEY, signOptions);

	try {
		const url = new URL(`https://${host}${request.path}`);

		if (request.searchParams) {
			for (const [key, value] of Object.entries(request.searchParams)) {
				url.searchParams.set(key, value);
			}
		}

		const response = await fetch(url, {
			method: request.method,
			body: request.body ? JSON.stringify(request.body) : undefined,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
		});

		return response.json();
	} catch (error) {
		console.error("Error creating Coinbase request", error);
	}
}

export async function getQuote() {
	const quote = await createCoinbaseRequest({
		method: "POST",
		path: "/onramp/v1/buy/quote",
		body: {
			purchase_currency: "2b92315d-eab7-5bef-84fa-089a131333f5",
			purchase_network: "base",
			payment_amount: "10.00",
			payment_currency: "USD",
			payment_method: "CARD",
			country: "US",
			subdivision: "IL",
		},
	});

	return quote.quote_id;
}

export async function getOnrampURL() {
	// const options = await createCoinbaseRequest({
	// 	method: "GET",
	// 	path: "/onramp/v1/buy/options",
	// 	searchParams: {
	// 		country: "US",
	// 	},
	// });
	// // USDC: 2b92315d-eab7-5bef-84fa-089a131333f5

	// console.log(
	// 	"options",
	// 	options.payment_currencies.find((cur) => cur.id === "USD"),
	// );

	const USDC = "2b92315d-eab7-5bef-84fa-089a131333f5";

	const quote = await createCoinbaseRequest({
		method: "POST",
		path: "/onramp/v1/buy/quote",
		body: {
			purchase_currency: USDC,
			purchase_network: "base",
			payment_amount: "10.00",
			payment_currency: "USD",
			payment_method: "CARD",
			country: "US",
			subdivision: "IL",
		},
	});

	console.log("quote", quote);

	return `https://pay.coinbase.com/buy/select-asset?appId=${env.NEXT_PUBLIC_PRIVY_APP_ID}&destinationWallets=[{"address":"0xE3ff24a97BFB65CAdEF30F6Ad19a6EA7E6F6149d","blockchains":["base"]}]&defaultAsset=${USDC}&defaultPaymentMethod=CARD&fiatCurrency=USD&presetFiatAmount=10&quoteId=${quote.quote_id}`;
}
