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

  const featuredEvent = season.events.find((event) => event.featured);

  const quests = await getQuests({ season: season.id.toString() });

  const now = new Date();

  const lastFriday = new Date(now.getDate() - (((now.getDay() + 2) % 7) + 1));
  const nextFriday = new Date(
    now.setDate(now.getDate() + ((7 - now.getDay()) % 7))
  );

  const newThisWeek = quests.filter(
    (quest) => new Date(quest.createdAt) > lastFriday
  );
  const thisSeason = quests.filter(
    (quest) => new Date(quest.createdAt) < lastFriday
  );

  return (
    <div className="flex flex-col h-full gap-8 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      {/* Do this inside the gallery section automatically generating for featured quests */}
      {featuredEvent && (
        <div className="relative w-full aspect-[3/1] rounded-xl overflow-hidden">
          <img
            src={featuredEvent.image}
            className="w-full h-full object-cover brightness-75"
          />
          <h2 className="absolute top-4 left-4 text-white text-4xl font-luckiest-guy">
            {featuredEvent.name}
          </h2>
          <div className="absolute bottom-4 left-4">
            <Button href={`/events/${featuredEvent.id}`}>View Event</Button>
          </div>
          {/* <div className="absolute z-50 flex flex-col gap-2 top-0 right-0 h-full w-80 p-4">
            <h2 className="font-bebas-neue text-white text-2xl">Quests</h2>
            <div className="w-full h-full bg-black/40 backdrop-blur-sm rounded-xl" />
            <div className="w-full h-full bg-black/40 backdrop-blur-sm  rounded-xl" />
            <div className="w-full h-full bg-black/40 backdrop-blur-sm rounded-xl" />
            <div className="w-full h-full bg-black/40 backdrop-blur-sm rounded-xl" />
          </div> */}
        </div>
      )}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between w-full">
          <h1 className="font-luckiest-guy text-white text-4xl">
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
        <div className="grid grid-cols-5 gap-4">
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
            />
          ))}
        </div>
      </div>
      {thisSeason.length > 0 && (
        <div className="flex flex-col gap-6">
          <h1 className="font-luckiest-guy text-white text-4xl">This season</h1>
          <div className="grid grid-cols-5 gap-4">
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
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
