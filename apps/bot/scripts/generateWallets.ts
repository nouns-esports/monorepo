import { privyClient } from "..";

const users = await privyClient.getUsers();

for (let i = 0; i < users.length; i++) {
	console.log(`Generating wallets ${i + 1}/${users.length}`);
	const user = users[i];

	try {
		await privyClient.importUser({
			linkedAccounts: user.linkedAccounts,
			createEthereumWallet: true,
			createEthereumSmartWallet: true,
		});
	} catch (e) {
		console.error(`Iteration ${i + 1}/${users.length}`, e);
	}
}

console.log("done");
