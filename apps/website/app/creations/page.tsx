import Link from "@/components/Link";
import { getCreations } from "@/server/queries/creations";
import { twMerge } from "tailwind-merge";

export default async function Creations() {
  const creations = await getCreations();

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
      <h1 className="text-white font-luckiest-guy text-4xl">Creations</h1>
      <div className="grid grid-cols-4 grid-flow-dense gap-4">
        {creations.map((creation) => (
          <Link
            href={`/art/${creation.id.substring(0, 10)}`}
            className={twMerge(
              "rounded-xl overflow-hidden",
              creation.width / creation.height > 1.3 && "col-span-2"
            )}
          >
            <img
              key={creation.id}
              src={`https://ipfs.nouns.gg/ipfs/${creation.id}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
