import Button from "@/components/Button";
import Link from "@/components/Link";
import { actions, getQuest } from "@/server/queries/quests";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function Quest(props: { params: { quest: string } }) {
  const quest = await getQuest({ id: props.params.quest });

  if (!quest) {
    return notFound();
  }

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
                    Complete the following
                  </h2>
                  <Button>Check</Button>
                </div>
                <ul className="flex flex-col gap-2">
                  {quest.actions.map((id, index) => {
                    const action = actions[id];

                    return (
                      <li
                        key={id}
                        className="bg-grey-600 rounded-xl p-3 flex gap-3 items-center"
                      >
                        <div className="rounded-full bg-black/60 h-8 w-8 text-white flex items-center justify-center">
                          {index + 1}
                        </div>

                        <p className="text-white">{action.name}</p>
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
