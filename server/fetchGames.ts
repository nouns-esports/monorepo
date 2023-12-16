// import { db, games } from "@/db/schema";
// import { cache } from "react";

// export default cache(async () => {
//   return db.select().from(games).orderBy(games.name);
// });

import { Game } from "@/db/schema";

export default async function fetchGames(ids?: string[]) {
  const games: Game[] = [
    {
      id: "brawl-stars",
      active: true,
      name: "Brawl Stars",
      image: "/games/brawl-stars.webp",
      color: "#ffbe20",
      rosters: ["brawl-stars"],
    },
    {
      id: "csgo",
      active: true,
      name: "CSGO",
      image: "/games/csgo.webp",
      color: "#71C5E8",
      rosters: ["csgo"],
    },
    {
      id: "dota-2",
      active: true,
      name: "Dota 2",
      image: "/games/dota-2.webp",
      color: "#dc9489",
      rosters: ["dota-2"],
    },
    {
      id: "pokemon-unite",
      active: true,
      name: "Pokémon Unite",
      image: "/games/pokemon-unite.webp",
      color: "#A32BFF",
      rosters: ["pokemon-unite"],
    },
    {
      id: "smash-melee",
      active: true,
      name: "Smash Melee",
      image: "/games/smash-melee.webp",
      color: "#ACDAA9",
      rosters: ["smash-melee"],
    },
  ];

  if (ids) {
    return games.filter((game) => ids.includes(game.id));
  }

  return games;
}
