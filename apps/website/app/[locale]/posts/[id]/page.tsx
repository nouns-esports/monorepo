import { query } from "@/server/query";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { Tweet } from "react-tweet";
import PostViewer from "@/components/PostViewer";

export default async function PostPage(props: { params: { id: string } }) {
  const post = await query.post(props.params.id);

  if (!post) notFound();

  // console.log(post.json);

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
      <div className="bg-black p-16 border-red max-lg:p-8 gap-16 max-lg:gap-8 flex flex-col items-center border-t-4 rounded-t-[4rem] max-lg:rounded-t-[2rem] transition-colors -mt-16 relative z-10">
        {/* <MDXRemote
          source={post.markdown}
          components={{
            h2: (props) => (
              <h1 className="text-4xl font-luckiest-guy text-white">
                {props.children}
              </h1>
            ),
            p: (props) => (
              <p className="font-cabin text-xl">{props.children}</p>
            ),
            a: (props) => (
              <a
                href={props.href}
                className="text-white hover:underline transition-colors"
              />
            ),
          }}
        /> */}
        <PostViewer tiptap={JSON.parse(post.json)} />
      </div>
    </div>
  );
}
