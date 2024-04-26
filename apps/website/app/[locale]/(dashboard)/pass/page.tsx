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
        <div className="h-36 w-full flex flex-col bg-bronze-900/40 rounded-xl py-3 px-4 border-2 border-transparent hover:border-bronze-500 transition-all hover:scale-105 cursor-pointer">
          <h2 className="text-bronze-500 text-lg font-semibold">Community</h2>
          <ul className="text-white text-sm list-disc pl-4">
            <li>Vote on rounds in the community</li>
          </ul>
        </div>
        <div className="h-36 w-full flex flex-col bg-silver-900/40 rounded-xl py-3 px-4 border-2 border-transparent hover:border-silver-500 transition-all hover:scale-105 cursor-pointer">
          <h2 className=" text-silver-500 text-lg font-semibold">Supporter</h2>
          <ul className="text-white text-sm list-disc pl-4">
            <li>Get 3x the votes per round</li>
            <li>Unlock access to a private channel in our Discord</li>
          </ul>
        </div>
        <div className="h-36 w-full flex flex-col bg-gold-900/40 rounded-xl py-3 px-4 border-2 border-transparent hover:border-gold-500 transition-all hover:scale-105 cursor-pointer">
          <h2 className="text-gold-500 text-lg font-semibold">Superfan</h2>
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
