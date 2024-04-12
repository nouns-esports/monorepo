import { query } from "@/app/api/query/server";
import Button from "@/components/Button";
import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "phosphor-react-sc";

export default async function Round(props: { params: { round: string } }) {
  const round = await query.getRound({ id: props.params.round });

  if (!round) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <Link href={"/rounds"} className="text-red flex items-center gap-1">
        <ArrowLeft className="w-5 h-5 text-red" />
        Back to rounds
      </Link>
      <div className="flex flex-col gap-8">
        <div className="bg-darkgrey rounded-xl overflow-hidden">
          <img
            src={round.image}
            className="w-full h-48 object-cover object-center"
          />
          <div className="flex flex-col gap-2 p-4">
            <h2 className="text-white font-luckiest-guy text-3xl">
              {round.name}
            </h2>
            <p className="text-lightgrey">{round.description}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center w-full gap-4">
            <h3 className="text-white font-luckiest-guy text-2xl">Proposals</h3>
            <Button href={`/rounds/${props.params.round}/create`} animate="bg">
              Create
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <ProposalCard round={props.params.round} proposal="happymealz" />
            <ProposalCard round={props.params.round} proposal="happymealz" />
            <ProposalCard round={props.params.round} proposal="happymealz" />
          </div>
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
