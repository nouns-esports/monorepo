import Link from "@/components/Link";

export default function Vote() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-white font-luckiest-guy text-3xl">Rounds</h2>
      <RoundCard id="collision" />
      <RoundCard id="collision" />
      <RoundCard id="collision" />
    </div>
  );
}

function RoundCard(props: { id: string }) {
  return (
    <Link
      href={`/rounds/${props.id}`}
      className="w-full flex gap-4 bg-darkgrey rounded-lg p-4 h-48"
    >
      <img
        src="/games/smash-melee.webp"
        className="w-72 h-full object-cover object-center rounded-lg"
      />
      <div className="h-full flex flex-col justify-center gap-2">
        <div className="flex gap-4 justify-between items-center w-full">
          <h3 className="font-luckiest-guy text-white text-2xl">
            Join our Smash roster at Collision!
          </h3>
          <div className="bg-red whitespace-nowrap text-xs text-white px-2 py-1.5 font-semibold rounded-lg w-min">
            Smash Melee
          </div>
        </div>

        <p className="text-lightgrey w-full overflow-hidden h-full text-ellipsis">
          Nouns Esports invites you to join our Smash roster at Collision 2024!
          Your travel, accommodation, and food expenses for attending Collision
          will be fully taken care of by Nouns Esports. Nouns Esports will
          provide you with a jersey and a care package of swag to represent
          Nouns at the event. We expect active participation in sharing our key
          event posts before, during, and after the event.
        </p>
        <div></div>
      </div>
    </Link>
  );
}
