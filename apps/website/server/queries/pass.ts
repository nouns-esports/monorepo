import { db, pass } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getPass = cache(
  async (input: { user: string }) => {
    return db.query.pass.findFirst({
      where: eq(pass.user, input.user),
    });
  },
  ["pass"],
  { tags: ["pass"], revalidate: 1 }
);

// const router = {
//   user: {
//     query: {
//       getUser: () => {},
//       getUsers: () => {},
//     },
//     mutate: {
//       setUser: () => {},
//       updateUser: () => {},
//     },
//   },
// };

// user is parent revalidation tag
// getUser and getUsers are child revalidation tags
// You can manually revalidate getUser or getUsers with the respective tags "user/getUser" and "user/getUsers"
// You can autmatically revalidate child queries with the tag "user"
