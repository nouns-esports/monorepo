import { getAuthenticatedUser } from "@/server/queries/users";
import { redirect, RedirectType } from "next/navigation";

export default async function AdminPage() {
	const user = await getAuthenticatedUser();

	if (!user?.nexus?.admin) {
		redirect("/", RedirectType.replace);
	}

	return <div>Admin</div>;
}
