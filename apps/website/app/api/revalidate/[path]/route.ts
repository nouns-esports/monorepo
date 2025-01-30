import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(props: { params: Promise<{ path: string }> }) {
	const params = await props.params;
	revalidatePath(params.path);
	return NextResponse.json({ revalidated: true });
}
