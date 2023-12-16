import fetchRosters from "./fetchRosters";

export default async function fetchRoster(id: string) {
    const roster = (await fetchRosters()).find((roster) => roster.id === id);
    if (!roster) {
        throw new Error(`Roster ${id} not found`);
    }
    return roster;
}