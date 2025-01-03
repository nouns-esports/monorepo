import { readFileSync } from "fs";

type Participant = {
	id: string;
	confirmationNumber: string;
	firstName: string;
	lastName: string;
	gamerTag: string;
	prefix: string;
	shortGamerTag: string;
	pronouns: string;
	email: string;
	phone: string;
	cityState: string;
	city: string;
	state: string;
	zipcode: string;
	country: string;
	registeredAtDate: string;
	registeredAtTime: string;
	note: string;
	discriminator: string;
	twitchStream: string;
	twitterHandle: string;
	steamName: string;
	epicGamesUsername: string;
	epicGamesId: string;
	battlenetUsername: string;
	battlenetId: string;
	adminNotes: string;
	checkedIn: string;
	venueType: string;
	venueFee: string;
	totalEvents: string;
	eastCoastMeleeSingles: string;
	westCoastMeleeSingles: string;
	top8MeleeSingles: string;
	totalOwed: string;
	totalPaid: string;
	totalTransaction: string;
	balance: string;
	stripeTransactionIds: string;
	paypalTransactionIds: string;
	discountsReceived: string;
	discountsOnSite: string;
	connect: string;
	discordInvite: string;
	twitchFollow: string;
	twitterFollow: string;
	mixerFollow: string;
};

const csvContent = readFileSync("./files/attendeeList_matcha-cup.csv", "utf-8");

const records = csvContent
	.split("\n")
	.filter((line) => line.trim())
	.slice(1)
	.map((line) => {
		const values = line.split(",").map((val) => val.trim());
		return {
			confirmationNumber: values[0] || "",
			firstName: values[1] || "",
			lastName: values[2] || "",
			gamerTag: values[3] || "",
			prefix: values[4] || "",
			shortGamerTag: values[5] || "",
			pronouns: values[6] || "",
			email: values[7] || "",
			phone: values[8] || "",
			cityState: values[9] || "",
			city: values[10] || "",
			state: values[11] || "",
			zipcode: values[12] || "",
			country: values[13] || "",
			registeredAtDate: values[14] || "",
			registeredAtTime: values[15] || "",
			note: values[16] || "",
			discriminator: values[17] || "",
			twitchStream: values[18] || "",
			twitterHandle: values[19] || "",
			steamName: values[20] || "",
			epicGamesUsername: values[21] || "",
			epicGamesId: values[22] || "",
			battlenetUsername: values[23] || "",
			battlenetId: values[24] || "",
			adminNotes: values[25] || "",
			checkedIn: values[26] || "",
			venueType: values[27] || "",
			venueFee: values[28] || "",
			totalEvents: values[29] || "",
			eastCoastMeleeSingles: values[30] || "",
			westCoastMeleeSingles: values[31] || "",
			top8MeleeSingles: values[32] || "",
			totalOwed: values[33] || "",
			totalPaid: values[34] || "",
			totalTransaction: values[35] || "",
			balance: values[36] || "",
			stripeTransactionIds: values[37] || "",
			paypalTransactionIds: values[38] || "",
			discountsReceived: values[39] || "",
			discountsOnSite: values[40] || "",
			connect: values[41] || "",
			discordInvite: values[42] || "",
			twitchFollow: values[43] || "",
			twitterFollow: values[44] || "",
			mixerFollow: values[45] || "",
		} as Participant;
	});

console.log("Parsed participants:", records);