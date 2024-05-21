import { notFound } from "next/navigation";
import { Tweet } from "react-tweet";
import { Metadata } from "next";
import { getPost, type Node } from "@/server/queries/posts";

export async function generateMetadata(props: { params: { id: string } }) {
  const post = await getPost({ id: props.params.id });

  if (!post) notFound();

  return {
    title: post.title,
    description: "",
    keywords: [post.title, post.slug],
    openGraph: {
      images: [post.image],
    },
    twitter: {
      images: [post.image],
    },
  } satisfies Metadata;
}

export default async function PostPage(props: { params: { id: string } }) {
  const post = await getPost({ id: props.params.id });

  if (!post) notFound();

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col p-16 items-center max-sm:p-8 gap-16 mt-24 justify-center w-full max-w-[1920px]">
        <img
          src={post.image}
          alt={post.title}
          className="brightness-75 object-cover w-full h-[25vw] max-h-[500px] rounded-xl overflow-hidden object-center"
        />
        <div className="flex flex-col gap-16 max-sm:gap-8 items-center max-w-4xl">
          <h1 className="text-white text-6xl max-lg:text-6xl max-md:text-5xl max-[500px]:text-4xl font-luckiest-guy">
            {post.title}
          </h1>
          <div className="flex flex-col items-center">
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

              .tweet-body_root__NEuOx {
                color: white;
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
                className="subscribe w-[480px] h-[45px] rounded-lg max-sm:w-full"
                src="https://paragraph.xyz/@nounsesports/embed?minimal=true"
              />
            </div>
          </div>
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
        // @ts-ignore
        const marks = node?.marks?.map((mark) => mark.type) ?? [];

        if (marks.length > 0) {
          const Tag = marks.includes("link") ? "a" : "span";

          return (
            <Tag
              style={{
                fontWeight: marks.includes("bold") ? "bold" : "normal",
                color: marks.includes("link") ? "rgb(233,55,55)" : "white",
              }}
              href={
                marks.includes("link") ? node.marks[0].attrs.href : undefined
              }
              target={marks.includes("link") ? "_blank" : undefined}
            >
              {node.text}
            </Tag>
          );
        }

        return <span>{node.text}</span>;
      }

      // Paragraph
      if (node.type === "paragraph") {
        return (
          <p className="text-xl mt-4 w-full">
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
            className="text-white font-luckiest-guy text-xl w-full"
          >
            <Render content={node.content} />
          </Tag>
        );
      }

      // Bullet List
      if (node.type === "bulletList") {
        return (
          <ul className="w-full list-disc mt-4">
            <Render content={node.content} />
          </ul>
        );
      }

      // List Item
      if (node.type === "listItem") {
        return (
          <li className="w-full">
            <Render content={node.content} />
          </li>
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
            className="max-w-xl w-full rounded-lg relative my-16"
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
          <div className="my-8 max-[450px]:scale-90">
            <Tweet id={node.attrs.tweetData.id_str} />
          </div>
        );
      }

      // Youtube
      if (node.type === "youtube") {
        return (
          <div className="my-8 w-full rounded-xl overflow-hidden">
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${node.attrs.videoId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      }
    });
  }
}
