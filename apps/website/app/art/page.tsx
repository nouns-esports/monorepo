import Link from "@/components/Link";
import { getArt } from "@/server/queries/art";
import { twMerge } from "tailwind-merge";

export default async function Art() {
  const art = await getArt();

  return (
    <div className="flex flex-col gap-8 pt-48 max-xl:pt-32 max-sm:pt-24 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4 max-lg:flex-col">
      {/* <head>
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="https://nouns.gg/artwork/1.png"
        />
        <meta property="fc:frame:button:1" content="Next" />
        <meta property="fc:frame:button:2" content="View Round" />
        <meta property="fc:frame:button:2:action" content="post_redirect" />
        <meta
          property="fc:frame:post_url"
          content="https://nouns.gg/frames/artwork?n=1"
        />
      </head> */}
      <h1 className="text-white font-luckiest-guy text-4xl">Artwork</h1>
      <div className="grid grid-cols-4 grid-flow-dense gap-4">
        {art.map((piece) => (
          <Link
            href={`/art/${piece.id.substring(0, 10)}`}
            className={twMerge(
              "rounded-xl overflow-hidden",
              piece.shape === "wide" && "col-span-2"
            )}
          >
            <img
              key={piece.id}
              src={`https://ipfs.nouns.gg/ipfs/${piece.id}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
