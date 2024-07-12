import { env } from "~/env";
import { unstable_cache as cache } from "next/cache";

export type Event = {
  id: string;
  status: string;
  htmlLink: string;
  location: string;
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
};

export const getEvents = cache(
  async () => {
    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/2gl6iku9kcb2qjdrtgdthgng3s@group.calendar.google.com/events?" +
        // @ts-ignore
        new URLSearchParams({
          singleEvents: "true",
          orderBy: "startTime",
          timeMin: new Date().toISOString(),
          maxResults: "3",
          key: env.GOOGLE_API_KEY,
        })
    );

    return (await response.json()).items as Event[];
  },
  ["events"],
  { revalidate: 60 * 10 }
);
