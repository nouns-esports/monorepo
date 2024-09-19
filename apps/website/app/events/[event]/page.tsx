import { getEvent } from "@/server/queries/events";
import { notFound } from "next/navigation";

export default async function EventPage(props: { params: { event: string } }) {
  const event = await getEvent({ id: props.params.event });

  if (!event) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-16 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      <img
        src={event.image}
        className="w-full aspect-[3/1] rounded-xl object-cover brightness-75"
      />
      {event.rounds.length > 0 && (
        <h2 className="text-white text-4xl font-luckiest-guy">Rounds</h2>
      )}
      {event.quests.length > 0 && (
        <h2 className="text-white text-4xl font-luckiest-guy">Quests</h2>
      )}
      <h2 className="text-white text-4xl font-luckiest-guy">Images</h2>
    </div>
  );
}
