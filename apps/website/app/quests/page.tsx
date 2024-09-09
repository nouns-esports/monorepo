import Button from "@/components/Button";
import QuestCard from "@/components/QuestCard";
import { getCurrentEvent } from "@/server/queries/events";
import { getWeeklyQuests, getSeasonQuests } from "@/server/queries/quests";
import { getCurrentSeason } from "@/server/queries/season";
import { getAuthenticatedUser } from "@/server/queries/users";

export default async function Quests() {
  const [user, season, event] = await Promise.all([
    getAuthenticatedUser(),
    getCurrentSeason(),
    getCurrentEvent(),
  ]);

  if (!season) {
    throw new Error("No season found");
  }

  const [weeklyQuests, seasonQuests] = await Promise.all([
    getWeeklyQuests({ user: user?.id }),
    getSeasonQuests({ season: season.id.toString(), user: user?.id }),
  ]);

  return (
    <div className="flex flex-col h-full gap-8 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      {event && (
        <div className="relative w-full aspect-[3/1] rounded-xl overflow-hidden">
          <img
            src="https://ipfs.nouns.gg/ipfs/QmSGYg5t25SQDp1xBw5tqDrfsF62T2HHVZpH4VduaAwJkT"
            className="w-full h-full object-cover brightness-75"
          />
          <h2 className="absolute top-4 left-4 text-white text-4xl font-luckiest-guy">
            Launch Event Name For Quests And Rankings
          </h2>
          <div className="absolute bottom-4 left-4">
            <Button href={`/quests/events/${season.id}`}>View Event</Button>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-6">
        <h1 className="font-luckiest-guy text-white text-4xl">Weekly</h1>
        <div className="grid grid-cols-5 gap-4">
          {weeklyQuests.map((quest) => (
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
              completed={!!quest.completed?.[0]?.id}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="font-luckiest-guy text-white text-4xl">Season</h1>
        <div className="grid grid-cols-5 gap-4">
          {seasonQuests.map((quest) => (
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
              completed={!!quest.completed?.[0]?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
