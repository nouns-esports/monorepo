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

export type Calendar = {
  items: Array<Event>;
};

export default async function getSchedule() {
  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/2gl6iku9kcb2qjdrtgdthgng3s@group.calendar.google.com/events?" +
      new URLSearchParams({
        // q: "dota",
        singleEvents: "true",
        orderBy: "startTime",
        timeMin: new Date().toISOString(),
        maxResults: "10",
        key: import.meta.env.VITE_GOOGLE,
      })
  );
  const calendar: Calendar = await response.json();

  return calendar.items || [];
}
