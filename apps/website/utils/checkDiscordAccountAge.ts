export default function checkDiscordAccountAge(id: string) {
  const creationDate = new Date(Number((BigInt(id) >> 22n) + 1420070400000n));

  return (
    creationDate < new Date(new Date().setMonth(new Date().getMonth() - 3))
  );
}
