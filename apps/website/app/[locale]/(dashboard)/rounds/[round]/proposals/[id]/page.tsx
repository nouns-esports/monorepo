import Link from "@/components/Link";
import { ArrowLeft } from "phosphor-react-sc";

export default function Proposal(props: {
  params: { round: string; id: string };
}) {
  return (
    <div className="flex flex-col gap-4">
      <Link
        href={`/rounds/${props.params.round}`}
        className="text-red flex items-center gap-1"
      >
        <ArrowLeft className="w-5 h-5 text-red" />
        Back to {props.params.round}
      </Link>
      <h2 className="text-white font-luckiest-guy text-3xl">
        Dutch player Happymealz wants to represent top level Dutch Melee at GX!
      </h2>
      <p className="text-lightgrey">
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
    </div>
  );
}
