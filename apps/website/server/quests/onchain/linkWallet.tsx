import createAction from "../createAction";

export const linkWallet = createAction(async () => {
	return {
		description: <p>Link an Ethereum wallet</p>,
		url: "/nexus",
		check: async (user) => {
			if (user.wallets.length === 0) return false;

			return true;
		},
	};
});
