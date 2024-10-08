import {
  db,
  links,
  ranks,
  seasons,
  events,
  quests,
} from "~/packages/db/schema";
import fs from "fs";

// Fetching
// const linkData = await db.query.links.findMany();
// const eventData = await db.query.events.findMany();
// const seasonData = await db.query.seasons.findMany();
// const rankData = await db.query.ranks.findMany();
// const questData = await db.query.quests.findMany();

// fs.writeFileSync("linkData.json", JSON.stringify(linkData));
// fs.writeFileSync("eventData.json", JSON.stringify(eventData));
// fs.writeFileSync("seasonData.json", JSON.stringify(seasonData));
// fs.writeFileSync("rankData.json", JSON.stringify(rankData));
// fs.writeFileSync("questData.json", JSON.stringify(questData));

// Seeding
// await db.transaction(async (tx) => {
//   await tx.insert(links).values([
//     { id: "shop", url: "https://shop.nouns.gg" },
//     { id: "cup", url: "https://start.gg/matchacup" },
//     { id: "mint", url: "https://shorturl.at/mJKPS" },
//     { id: "jerseys", url: "https://raven.gg/stores/nounsesports/" },
//     { id: "duff-hoodie", url: "https://shop.nouns.gg/collections/duff-city" },
//     { id: "raffle", url: "https://app.rep3.gg/matcha/quest/Matchaon0xv2" },
//     { id: "discord", url: "https://discord.com/invite/nounsesports" },
//     { id: "twitter", url: "https://x.com/nounsesports" },
//     { id: "twitch", url: "https://www.twitch.tv/nounsesports/" },
//     { id: "youtube", url: "https://www.youtube.com/@nounsesports" },
//     { id: "tiktok", url: "https://www.tiktok.com/@nounsesports" },
//     { id: "instagram", url: "https://www.instagram.com/nouns_esports/" },
//     { id: "bracket", url: "https://shorturl.at/jOzr7" },
//     {
//       id: "matchacup",
//       url: "https://www.start.gg/tournament/matcha-cup-east-coast-1/details",
//     },
//     { id: "taki", url: "https://nouns.gg/rounds/taki" },
//     {
//       id: "matcha",
//       url: "https://matcha.xyz/?utm_source=nouns&utm_campaign=2q24",
//     },
//     {
//       id: "events",
//       url: "https://calendar.google.com/calendar/embed?src=2gl6iku9kcb2qjdrtgdthgng3s%40group.calendar.google.com",
//     },
//     { id: "about", url: "https://www.youtube.com/watch?v=SAXzMQ8pPvE" },
//     {
//       id: "what-is-nouns",
//       url: "https://www.youtube.com/watch?v=oa79nN4gMPs",
//     },
//     {
//       id: "what-does-nouns-fund",
//       url: "https://www.youtube.com/watch?v=3LlTeb444e4",
//     },
//     {
//       id: "what-is-an-os-brand",
//       url: "https://www.youtube.com/watch?v=ANMJYNLyKIk",
//     },
//     { id: "nouns-camp", url: "https://nouns.camp/" },
//     { id: "nounstown", url: "https://nounstown.wtf" },
//     {
//       id: "nounsfest-trailer",
//       url: "https://www.youtube.com/watch?v=i3vu2kqlWfs",
//     },
//     { id: "nounsfest", url: "https://nounsfest.tv/festival/" },
//     { id: "meet-matcha", url: "https://www.youtube.com/watch?v=GgKfH_26Vvc" },
//     {
//       id: "matcha-x-nouns-esports",
//       url: "https://blog.matcha.xyz/article/matcha-partners-with-nouns-esports",
//     },
//     {
//       id: "matcha-interview-ppd",
//       url: "https://www.youtube.com/watch?v=hacuzvKvjp4",
//     },
//   ]);
//   await tx.insert(events).values({
//     id: "nounstown",
//     name: "Nouns Town",
//     image:
//       "https://ipfs.nouns.gg/ipfs/QmbkM2Xf7A2DUXQt8HYRpryjdZDLLs2j3Ktj8aNK7yebJ2",
//     start: "2024-10-07T05:00:00.000Z",
//     end: "2024-10-13T05:00:00.000Z",
//     community: "nouns",
//     featured: true,
//     season: 1,
//   } as unknown as any);
//   await tx.insert(seasons).values({
//     id: 1,
//     start: "2024-08-16T00:00:00.000Z",
//     end: "2026-08-16T00:00:00.000Z",
//   } as unknown as any);
//   await tx.insert(ranks).values([
//     {
//       id: 4,
//       name: "Challenger I",
//       image:
//         "https://ipfs.nouns.gg/ipfs/QmWsJN8n5VqYYfktHJeqFtXexFjWzdoAygT9FRxszqymTK",
//       color: "#DA00CB",
//       place: 3,
//       percentile: "1.00",
//       season: 1,
//       votes: 4,
//     },
//     {
//       id: 1,
//       name: "Explorer I",
//       image:
//         "https://ipfs.nouns.gg/ipfs/QmU7Sih3UVKZWLeHRrP6xm6yxvycXjhqz9Qqo7UfvnpzQx",
//       color: "#4990FD",
//       place: 0,
//       percentile: "1.00",
//       season: 1,
//       votes: 1,
//     },
//     {
//       id: 5,
//       name: "Challenger II",
//       image:
//         "https://ipfs.nouns.gg/ipfs/QmdVbgY973Uo2hTYC9AJ3DENT7CZXJwWjL2cKsEAGcJ34y",
//       color: "#DA00CB",
//       place: 4,
//       percentile: "1.00",
//       season: 1,
//       votes: 5,
//     },
//     {
//       id: 2,
//       name: "Explorer II",
//       image:
//         "https://ipfs.nouns.gg/ipfs/QmXfJXNYKtFPXGYijdoMvy1MhuKebriqtyzmm2XRs381ov",
//       color: "#4990FD",
//       place: 1,
//       percentile: "1.00",
//       season: 1,
//       votes: 2,
//     },
//     {
//       id: 3,
//       name: "Explorer III",
//       image:
//         "https://ipfs.nouns.gg/ipfs/QmcobYJjMLphBDYfhxhqkeitn2aYpmzDGkmRxKYuLjXQqP",
//       color: "#4990FD",
//       place: 2,
//       percentile: "1.00",
//       season: 1,
//       votes: 3,
//     },
//     {
//       id: 6,
//       name: "Challenger III",
//       image:
//         "https://ipfs.nouns.gg/ipfs/QmNcXpn9QKiDmnDJW29Up8oMbXHanYWiaKS88JAVA4iG8b",
//       color: "#DA00CB",
//       place: 5,
//       percentile: "1.00",
//       season: 1,
//       votes: 6,
//     },
//     {
//       id: 7,
//       name: "Champion I",
//       image:
//         "https://ipfs.nouns.gg/ipfs/QmSSiHjLoDCGjAu5dnt5FL7qBwnHYB2FAVfuFhxbxTwpdV",
//       color: "#F00000",
//       place: 6,
//       percentile: "1.00",
//       season: 1,
//       votes: 7,
//     },
//     {
//       id: 8,
//       name: "Champion II",
//       image:
//         "https://ipfs.nouns.gg/ipfs/QmeTCcKE8Bg91nCDNUWtcSb8HPoaLHF6DYeM213F3MxBvy",
//       color: "#F00000",
//       place: 7,
//       percentile: "1.00",
//       season: 1,
//       votes: 8,
//     },
//     {
//       id: 9,
//       name: "Champion III",
//       image:
//         "https://ipfs.nouns.gg/ipfs/QmQk8CroPbN6J16NH2UtRQ1GdD2fDA3eGfZeRZQr2YLAT6",
//       color: "#F00000",
//       place: 8,
//       percentile: "1.00",
//       season: 1,
//       votes: 10,
//     },
//   ]);
//   await tx.insert(quests).values([
//     {
//       id: "visit-nounsfest",
//       name: "Check out Nouns Fest",
//       description: "",
//       image:
//         "https://ipfs.nouns.gg/ipfs/QmbXfDhWZKPevBJKxGyRKF96y1UtCodfFE5Ej39WuVHyKN",
//       community: "nouns",
//       season: "1",
//       event: "nounstown",
//       createdAt: "2024-10-07T05:00:00.000Z",
//       featured: false,
//       active: true,
//       start: null,
//       end: null,
//       xp: 100,
//       actions: ["visitLink", "visitLink"],
//       actionInputs: [
//         { link: "nounsfest", type: "website" },
//         {
//           link: "nounsfest-trailer",
//           name: "Nouns Fest Trailer",
//           type: "video",
//         },
//       ],
//     },
//     {
//       id: "join-discord",
//       name: "Join the Discord server",
//       description: "Join and get involved in our community Discord server",
//       image:
//         "https://ipfs.nouns.gg/ipfs/QmRKWpRbaBDx7R3uu6uaNEZ5MqX99WZ2dXpMatYSQ6yWte",
//       community: "nouns-esports",
//       season: "1",
//       event: null,
//       createdAt: "2024-10-07T05:00:00.000Z",
//       featured: false,
//       active: true,
//       start: null,
//       end: null,
//       xp: 150,
//       actions: ["linkDiscord", "joinServer"],
//       actionInputs: [null, null],
//     },
//     {
//       id: "visit-nounstown",
//       name: "Visit the official website",
//       description: "",
//       image:
//         "https://ipfs.nouns.gg/ipfs/QmQoKSsTb73wwgeQbjkYHcfQyVGxz6VaY2wjaLK1kZSTzA",
//       community: "nouns",
//       season: "1",
//       event: "nounstown",
//       createdAt: "2024-10-07T05:00:00.000Z",
//       featured: false,
//       active: true,
//       start: null,
//       end: null,
//       xp: 100,
//       actions: ["visitLink"],
//       actionInputs: [{ link: "nounstown", type: "website" }],
//     },
//     {
//       id: "follow-farcaster",
//       name: "Follow us on Farcaster",
//       description: "",
//       image:
//         "https://ipfs.nouns.gg/ipfs/QmbJPh5jcLTxnLJ3FrNeu9J7iWRAcHp7cgYbGGoz8n7Cyt",
//       community: "nouns-esports",
//       season: "1",
//       event: null,
//       createdAt: "2024-10-07T05:00:00.000Z",
//       featured: false,
//       active: true,
//       start: null,
//       end: null,
//       xp: 200,
//       actions: ["linkFarcaster", "followAccount", "followChannel"],
//       actionInputs: [
//         null,
//         { account: "esports" },
//         { channel: "nouns-esports" },
//       ],
//     },
//     {
//       id: "dive-into-nouns",
//       name: "Dive into Nouns",
//       description:
//         "Behold, an infinite work of art! Nouns is a community-owned brand that makes a positive impact by funding ideas and fostering collaboration. From collectors and technologists, to non-profits and brands, Nouns is for everyone.",
//       image:
//         "https://ipfs.nouns.gg/ipfs/QmauVcnZwPjqZyZ4DZ7srjPa4oVhyDe5E8iKmfhSbUDdvK",
//       community: "nouns",
//       season: "1",
//       event: null,
//       createdAt: "2024-10-07T05:00:00.000Z",
//       featured: false,
//       active: true,
//       start: null,
//       end: null,
//       xp: 150,
//       actions: ["visitLink", "visitLink", "visitLink", "visitLink"],
//       actionInputs: [
//         { link: "nouns-camp", type: "website" },
//         { link: "what-is-nouns", name: "What is Nouns?", type: "video" },
//         {
//           link: "what-does-nouns-fund",
//           name: "What Does Nouns Fund?",
//           type: "video",
//         },
//         {
//           link: "what-is-an-os-brand",
//           name: "What is an Open Source Brand?",
//           type: "video",
//         },
//       ],
//     },
//     {
//       id: "onchain-with-matcha",
//       name: "Begin your onchain journey with Matcha",
//       description:
//         "Matcha is taking on the challenge of bringing Esports fans onchain, by providing a simple and seamless experience as the DEX of choice for gamers making their opening moves in Web3.",
//       image:
//         "https://ipfs.nouns.gg/ipfs/QmZNnuMWEMg47Bq5fbnSp6DBXcr3b6mSnfCw5dNNC4SE3D",
//       community: "matcha",
//       season: "1",
//       event: null,
//       createdAt: "2024-10-07T05:00:00.000Z",
//       featured: false,
//       active: true,
//       start: null,
//       end: null,
//       xp: 300,
//       actions: ["visitLink", "visitLink", "visitLink", "visitLink"],
//       actionInputs: [
//         { link: "matcha", type: "website" },
//         {
//           link: "matcha-x-nouns-esports",
//           name: "Matcha partners with Nouns Esports",
//           type: "article",
//         },
//         { link: "meet-matcha", name: "Meet Matcha", type: "video" },
//         {
//           link: "matcha-interview-ppd",
//           name: "Interview with Peter “ppd” Dager",
//           type: "video",
//         },
//       ],
//     },
//     {
//       id: "nounstown-farcaster",
//       name: "Follow the NounsTown discussion on Farcaster",
//       description: "",
//       image:
//         "https://ipfs.nouns.gg/ipfs/QmbJPh5jcLTxnLJ3FrNeu9J7iWRAcHp7cgYbGGoz8n7Cyt",
//       community: "nouns",
//       season: "1",
//       event: "nounstown",
//       createdAt: "2024-10-07T05:00:00.000Z",
//       featured: false,
//       active: true,
//       start: null,
//       end: null,
//       xp: 150,
//       actions: ["linkFarcaster", "followAccount", "followChannel"],
//       actionInputs: [
//         null,
//         { account: "nounstownla" },
//         { channel: "nounstown" },
//         { channel: "nouns-esports" },
//       ],
//     },
//     {
//       id: "mint-nounstown",
//       name: "Mint the art piece",
//       description: "",
//       image:
//         "https://ipfs.nouns.gg/ipfs/QmbkM2Xf7A2DUXQt8HYRpryjdZDLLs2j3Ktj8aNK7yebJ2",
//       community: "art",
//       season: "1",
//       event: "nounstown",
//       createdAt: "2024-10-07T05:00:00.000Z",
//       featured: false,
//       active: true,
//       start: null,
//       end: null,
//       xp: 250,
//       actions: ["linkWallet", "mintERC1155"],
//       actionInputs: [
//         null,
//         {
//           link: "https://zora.co/collect/base:0xae917c5a7d889f5e7e5af7a613f52f9f39f860ee/11",
//           name: "Nouns Town",
//           chain: "base",
//           address: "0xae917c5a7d889f5e7e5af7a613f52f9f39f860ee",
//           tokenId: "11",
//         },
//       ],
//     },
//     {
//       id: "complete-profile",
//       name: "Complete your Nexus profile",
//       description:
//         "Complete you Nexus profile by connecting all of your social accounts",
//       image:
//         "https://ipfs.nouns.gg/ipfs/QmRefR8V3M74tQuxizggTfUTZRwiyU75bfm2vEsWi73qsV",
//       community: "nouns-esports",
//       season: "1",
//       event: null,
//       createdAt: "2024-10-07T05:00:00.000Z",
//       featured: false,
//       active: true,
//       start: null,
//       end: null,
//       xp: 250,
//       actions: ["linkDiscord", "linkTwitter", "linkFarcaster", "linkWallet"],
//       actionInputs: [null, null, null, null],
//     },
//     {
//       id: "watch-showcase",
//       name: "Watch the Smash showcase",
//       description: "",
//       image:
//         "https://ipfs.nouns.gg/ipfs/Qmf461xCfwsZzNZTBMGb9uk1LY6pv3qkGSPsQrWmPmVZBn",
//       community: "nouns-esports",
//       season: "1",
//       event: "nounstown",
//       createdAt: "2024-10-07T05:00:00.000Z",
//       featured: false,
//       active: true,
//       start: "2024-10-09T19:00:00.000Z",
//       end: "2024-11-09T01:00:00.000Z",
//       xp: 250,
//       actions: ["visitLink"],
//       actionInputs: [{ link: "twitch", type: "stream" }],
//     },
//   ] as unknown as any);
// });
