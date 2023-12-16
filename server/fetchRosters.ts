import { Roster } from "@/db/schema";

export default async function fetchRosters(ids?: string[]) {
    const rosters: Roster[] = [
        {
            id: "brawl-stars",
            active: true,
            name: "Brawl Stars",
            game: "brawl-stars",
            talent: ["pekka", "firecrow", "mohtep", "rol", "quinaia"],
            liquipedia: "https://liquipedia.net/brawlstars/Nouns_Esports",
        },
        {
            id: "csgo",
            active: true,
            name: "CSGO",
            game: "csgo",
            talent: ["bwills", "cj", "nosrac", "marke", "semphis", "cynic"],
            liquipedia: "https://liquipedia.net/counterstrike/Nouns_Esports",
        },
        {
            id: "dota-2",
            active: true,
            name: "Dota 2",
            game: "dota-2",
            talent: ["lelis", "yuma", "stormstormer", "gunnar", "astini", "fly"],
            liquipedia: "https://liquipedia.net/dota2/Nouns",
        },
        {
            id: "pokemon-unite",
            active: true,
            name: "Pokémon Unite",
            game: "pokemon-unite",
            talent: ["adesu", "bruv", "xblaine", "megumini", "yutao", "toonslim"],
            liquipedia: "https://liquipedia.net/pokemon/Nouns_Esports",
        },
        {
            id: "smash-melee",
            active: true,
            name: "Smash Melee",
            game: "smash-melee",
            talent: ["aklo"],
            liquipedia: "https://liquipedia.net/smash/Aklo",
        },
    ];

    if (ids) {
        return rosters.filter((roster) => ids.includes(roster.id));
    }

    return rosters;
}
  