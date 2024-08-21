import CheckQuest from "@/components/CheckQuest";
import Link from "@/components/Link";
import { getAction, getQuest } from "@/server/queries/quests";
import { getAuthenticatedUser } from "@/server/queries/users";
import { ArrowLeft, Check } from "lucide-react";
import { notFound } from "next/navigation";

export default async function Quest(props: { params: { quest: string } }) {
  const [quest, user] = await Promise.all([
    getQuest({ id: props.params.quest }),
    getAuthenticatedUser(),
  ]);

  if (!quest) {
    return notFound();
  }

  const actions = await Promise.all(
    quest.actions.map((id, index) =>
      getAction({
        quest: quest.id,
        action: quest.actions[index],
        user: user?.id ?? "",
      })
    )
  );

  const completed = quest.completed?.[0]
    ? (Array(actions.length).fill(true) as Array<boolean>)
    : await Promise.all(
        actions.map(async (action) => {
          if (!action) throw new Error("Action not found");

          return user ? await action.check(user, quest.actionInputs) : false;
        })
      );

  const allCompleted = completed.every((completed) => completed);

  return (
    <div className="relative flex justify-center gap-16 w-full pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      <div className="flex flex-col gap-4 w-full max-w-3xl">
        <Link href="/quests" className="text-red flex items-center gap-1 group">
          <ArrowLeft className="w-5 h-5 text-red group-hover:-translate-x-1 transition-transform" />
          Back to quests
        </Link>
        <div className="flex flex-col gap-4">
          <div className="bg-grey-800 rounded-xl overflow-hidden">
            <img
              src={quest.image}
              className="w-full h-48 object-cover object-center max-sm:h-32"
            />
            <div className="flex flex-col gap-8 p-4">
              <div className="flex flex-col gap-2">
                <h1 className="w-full text-white font-luckiest-guy text-3xl">
                  {quest.name}
                </h1>
                <div className="flex flex-col gap-2">
                  {quest.description}
                  {/* <Markdown markdown={round.content} readOnly /> */}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-bebas-neue text-white text-2xl">
                    {allCompleted
                      ? "All actions completed"
                      : "Complete the following"}
                  </h2>
                  <CheckQuest
                    completed={allCompleted}
                    claimed={!!quest.completed?.[0]}
                  />
                </div>
                <ul className="flex flex-col gap-2">
                  {actions.map(async (action, index) => {
                    if (!action) throw new Error("Action not found");

                    return (
                      <li
                        key={`action-${index}`}
                        className="bg-grey-600 rounded-xl p-3 flex gap-3 items-center text-white"
                      >
                        {completed[index] ? (
                          <div className="rounded-full bg-green w-7 h-7 flex items-center justify-center">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                        ) : (
                          <div className="rounded-full bg-black/60 h-7 w-7 flex items-center justify-center text-sm">
                            {index + 1}
                          </div>
                        )}
                        {action.description}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
