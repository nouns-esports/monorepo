import QuestCard from "@/components/QuestCard";
import { getEvent } from "@/server/queries/events";
import { notFound } from "next/navigation";

export default async function EventPage(props: { params: { event: string } }) {
  const event = await getEvent({ id: props.params.event });

  if (!event) {
    return notFound();
  }

  const now = new Date();

  return (
    <div className="flex flex-col gap-16 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      <div className="flex flex-col gap-6">
        <h1 className="text-white font-luckiest-guy text-5xl">{event.name}</h1>
        <img
          src={event.image}
          className="w-full aspect-[3/1] rounded-xl object-cover brightness-75"
        />
      </div>
      {event.rounds.length > 0 && (
        <h2 className="text-white text-4xl font-luckiest-guy">Rounds</h2>
      )}
      {event.quests.length > 0 && (
        <div className="flex flex-col gap-6">
          <h2 className="text-white text-4xl font-luckiest-guy">Quests</h2>
          <div className="grid grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[550px]:flex max-[550px]:overflow-x-scroll max-[550px]:scrollbar-hidden gap-4">
            {event.quests.map((quest) => (
              <QuestCard
                key={quest.id}
                id={quest.id}
                name={quest.name}
                description={quest.description}
                image={quest.image}
                start={quest.start ?? undefined}
                end={quest.end ?? undefined}
                community={{
                  id: quest.community.id,
                  name: quest.community.name,
                  image: quest.community.image,
                }}
                xp={quest.xp}
                completed={quest.completed?.length > 0 ? true : false}
                className="max-[550px]:w-64 max-[550px]:flex-shrink-0"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
