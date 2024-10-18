import { getAuthenticatedUser } from "@/server/queries/users";
import { eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";
import { notFound, redirect, RedirectType } from "next/navigation";
import { db, links, snapshots } from "~/packages/db/schema";

export default async function LinkRoute(props: {
  params: { link: string[] };
  searchParams: { capture?: boolean };
}) {
  noStore();

  const link = await db.query.links.findFirst({
    where: eq(links.id, props.params.link[0]),
  });

  if (link) {
    const url = new URL(link.url);

    if (props.searchParams.capture) {
      const user = await getAuthenticatedUser();

      if (user) {
        await db.insert(snapshots).values({
          type: "visit-link",
          timestamp: new Date(),
          tag: link.id,
          user: user.id,
        });
      }
    }

    redirect(
      `${url.origin}${url.pathname}${props.params.link.slice(1).join("/")}?${url.searchParams.toString()}`,
      RedirectType.replace
    );
  }

  return notFound();
}
