import { privyClient } from "@/server/clients/privy";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "~/env";

export const POST = async (req: NextRequest) => {
  const id = req.headers.get("svix-id") ?? "";
  const timestamp = req.headers.get("svix-timestamp") ?? "";
  const signature = req.headers.get("svix-signature") ?? "";

  const body = await req.json();

  try {
    const verifiedPayload = (await privyClient.verifyWebhook(
      body,
      { id, timestamp, signature },
      env.PRIVY_WEBHOOK_SIGNING_KEY
    )) as {
      type: "privy.test";
      message: string;
    };

    console.log(verifiedPayload);

    return NextResponse.json({ message: "ok" });
  } catch (e) {
    console.error(e);
  }

  return NextResponse.json({ message: "error" }, { status: 500 });
};
