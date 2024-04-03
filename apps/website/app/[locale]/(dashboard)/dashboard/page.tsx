export default async function Dashboard() {
  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-white font-luckiest-guy text-2xl">Active Rounds</h2>
        <div className="w-full h-20 bg-darkgrey rounded-lg"></div>
        <div className="w-full h-20 bg-darkgrey rounded-lg"></div>
        <div className="w-full h-20 bg-darkgrey rounded-lg"></div>
      </div>
      <h2 className="text-white font-luckiest-guy text-2xl">Feed</h2>
    </div>
  );
}
