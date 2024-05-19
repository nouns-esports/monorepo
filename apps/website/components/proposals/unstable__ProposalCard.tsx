import Link from "@/components/Link";
import { Proposal } from "@/db/schema";
import { twMerge } from "tailwind-merge";
import ImageCarousel from "./unstable__ImageCarousel";
import { getUser } from "@/server/queries/users";

export default async function ProposalCard(props: {
  proposal: Proposal;
  showUser?: boolean;
}) {
  let description = "";
  let images: string[] = [];

  function traverse(node: any) {
    for (const child of node.children) {
      if (description.length < 300 && child.type === "text") {
        description += `${child.text} `;
      }

      if (child.type === "image") {
        images.push(child.src);
      }

      if (child.children) traverse(child);
    }
  }
  traverse(JSON.parse(props.proposal.description));

  const user = await getUser({ id: props.proposal.user });

  return (
    <div className="relative flex flex-col gap-4">
      <Link
        href={`/rounds/${props.proposal.round}/proposals/${props.proposal.id}`}
        className={twMerge(
          "relative w-full flex gap-4 bg-grey-800 rounded-xl px-4 pt-4 h-36 overflow-hidden"
        )}
      >
        {images.length > 0 ? <ImageCarousel images={images} /> : ""}
        <div className="w-full flex flex-col gap-1">
          <h4 className="text-2xl font-bebas-neue text-white">
            {props.proposal.title}
          </h4>
          {props.showUser && user ? (
            <div className="flex gap-2 items-center hover:bg-grey-600 pl-1 py-0.5 pr-2 -ml-1 -mt-1 rounded-full w-fit">
              <img src={user.pfp} className="w-5 h-5 rounded-full" />
              <p className="text-white">{user.name}</p>
            </div>
          ) : (
            ""
          )}
          <div className="w-full overflow-hidden h-full">
            {props.proposal.description
              .replaceAll(/<[^>]*>/g, "")
              .slice(0, 500)}
          </div>
        </div>
      </Link>
    </div>
  );
}
