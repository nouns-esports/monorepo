import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
	revalidatePath("/events/nounsvitational");
	return NextResponse.json({ revalidated: true });
}
