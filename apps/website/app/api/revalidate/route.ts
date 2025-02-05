import { revalidatePath } from "next/cache";

export async function GET(
	request: Request,
	{ searchParams }: { searchParams: Promise<{ path: string }> },
) {
	revalidatePath((await searchParams).path);
	return Response.json({ revalidated: true });
}
