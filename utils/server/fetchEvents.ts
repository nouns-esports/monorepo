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

export default async function fetchEvents() {
  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/2gl6iku9kcb2qjdrtgdthgng3s@group.calendar.google.com/events?" +
      // @ts-ignore
      new URLSearchParams({
        singleEvents: "true",
        orderBy: "startTime",
        timeMin: new Date().toISOString(),
        maxResults: "3",
        key: process.env.GOOGLE_CALENDAR,
      }),
    // Revalidate every 10 minutes
    { next: { revalidate: 600 } }
  );

  return (await response.json()).items as Event[];
}
