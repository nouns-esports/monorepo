import fetchTalents from "./fetchTalents";

export default async function fetchTalent(id: string) {
    const talent = (await fetchTalents()).find((talent) => talent.id === id);
    
    if (!talent) {
        throw new Error(`Talent ${id} not found`);
    }

    return talent;
}