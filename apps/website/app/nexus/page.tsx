import { getAuthenticatedUser } from "@/server/queries/users";
import { getUserAwards } from "@/server/queries/awards";
import { notFound } from "next/navigation";
import { defaultProfileImage } from "@/utils/defaultProfileImage";
import Button from "@/components/Button";

export default async function NexusPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    notFound();
  }

  const awards = user ? await getUserAwards({ user: user.id }) : undefined;

  return (
    <div className="flex flex-col gap-16 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={user.image ?? defaultProfileImage(user.id)}
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-3xl font-luckiest-guy text-white">
              {user.name}
            </h1>
          </div>
          {/* Eventually turn into view profile and edit on that page /profile and /profile/$user */}
          <Button href={`/users/${user.id}`}>View Profile</Button>
        </div>
        <div className="flex h-96 w-full gap-4">
          <div className="h-full bg-grey-800 aspect-video rounded-xl flex items-center justify-center">
            Rank
          </div>
          <div className="h-full bg-grey-800 w-full rounded-xl flex items-center justify-center">
            Leaderboard
          </div>
          <div className="h-full bg-grey-800 w-full rounded-xl flex items-center justify-center">
            Stats
          </div>
        </div>
      </div>
      {/* <div>
        <h2 className="text-3xl font-luckiest-guy text-white">Tabs</h2>
        <div className="flex w-full items-center"></div>
      </div> */}
      {/* <div id="quests" className="flex flex-col gap-8">
        <h2 className="text-3xl font-luckiest-guy text-white">Quests</h2>
        <div className="grid grid-cols-6 gap-4">
          {new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="rounded-xl h-80 bg-grey-800 flex items-center justify-center"
            >
              Quest {index + 1}
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
