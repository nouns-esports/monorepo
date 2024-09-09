import { getEventQuests } from "@/server/queries/events";

export default async function EventPage(props: { params: { event: string } }) {
  const quests = await getEventQuests({ event: props.params.event });
  return <div>Event Page</div>;
}
