export function shortTimestamp(date: Date | string) {
  const timestamp = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - timestamp.getTime()) / 1000
  );

  // Less than a minute
  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  }

  // Less than an hour
  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) {
    return `${minutes}m`;
  }

  // Less than a day
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h`;
  }

  // Less than a week
  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days}d`;
  }

  // Less than a month (approximating month as 30 days)
  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return `${weeks}w`;
  }

  // Less than a year
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months}m`;
  }

  // Years
  const years = Math.floor(days / 365);
  return `${years}y`;
}
