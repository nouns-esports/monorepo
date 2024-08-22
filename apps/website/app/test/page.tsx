import Link from "@/components/Link";
import { ToggleModal } from "@/components/Modal";
import { getRound } from "@/server/queries/rounds";
import { defaultProfileImage } from "@/utils/defaultProfileImage";
import { ChartBarHorizontal } from "phosphor-react-sc";
import { twMerge } from "tailwind-merge";

export default async function Test() {
  const round = await getRound({ id: "genesis-x" });
  return (
    <div className="flex flex-col gap-8 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      <h1 className="font-luckiest-guy text-white text-4xl">Markdown</h1>
      <div className="grid grid-cols-4 gap-4">
        {round?.proposals.map((proposal) => (
          <ProposalCard
            key={proposal.id}
            id={proposal.id.toString()}
            title={proposal.title}
            user={{
              id: proposal.user.id,
              image:
                proposal.user.image ?? defaultProfileImage(proposal.user.id),
              name: proposal.user.name,
            }}
            type="markdown"
            preview={proposal.image}
            description={proposal.description}
            content=""
            votes={0}
          />
        ))}
      </div>
      <h1 className="font-luckiest-guy text-white text-4xl">Image</h1>
      <div className="grid grid-cols-4 gap-4">
        {round?.proposals.map((proposal) => (
          <ProposalCard
            key={proposal.id}
            id={proposal.id.toString()}
            title={proposal.title}
            user={{
              id: proposal.user.id,
              image:
                proposal.user.image ?? defaultProfileImage(proposal.user.id),
              name: proposal.user.name,
            }}
            type="image"
            src={proposal.image}
            caption=""
            votes={0}
          />
        ))}
      </div>
      <h1 className="font-luckiest-guy text-white text-4xl">Video</h1>
      <div className="grid grid-cols-4 gap-4">
        {round?.proposals.map((proposal) => (
          <ProposalCard
            key={proposal.id}
            id={proposal.id.toString()}
            title={proposal.title}
            user={{
              id: proposal.user.id,
              image:
                proposal.user.image ?? defaultProfileImage(proposal.user.id),
              name: proposal.user.name,
            }}
            type="video"
            src={proposal.image}
            caption=""
            votes={0}
          />
        ))}
      </div>
    </div>
  );
}

function ProposalCard(
  props: {
    id: string;
    title: string;
    user: {
      id: string;
      image: string;
      name: string;
    };
    votes: number;
    className?: string;
  } & (
    | {
        type: "markdown";
        preview?: string;
        content: string;
        description?: string;
      }
    | { type: "video"; src: string; caption: string }
    | { type: "image"; src: string; caption: string }
  )
) {
  return (
    <ToggleModal
      key={props.id}
      id={`proposal-${props.id}`}
      value={props.id}
      className={twMerge(
        "flex flex-col gap-4 bg-grey-800 hover:bg-grey-600 transition-colors rounded-xl overflow-hidden aspect-square w-full h-full group p-4",
        props.type === "video" && "aspect-auto",
        props.className
      )}
    >
      {props.type === "markdown" && (
        <p className="text-white font-bebas-neue text-2xl line-clamp-2 flex-shrink-0 leading-[1.15] /h-[2lh]">
          {props.title}
        </p>
      )}

      {props.type === "markdown" && !props.preview ? (
        <div className="relative w-full h-full overflow-hidden">
          <p className="text-grey-200 h-full">{props.description}</p>
          <div
            className={twMerge(
              "absolute left-0 w-full group-hover:opacity-0 opacity-100 transition-opacity bg-gradient-to-t from-grey-800 to-transparent h-10 bottom-0 z-10"
            )}
          />
          <div
            className={twMerge(
              "absolute left-0 w-full group-hover:opacity-100 opacity-0 transition-opacity bg-gradient-to-t from-grey-600 to-transparent h-20 bottom-0 z-10"
            )}
          />
        </div>
      ) : (
        <img
          src={props.type === "markdown" ? props.preview : props.src}
          className={twMerge(
            "flex w-full h-full object-cover overflow-hidden rounded-xl",
            props.type === "video" && "aspect-video h-auto"
          )}
        />
      )}
      {/* <div className="bg-red h-full w-full flex" /> */}
      <div className="flex justify-between items-center flex-shrink-0">
        <Link href="" className="flex gap-2 items-center">
          <img src={props.user.image} className="h-6 w-6 rounded-full" />
          {props.user.name}
        </Link>
        <div className="text-grey-200 flex items-center gap-2">
          <ChartBarHorizontal
            className={twMerge("w-5 h-5 text-grey-200 -rotate-90")}
            weight="fill"
          />
          {props.votes}
        </div>
      </div>
    </ToggleModal>
  );
}
