import Link from "@/components/Link";
import { ArrowLeft } from "phosphor-react-sc";

export default function Round(props: { params: { round: string } }) {
  return (
    <div className="flex flex-col gap-4">
      <Link href={"/rounds"} className="text-red flex items-center gap-1">
        <ArrowLeft className="w-5 h-5 text-red" />
        Back to rounds
      </Link>
      <img
        src="/games/smash-melee.webp"
        className="w-full rounded-lg h-48 object-cover object-center"
      />
      <h2 className="text-white font-luckiest-guy text-3xl">
        {props.params.round}
      </h2>
      <p className="text-lightgrey">
        Nouns Esports invites you to join our Smash roster at Collision 2024!
        Your travel, accommodation, and food expenses for attending Collision
        will be fully taken care of by Nouns Esports. Nouns Esports will provide
        you with a jersey and a care package of swag to represent Nouns at the
        event. We expect active participation in sharing our key event posts
        before, during, and after the event.
      </p>
      <div className="flex flex-col gap-4">
        <h3 className="text-white font-luckiest-guy text-2xl">Proposals</h3>
        <div className="flex flex-col gap-4">
          <ProposalCard round={props.params.round} proposal="happymealz" />
          <ProposalCard round={props.params.round} proposal="happymealz" />
          <ProposalCard round={props.params.round} proposal="happymealz" />
        </div>
      </div>
    </div>
  );
}

function ProposalCard(props: { round: string; proposal: string }) {
  return (
    <Link
      href={`/rounds/${props.round}/proposals/${props.proposal}`}
      className="w-full flex flex-col gap-2 bg-darkgrey rounded-lg p-4 h-36"
    >
      <h4 className="text-2xl font-bebas-neue text-white">
        Dutch player Happymealz wants to represent top level Dutch Melee at GX!
      </h4>
      <p className="text-lightgrey w-full overflow-hidden h-full text-ellipsis">
        Happymealz wants to put the Netherlands on the map and show what Dutch
        Melee is made of! Skill, art and that EU charm {"<"}3 A little
        backstory: as an 18 year old kid, when I had only been playing for about
        a year and wasn't even ranked in my country yet, I knew I wanted to
        experience competing at an American super major. I worked for half a
        year and gathered the money to travel to Genesis 5. Travelling there by
        myself was a great adventure and I'll never forget it. However, besides
        Plup complimenting me on my mid-shortens, I drowned in my first round of
        pools and vowed that I would return as a good player one day.
      </p>
    </Link>
  );
}
