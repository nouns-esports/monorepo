import { getAuthenticatedUser, getUser } from "@/server/queries/users";
import { notFound } from "next/navigation";

export default async function User(props: { params: { user: string } }) {
  const authenticatedUser = await getAuthenticatedUser();
  const user = await getUser({ id: props.params.user });

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-16 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      User {props.params.user}
    </div>
  );
}
