import { revalidatePath } from "next/cache";

export async function GET(
	request: Request,
	{ params }: { params: { path: string } },
) {
	revalidatePath(params.path);
	return Response.json({ revalidated: true });
}
