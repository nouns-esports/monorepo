import { query } from "@/server/query";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Node } from "@/server/resolve/post";
import { Tweet } from "react-tweet";

export default async function PostPage(props: { params: { id: string } }) {
  const post = await query.post(props.params.id);

  if (!post) notFound();

  return (
    <div className="flex flex-col w-full">
      <div className="relative grid place-items-center h-[500px]">
        <Image
          src={post.image}
          fill
          sizes="100vw"
          alt={post.title}
          priority
          className="absolute top-0 -z-10 brightness-50 object-cover object-center"
        />
        <div className="w-full h-full grid place-items-center shadow-[inset_-60px_-60px_100px_black,inset_60px_60px_100px_black]">
          <h1 className="text-white text-6xl max-lg:text-6xl max-md:text-5xl max-[500px]:text-4xl font-luckiest-guy">
            {post.title}
          </h1>
        </div>
      </div>
      <div className="bg-black p-16 border-red max-lg:p-8 //gap-16 //max-lg:gap-8 flex flex-col items-center border-t-4 rounded-t-[4rem] max-lg:rounded-t-[2rem] transition-colors -mt-16 relative z-10">
        <Render content={post.json.content} />
        <style suppressHydrationWarning>
          {`
            .tweet-container_root__wzLwj {
              background-color: rgb(20,20,20);
              border-color: rgb(50,50,50);
            }

            .tweet-container_root__wzLwj:hover {
              background-color: rgb(30,30,30);
            }

            .tweet-container_root__wzLwj * {
              border-color: rgb(50,50,50);
            }

            .tweet-header_follow__L7l42 {
              color: rgb(233,55,55);
            }

            .tweet-body_root__NEuOx > a {
              color: rgb(233,55,55);
            }

            .tweet-replies_text__Ap4WV {
              color: rgb(233,55,55);
            }

            .tweet-replies_link__bBB0L:hover {
              background-color: rgb(50,50,50);
            }

            .subscribe > input {
              background-color: rgb(20,20,20);
            }

          `}
        </style>
        <div className="w-full flex items-center justify-center mt-16">
          <iframe
            className="subscribe"
            src="https://paragraph.xyz/@nounsesports/embed?minimal=true"
            width="480"
            height="45"
          />
        </div>
      </div>
    </div>
  );
}

function Render(props: { content: Node[] }) {
  if (props?.content?.length >= 0) {
    return props.content.map((node) => {
      // Text
      if (node.type === "text") {
        return <span>{node.text}</span>;
      }

      // Paragraph
      if (node.type === "paragraph") {
        return (
          <p className="text-lg mt-4">
            <Render content={node.content} />
          </p>
        );
      }

      // Heading
      if (node.type === "heading") {
        const Tag = `h${node.attrs.level}`;
        return (
          // @ts-ignore
          <Tag
            style={{
              fontSize: `${6 / node.attrs.level}rem`,
              marginTop: `${10 / node.attrs.level}rem`,
              marginBotton: `${5 / node.attrs.level}rem`,
            }}
            className="text-white font-luckiest-guy text-xl"
          >
            <Render content={node.content} />
          </Tag>
        );
      }

      // Image
      if (node.type === "image") {
        return (
          <img
            src={node.attrs.src}
            alt={node.attrs.alt}
            width={node.attrs?.nextwidth ?? undefined}
            height={node.attrs?.nextheight ?? undefined}
            className="max-w-lg rounded-lg relative my-16"
          />
        );
      }

      // Figure
      if (node.type === "figure") {
        return (
          <figure className="w-full flex items-center justify-center">
            <Render content={node.content} />
          </figure>
        );
      }

      // Twitter
      if (node.type === "twitter") {
        return (
          <div className="my-8">
            <Tweet id={node.attrs.tweetData.id_str} />
          </div>
        );
      }
    });
  }
}

{
  /* <blockquote class="twitter-tweet">
    <p lang="en" dir="ltr">At dawn from the gateway to Mars, the launch of Starship’s second flight test 
    <a href="https://t.co/ffKnsVKwG4">pic.twitter.com/ffKnsVKwG4</a></p>
    &mdash; 
    SpaceX (@SpaceX) 
    <a href="https://twitter.com/SpaceX/status/1732824684683784516?ref_src=twsrc%5Etfw">December 7, 2023</a>
  </blockquote> 
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8">
    
</script> */
}
