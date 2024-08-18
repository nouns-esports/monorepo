import { getQuest } from "@/server/queries/quests";

export default async function Quest(props: { params: { quest: string } }) {
  const quest = await getQuest({ id: props.params.quest });
  return (
    <div className="flex flex-col gap-16 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      Quest {props.params.quest}
    </div>
  );
}
