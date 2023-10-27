// import { db, projects } from "@/db/schema";
// import { cache } from "react";

// export default cache(async () => {
//   return db.select().from(projects).orderBy(projects.name);
// });

export default async function fetchProjects() {
  return [
    {
      id: "esports-island",
      name: "Esports Island",
      image: "/projects/esports-island.webp",
      url: "https://hyperfy.io/esports",
    },
    {
      id: "hub-inclusivo",
      name: "Hub Inclusivo",
      image: "/projects/hub-inclusivo.webp",
      url: "https://twitter.com/hubinclusivo",
    },
    {
      id: "noggles-cup",
      name: "Noggles Cup",
      image: "/projects/noggles-cup.webp",
      url: "https://discord.gg/nounsesports",
    },
    {
      id: "nounish-shop",
      name: "Nounish Shop",
      image: "/projects/nounish-shop.webp",
      url: "https://discord.gg/nounsesports",
    },
    {
      id: "prop-house",
      name: "Prop House",
      image: "/projects/prop-house.webp",
      url: "https://prop.house/nouns-esports",
    },
  ];
}
