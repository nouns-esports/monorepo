import Button from "@/components/Button";
import { getUser } from "@/server/queries/users";
import { notFound } from "next/navigation";
import { Level } from "@/components/Level";

export default async function User(props: { params: { user: string } }) {
  const user = await getUser({ user: decodeURIComponent(props.params.user) });

  if (!user) {
    return notFound();
  }

  return (
    <>
      <div className="flex flex-col items-center gap-16 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
        <div className="max-w-2xl w-full">
          <div className="flex justify-between gap-6 p-6 w-full rounded-xl bg-grey-800">
            <div className="flex gap-4">
              <img
                src={user.image}
                className="w-12 h-12 rounded-full max-sm:w-12 max-sm:h-12"
              />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-white text-2xl leading-none font-luckiest-guy">
                    {user.name}
                  </h1>
                  {user.rank ? (
                    <img
                      src={user.rank.image}
                      className="h-6 w-6 object-contain"
                      title={user.rank.name}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <p>{user.bio}</p>
                <div className="w-64 max-sm:w-full">
                  <Level xp={user.xp} />
                </div>
              </div>
            </div>
            {user.farcaster ? (
              <div className="max-sm:hidden">
                <Button href={`https://warpcast.com/${user.farcaster}`} newTab>
                  View on Warpcast
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
