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
      className="w-full flex gap-4 bg-darkgrey border-grey/ border/ rounded-xl p-4 h-[9.25rem]"
    >
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            {/* <img
              src="/games/icons/smash-melee.png"
              className="w-7 h-7 rounded-full -mt-1"
            /> */}
            <h3 className="font-bebas-neue text-3xl text-white leading-none">
              Join our Smash roster at Collision!
            </h3>
          </div>
          <p className="h-full leading-tight text-ellipsis line-clamp-4">
            Nouns Esports invites you to join our Smash roster at Collision
            2024! Your travel, accommodation, and food expenses for attending
            Collision will be fully taken care of by Nouns Esports. Nouns
            Esports will provide you with a jersey and a care package of swag to
            represent Nouns at the event. We expect active participation in
            sharing our key event posts before, during, and after the event.
          </p>
        </div>
        <div className="w-0.5 bg-grey h-full" />
        <div className="flex flex-col gap-4 items-center px-4">
          <div className="flex flex-col gap-2 items-center">
            <p className="text-sm whitespace-nowrap">Proposing ends</p>
            <p className="text-white whitespace-nowrap">00:33:46</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <p className="text-sm whitespace-nowrap">Total prizes</p>
            <p className="text-white whitespace-nowrap">$1,000</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

// function RoundCard(props: { id: string }) {
//   return (
//     <Link
//       href={`/rounds/${props.id}`}
//       className="w-full flex gap-4 bg-darkgrey rounded-lg p-4 h-36"
//     >
//       <img
//         src="/games/smash-melee.webp"
//         className="w-52 h-full object-cover object-center rounded-lg"
//       />
//       <div className="h-full flex flex-col justify-center gap-2">
//         <div className="flex flex-col w-full h-full">
//           <div className="flex gap-4 justify-between items-center">
//             <h3 className="font-luckiest-guy/ font-bebas-neue text-white text-2xl">
//               Join our Smash roster at Collision!
//             </h3>
//             <div className="bg-green whitespace-nowrap text-xs text-white px-2 py-1.5 font-semibold rounded-lg w-min">
//               Proposing
//             </div>
//           </div>

//           <p className="text-lightgrey w-full overflow-hidden h-full text-ellipsis text-sm">
//             Nouns Esports invites you to join our Smash roster at Collision
//             2024! Your travel, accommodation, and food expenses for attending
//             Collision will be fully taken care of by Nouns Esports...
//           </p>
//         </div>
//         <div className="flex gap-4">
//           <div className="bg-red whitespace-nowrap text-xs text-white px-2 py-1.5 font-semibold rounded-lg w-min">
//             Smash Melee
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }
