export default function Pass() {
  return (
    <div className="w-full flex flex-col gap-8">
      <div>
        <h1 className="font-luckiest-guy text-white text-4xl">
          Become a pass member
        </h1>
        <img src="/eevee.png" className="h-40" />
      </div>
      <div className="w-full flex gap-4 justify-between">
        <div className="h-36 w-full flex flex-col bg-red/20 rounded-xl py-3 px-4 border-2 border-transparent hover:border-red transition-all hover:scale-105 cursor-pointer">
          <h2 className="text-red text-lg font-semibold">Community</h2>
          <ul className="text-white text-sm list-disc pl-4">
            <li>Vote on rounds in the community</li>
          </ul>
        </div>
        <div className="h-36 w-full flex flex-col bg-blue-500/20 rounded-xl py-3 px-4 border-2 border-transparent hover:border-blue-500 transition-all hover:scale-105 cursor-pointer">
          <h2 className="text-blue-500 text-lg font-semibold">Supporter</h2>
          <ul className="text-white text-sm list-disc pl-4">
            <li>Get 3x the votes per round</li>
            <li>Unlock access to a private channel in our Discord</li>
          </ul>
        </div>
        <div className="h-36 w-full flex flex-col bg-purple/20 rounded-xl py-3 px-4 border-2 border-transparent hover:border-purple transition-all hover:scale-105 cursor-pointer">
          <h2 className="text-purple text-lg font-semibold">Superfan</h2>
          <ul className="text-white text-sm list-disc pl-4">
            <li>Get 10x the votes per round</li>
            <li>Vote on NounsDAO proposals</li>
            <li>Recieve exclusive rewards</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
