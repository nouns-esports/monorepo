export type ScheduleEvent = {
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

export type Schedule = {
  items: Array<ScheduleEvent>;
};

export default async function getSchedule() {
  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/2gl6iku9kcb2qjdrtgdthgng3s@group.calendar.google.com/events?" +
      new URLSearchParams({
        singleEvents: "true",
        orderBy: "startTime",
        timeMin: new Date().toISOString(),
        maxResults: "5",
        key: import.meta.env.VITE_GOOGLE,
      })
  );
  const calendar: Schedule = await response.json();

  return calendar.items || [];
}
