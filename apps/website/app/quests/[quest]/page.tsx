import CheckQuest from "@/components/CheckQuest";
import Link from "@/components/Link";
import { getAction, getQuest } from "@/server/queries/quests";
import { getAuthenticatedUser } from "@/server/queries/users";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default async function Quest(props: { params: { quest: string } }) {
  const user = await getAuthenticatedUser();

  const quest = await getQuest({ id: props.params.quest, user: user?.id });

  if (!quest) {
    return notFound();
  }

  const actions = await Promise.all(
    quest.actions.map((id, index) =>
      getAction({
        quest: quest.id,
        action: index,
        user: user?.id ?? "",
      })
    )
  );

  const completedQuests = quest.completed?.[0]
    ? (Array(actions.length).fill(true) as Array<boolean>)
    : await Promise.all(
        actions.map(async (action) => {
          if (!action) throw new Error("Action not found");

          return user ? await action.check(user, quest.actionInputs) : false;
        })
      );

  const completedCount = completedQuests.filter(
    (completed) => completed
  ).length;

  const claimed = quest.completed?.[0] ? true : false;
  const completed = completedCount === actions.length;

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
                    {claimed
                      ? "Quest completed"
                      : completed
                        ? "All actions completed"
                        : "Complete all of the following"}
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-white">
                      Earns <Sparkles className="w-4 h-4 text-green" />
                      {quest.xp}00
                    </div>
                    <CheckQuest
                      quest={quest.id}
                      xp={quest.xp}
                      userXP={user?.nexus?.xp ?? 0}
                      completed={completed}
                      claimed={claimed}
                    />
                  </div>
                </div>
                <ul className={twMerge("flex flex-col gap-2")}>
                  {actions.map(async (action, index) => {
                    if (!action) throw new Error("Action not found");

                    return (
                      <li
                        key={`action-${index}`}
                        className={twMerge(
                          "relative bg-grey-600 rounded-xl p-3 flex justify-between items-center text-white group hover:bg-grey-500 transition-colors",
                          completedQuests[index] &&
                            "opacity-60 pointer-events-none"
                        )}
                      >
                        <Link
                          href={action.url}
                          newTab
                          className="absolute left-0 top-0 w-full h-full"
                        />
                        <div className="flex items-center gap-3">
                          {completedQuests[index] ? (
                            <div className="rounded-full bg-green w-7 h-7 flex items-center justify-center">
                              <Check className="w-5 h-5 text-black/50" />
                            </div>
                          ) : (
                            <div className="rounded-full bg-black/60 h-7 w-7 flex items-center justify-center text-sm">
                              {index + 1}
                            </div>
                          )}
                          {action.description}
                        </div>
                        <Link
                          href={action.help ?? "/discord"}
                          newTab
                          className="relative z-10 group-hover:opacity-100 opacity-0 text-red flex items-center mr-1 hover:text-red/70 transition-all"
                        >
                          Help?{" "}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
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
