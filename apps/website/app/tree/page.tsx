// export default function Tree() {
//   return (
//     <div className="w-full h-screen flex flex-col items-center justify-center">
//       <div className="flex items-center">
//         <Node />
//         <Column>
//           <Row>
//             <Node />
//             <Node />
//           </Row>
//           <Row>
//             <Node />
//             <Node />
//             <Column>
//               <Row>
//                 <Node />
//               </Row>
//               <Row>
//                 <Node />
//               </Row>
//             </Column>
//           </Row>
//           <Row>
//             <Node />
//             <Column>
//               <Row>
//                 <Node />
//               </Row>
//               <Row>
//                 <Node />
//               </Row>
//             </Column>
//           </Row>
//           <Row>
//             <Node />
//             <Node />
//           </Row>
//         </Column>
//       </div>
//     </div>
//   );
// }

// function Node() {
//   return (
//     <>
//       <div className="w-8 h-2 bg-white" />
//       <img
//         src="https://ipfs.nouns.gg/ipfs/QmS654Bm585TcoJpF7DuL1FC7REb9ntxjJkmpWK2L6pEuZ"
//         className="w-16 h-16"
//       />
//     </>
//   );
// }

// function Column(props: { children: React.ReactNode | React.ReactNode[] }) {
//   return (
//     <>
//       <div className="w-8 h-2 bg-white" />
//       <div className="bg-white w-2 h-[calc(100%-56px)]" />
//       <div className="flex flex-col gap-8 h-full">{props.children}</div>
//     </>
//   );
// }

// function Row(props: { children: React.ReactNode }) {
//   return <div className="flex items-center">{props.children}</div>;
// }

import { achievements, type Achievement } from "@/server/queries/achievements";
import type { AuthenticatedUser } from "@/server/queries/users";
import { twMerge } from "tailwind-merge";

export default function Tree() {
  function render(achievement: Achievement): React.ReactNode {
    if (achievement.next) {
      if (Array.isArray(achievement.next)) {
        return (
          <>
            <Node achievement={achievement} />
            <Column>
              {achievement.next.map((a) => (
                <Row key={a.id}>{render(a)}</Row>
              ))}
            </Column>
          </>
        );
      }

      return (
        <>
          <Node achievement={achievement} />
          {render(achievement.next)}
        </>
      );
    }

    return <Node achievement={achievement} />;
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="flex items-center">{render(achievements)}</div>
    </div>
  );
}

function Node(props: { achievement: Achievement; user?: AuthenticatedUser }) {
  const completed = true;
  const claimed = false;

  return (
    <>
      {props.achievement.id !== "enter-nexus" ? (
        <div className="w-8 h-2 bg-white" />
      ) : null}
      <img
        src={props.achievement.image}
        draggable={false}
        className={twMerge(
          "w-32 h-32 rounded-md border-8 border-grey-200 grayscale select-none",
          completed && "grayscale-0 border-gold-500",
          completed && claimed && "opacity-50"
        )}
      />
    </>
  );
}

function Column(props: { children: React.ReactNode | React.ReactNode[] }) {
  return (
    <>
      <div className="w-8 h-2 bg-white" />
      <div className="bg-white w-2 h-[calc(100%-120px)]" />
      <div className="flex flex-col gap-8 h-full">{props.children}</div>
    </>
  );
}

function Row(props: { children: React.ReactNode }) {
  return <div className="flex items-center">{props.children}</div>;
}
