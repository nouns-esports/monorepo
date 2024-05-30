export function nextFridayAt3PM() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilFriday = (5 - dayOfWeek + 7) % 7;
  const nextFriday = new Date(now);
  nextFriday.setDate(now.getDate() + daysUntilFriday);
  nextFriday.setHours(15, 0, 0, 0); // Set the time to 3 PM (15:00)

  return nextFriday;
}
