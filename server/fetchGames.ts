// import { db, games } from "@/db/schema";
// import { cache } from "react";

// export default cache(async () => {
//   return db.select().from(games).orderBy(games.name);
// });

export default function fetchGames() {
  return [
    {
      id: "brawl-stars",
      name: "Brawl Stars",
      image: "/games/brawl-stars.webp",
      color: "#ffbe20",
      roster: ["pekka", "firecrow", "mohtep", "rol", "quinaia"],
      liquipedia: "https://liquipedia.net/brawlstars/Nouns_Esports",
    },
    {
      id: "csgo",
      name: "CSGO",
      image: "/games/csgo.webp",
      color: "#71C5E8",
      roster: ["bwills", "cj", "nosrac", "marke", "semphis", "cynic"],
      liquipedia: "https://liquipedia.net/counterstrike/Nouns_Esports",
    },
    {
      id: "dota-2",
      name: "Dota 2",
      image: "/games/dota-2.webp",
      color: "#dc9489",
      roster: ["lelis", "yuma", "stormstormer", "gunnar", "astini", "fly"],
      liquipedia: "https://liquipedia.net/dota2/Nouns",
    },
    {
      id: "pokemon-unite",
      name: "Pokémon Unite",
      image: "/games/pokemon-unite.webp",
      color: "#A32BFF",
      roster: ["adesu", "bruv", "xblaine", "megumini", "yutao", "toonslim"],
      liquipedia: "https://liquipedia.net/pokemon/Nouns_Esports",
    },
    {
      id: "smash-melee",
      name: "Smash Melee",
      image: "/games/smash-melee.webp",
      color: "#ACDAA9",
      roster: ["aklo"],
      liquipedia: "https://liquipedia.net/smash/Aklo",
    },
  ];
}
