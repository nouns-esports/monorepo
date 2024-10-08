import Button from "@/components/Button";
import Countdown from "@/components/Countdown";
import QuestCard from "@/components/QuestCard";
import { getCurrentEvent } from "@/server/queries/events";
import { getCurrentSeason } from "@/server/queries/season";
import { getAuthenticatedUser } from "@/server/queries/users";
import { getQuests } from "@/server/queries/quests";

export default async function Quests() {
  const [user, season] = await Promise.all([
    getAuthenticatedUser(),
    getCurrentSeason(),
  ]);

  if (!season) {
    throw new Error("No season found");
  }

  const now = new Date();

  const featuredEvent = season.events.find(
    (event) =>
      event.featured && new Date(event.start) < now && new Date(event.end) > now
  );

  const quests = await getQuests({
    season: season.id.toString(),
    user: user?.id,
  });

  const lastFriday = new Date();
  lastFriday.setDate(lastFriday.getDate() - ((lastFriday.getDay() + 2) % 7));
  lastFriday.setHours(0, 0, 0, 0);

  const nextFriday = new Date(lastFriday);
  nextFriday.setDate(nextFriday.getDate() + 7);

  const newThisWeek = quests.filter(
    (quest) => new Date(quest.createdAt) > lastFriday
  );
  const thisSeason = quests.filter(
    (quest) => new Date(quest.createdAt) < lastFriday
  );

  return (
    <div className="flex flex-col h-full gap-8 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      {featuredEvent && (
        <div className="relative w-full aspect-[3/1] max-sm:aspect-auto max-md:h-64 max-sm:h-48 rounded-xl overflow-hidden">
          <img
            src={featuredEvent.image}
            className="w-full h-full object-cover brightness-75"
          />
          <h2 className="absolute top-4 left-4 text-white text-4xl font-luckiest-guy max-md:text-3xl">
            {featuredEvent.name}
          </h2>
          <div className="absolute bottom-4 left-4">
            <Button href={`/events/${featuredEvent.id}`}>View Event</Button>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between w-full">
          <h1 className="font-luckiest-guy text-white text-3xl">
            New this week
          </h1>
          <div className="flex items-end flex-col gap-1">
            <h2 className="">Updates in</h2>
            <div className="flex items-center gap-2">
              <p className="text-white">
                <Countdown date={nextFriday} />
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[550px]:flex max-[550px]:overflow-x-scroll max-[550px]:scrollbar-hidden gap-4">
          {newThisWeek.map((quest) => (
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
              xp={quest.xp}
              completed={quest.completed?.length > 0 ? true : false}
              start={quest.start ?? undefined}
              end={quest.end ?? undefined}
              className="max-[550px]:w-64 max-[550px]:flex-shrink-0"
            />
          ))}
        </div>
      </div>
      {thisSeason.length > 0 && (
        <div className="flex flex-col gap-6">
          <h1 className="font-luckiest-guy text-white text-3xl">This season</h1>
          <div className="grid grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[550px]:flex max-[550px]:overflow-x-scroll max-[550px]:scrollbar-hidden gap-4">
            {thisSeason.map((quest) => (
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
                xp={quest.xp}
                completed={quest.completed?.length > 0 ? true : false}
                start={quest.start ?? undefined}
                end={quest.end ?? undefined}
                className="max-[550px]:w-64 max-[550px]:flex-shrink-0"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
