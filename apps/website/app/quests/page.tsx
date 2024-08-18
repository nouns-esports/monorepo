import QuestCard from "@/components/QuestCard";
import { getQuests } from "@/server/queries/quests";

export default async function Quests() {
  const quests = await getQuests();

  return (
    <div className="flex flex-col gap-8 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      <h1 className="font-luckiest-guy text-white text-4xl">Quests</h1>
      <div className="grid grid-cols-6 gap-4">
        {quests.map((quest) => (
          <QuestCard
            key={quest.id}
            id={quest.id}
            name={quest.name}
            description={quest.description}
            image={quest.image}
            community={{
              id: quest.community.id,
              name: quest.community.name,
              image: quest.community.image,
            }}
          />
        ))}
      </div>
    </div>
  );
}
