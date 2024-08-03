import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(
    `
        <!DOCTYPE html>
        <html>
        <head>
                <meta property="fc:frame" content="vNext" />
                <meta property="fc:frame:image" content="https://nouns.gg/artwork/2.png" />
                <meta property="fc:frame:button:1" content="Shirts" />
                <meta property="fc:frame:button:2" content="Accessories" />
                <meta property="fc:frame:button:3" content="Website" />
                <meta property="fc:frame:button:3:action" content="post_redirect" />
                <meta property="fc:frame:post_url" content="https://nouns.gg/frames/shop?page=landing" />
        </head>
        </html>
    `,
    { status: 200, headers: { "content-type": "text/html" } }
  );
}

export async function POST(request: NextRequest, response: NextResponse) {
  const data = await request.json();

  const button = data.untrustedData.buttonIndex;

  const page = new URL(request.url).searchParams.get("page") as string;

  if (page === "landing") {
    if (button === 1) {
      return new NextResponse(
        `
                <!DOCTYPE html>
                <html>
                <head>
                        <meta property="fc:frame" content="vNext" />
                        <meta property="fc:frame:image" content="https://nouns.gg/artwork/2.png" />
                        <meta property="fc:frame:button:1" content="Shirts" />
                        <meta property="fc:frame:button:2" content="Accessories" />
                        <meta property="fc:frame:button:3" content="Website" />
                        <meta property="fc:frame:button:3:action" content="post_redirect" />
                        <meta property="fc:frame:post_url" content="https://nouns.gg/frames/shop?page=landing" />
                </head>
                </html>
            `,
        { status: 200, headers: { "content-type": "text/html" } }
      );
    }
  }
}
