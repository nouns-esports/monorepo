import fetchGames from "./fetchGames";

export default async function fetchGame(id: string) {
    const game = (await fetchGames()).find((game) => game.id === id);

    if (!game) {
        throw new Error(`Game ${id} not found`);
    }

    return game;
}