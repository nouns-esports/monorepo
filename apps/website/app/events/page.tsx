import { getEvents } from "@/server/queries/events";

export default async function Events() {
  const events = await getEvents();

  return (
    <div className="flex flex-col gap-16 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      Events
    </div>
  );
}
