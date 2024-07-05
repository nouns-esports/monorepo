import Link from "@/components/Link";
import { getChannel, getFeed } from "@/server/queries/channel";
import { isLinkImage } from "@/utils/isLinkImage";
import { ArrowFatDown, ArrowFatUp } from "phosphor-react-sc";

export default async function Channel(props: { params: { channel: string } }) {
  const channel = await getChannel({ channel: props.params.channel });

  const feed = await getFeed({ channel: props.params.channel });

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-4 bg-grey-800 rounded-xl p-6">
        <div className="flex gap-4 items-center">
          <img src={channel.image_url} className="rounded-full w-10 h-10" />
          <h1 className="text-white text-2xl font-luckiest-guy">
            {channel.name}
          </h1>
        </div>
        <p>{channel.description}</p>
      </div>
      <div className="flex flex-col gap-4">
        {await Promise.all([
          feed.map(async (cast) => {
            let image = "";

            for (const embed of cast.embeds) {
              if ("url" in embed && (await isLinkImage(embed.url))) {
                image = embed.url;
                break;
              }
            }

            return (
              <Link
                href={`/chat/${props.params.channel}/${cast.hash.substring(0, 10)}`}
                key={cast.hash}
                className="flex gap-4 bg-grey-800 rounded-xl px-4 pt-4 h-28"
              >
                <div className="flex flex-col items-center gap-2 h-full justify-center">
                  <ArrowFatUp
                    className="w-[18px] text-grey-500 hover:text-red transition-colors"
                    weight="fill"
                  />
                  {cast.reactions.likes_count}
                  <ArrowFatDown
                    className="w-[18px] text-grey-500 hover:text-red transition-colors mb-4"
                    weight="fill"
                  />
                </div>

                <div className="relative flex flex-col gap-2 w-full overflow-hidden">
                  <div className="flex gap-2 items-center">
                    <img
                      src={cast.author.pfp_url}
                      className="w-4 h-4 rounded-full"
                    />
                    <h2 className="text-white">{cast.author.display_name}</h2>
                  </div>
                  <p className="text-grey-200">{cast.text}</p>
                  <div className="absolute w-full bg-gradient-to-t from-grey-800 to-transparent h-10 bottom-0" />
                </div>
                {image ? (
                  <img
                    src={image}
                    className="h-[calc(100%_-_16px)] aspect-video rounded-lg object-cover object-center"
                  />
                ) : (
                  ""
                )}
              </Link>
            );
          }),
        ])}
      </div>
    </div>
  );
}
