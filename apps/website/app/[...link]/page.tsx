import { getAuthenticatedUser } from "@/server/queries/users";
import { eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { db, links, snapshots } from "~/packages/db/schema";
import Button from "@/components/Button";
import notFound from "@/public/404/shrug.webp";
import Image from "next/image";

export default async function LinkRoute(props: {
  params: { link: string[] };
  searchParams: { capture?: boolean };
}) {
  noStore();

  const link = await db.query.links.findFirst({
    where: eq(links.id, props.params.link[0]),
  });

  if (link) {
    if (props.searchParams.capture) {
      const user = await getAuthenticatedUser();

      if (user) {
        await db.insert(snapshots).values({
          type: "link-capture",
          timestamp: new Date(),
          tag: link.id,
          user: user.id,
        });
      }
    }

    redirect(
      `${link.url}/${props.params.link.slice(1).join("/")}`,
      RedirectType.replace
    );
  }

  return (
    <div className="relative h-screen bg-[url(/404/stars.svg)] bg-repeat bg-[length:250px] flex flex-col gap-8 px-8 items-center justify-center">
      <Image
        src={notFound}
        alt="Page not found image"
        width={600}
        className="w-[600px] select-none"
        draggable={false}
      />
      <h1 className="font-luckiest-guy text-5xl max-md:text-4xl max-sm:text-3xl text-white text-center">
        Sorry, we couldn't find that page!
      </h1>
      <Button href="/">Home</Button>
      <div className="from-transparent to-black bg-gradient-to-b h-64 w-full bottom-0 absolute pointer-events-none" />
    </div>
  );
}
