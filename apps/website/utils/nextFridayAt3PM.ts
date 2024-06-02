export function nextFridayAt3PM() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilFriday = (5 - dayOfWeek + 7) % 7;
  let nextFriday = new Date(now);

  // Calculate the date of the next Friday
  nextFriday.setDate(now.getDate() + daysUntilFriday);

  // Set the time to 3 PM (15:00)
  nextFriday.setHours(15, 0, 0, 0);

  // If today is Friday and the current time is past 3 PM, get the next Friday
  if (dayOfWeek === 5 && now.getTime() > nextFriday.getTime()) {
    nextFriday.setDate(nextFriday.getDate() + 7);
  }

  return nextFriday;
}
