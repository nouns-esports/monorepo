import EventCard from "@/components/EventCard";
import { getEvents } from "@/server/queries/events";

export default async function Events() {
  const events = await getEvents();

  const happeningNow = events.filter(
    (event) =>
      new Date(event.start) < new Date() && new Date(event.end) > new Date()
  );
  const upcoming = events.filter((event) => new Date(event.start) > new Date());
  const ended = events.filter((event) => new Date(event.end) < new Date());

  return (
    <div className="flex flex-col gap-8 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      <h1 className="font-luckiest-guy text-white text-4xl">Events</h1>
      {happeningNow.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-white font-luckiest-guy text-3xl">
            Happening Now
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {happeningNow.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                name={event.name}
                image={event.image}
                start={event.start}
                end={event.end}
              />
            ))}
          </div>
        </div>
      )}
      {upcoming.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-white font-luckiest-guy text-3xl">Upcoming</h2>
          <div className="grid grid-cols-3 gap-4">
            {upcoming.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                name={event.name}
                image={event.image}
                start={event.start}
                end={event.end}
              />
            ))}
          </div>
        </div>
      )}
      {ended.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-white font-luckiest-guy text-3xl">Ended</h2>
          <div className="grid grid-cols-3 gap-4">
            {ended.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                name={event.name}
                image={event.image}
                start={event.start}
                end={event.end}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
