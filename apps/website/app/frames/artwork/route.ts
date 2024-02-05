import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return new NextResponse(
    `
        <!DOCTYPE html>
        <html>
          <head>
            <meta property="fc:frame" content="vNext" />
            <meta
                property="fc:frame:image"
                content="https://nouns.gg/artwork/1.png"
            />
            <meta property="fc:frame:button:1" content="Next" />
            <meta property="fc:frame:button:2" content="View Round" />
            <meta property="fc:frame:button:2:action" content="post_redirect" />
            <meta
                property="fc:frame:post_url"
                content="https://nouns.gg/frames/artwork?n=1"
            />
            <script>
                window.location.href = "https://nouns.gg/art-contest/";
            </script>
          </head>
        </html>
        `,
    { status: 200, headers: { "content-type": "text/html" } }
  );
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  const button = data.untrustedData.buttonIndex;

  const n = Number(new URL(request.url).searchParams.get("n") as string);

  if (n === 1 && button === 1) {
    return new NextResponse(
      `
                        <!DOCTYPE html>
                        <html>
                          <head>
                                <meta property="fc:frame" content="vNext" />
                                <meta property="fc:frame:image" content="https://nouns.gg/artwork/2.png" />
                                <meta property="fc:frame:button:1" content="Back" />
                                <meta property="fc:frame:button:2" content="Next" />
                                <meta property="fc:frame:button:3" content="View Round" />
                                <meta property="fc:frame:button:3:action" content="post_redirect" />
                                <meta property="fc:frame:post_url" content="https://nouns.gg/frames/artwork?n=2" />
                          </head>
                        </html>
                        `,
      { status: 200, headers: { "content-type": "text/html" } }
    );
  }

  if (n === 1 && button === 2) {
    return NextResponse.redirect("https://nouns.gg/art-contest/", 302);
  }

  if (n === 2 && button === 1) {
    return new NextResponse(
      `
                        <!DOCTYPE html>
                        <html>
                          <head>
                                <meta property="fc:frame" content="vNext" />
                                <meta property="fc:frame:image" content="https://nouns.gg/artwork/1.png" />
                                <meta property="fc:frame:button:1" content="Next" />
                                <meta property="fc:frame:button:2" content="View Round" />
                                <meta property="fc:frame:button:2:action" content="post_redirect" />
                                <meta property="fc:frame:post_url" content="https://nouns.gg/frames/artwork?n=1" />
                          </head>
                        </html>
                        `,
      { status: 200, headers: { "content-type": "text/html" } }
    );
  }

  if (n === 6 && button === 2) {
    return new NextResponse(
      `
                        <!DOCTYPE html>
                        <html>
                          <head>
                                <meta property="fc:frame" content="vNext" />
                                <meta property="fc:frame:image" content="https://nouns.gg/artwork/7.png" />
                                <meta property="fc:frame:button:1" content="Back" />
                                <meta property="fc:frame:button:2" content="View Round" />
                                <meta property="fc:frame:button:2:action" content="post_redirect" />
                                <meta property="fc:frame:post_url" content="https://nouns.gg/frames/artwork?n=7" />
                          </head>
                        </html>
                        `,
      { status: 200, headers: { "content-type": "text/html" } }
    );
  }

  if (n === 7 && button === 1) {
    return new NextResponse(
      `
                        <!DOCTYPE html>
                        <html>
                          <head>
                                <meta property="fc:frame" content="vNext" />
                                <meta property="fc:frame:image" content="https://nouns.gg/artwork/6.png" />
                                <meta property="fc:frame:button:1" content="Back" />
                                <meta property="fc:frame:button:2" content="Next" />
                                <meta property="fc:frame:button:3" content="View Round" />
                                <meta property="fc:frame:button:3:action" content="post_redirect" />
                                <meta property="fc:frame:post_url" content="https://nouns.gg/frames/artwork?n=6" />
                          </head>
                        </html>
                        `,
      { status: 200, headers: { "content-type": "text/html" } }
    );
  }

  if (n === 7 && button === 2) {
    return NextResponse.redirect("https://nouns.gg/art-contest/", 302);
  }

  if (button === 3) {
    return NextResponse.redirect("https://nouns.gg/art-contest/", 302);
  }

  return new NextResponse(
    `
                      <!DOCTYPE html>
                      <html>
                        <head>
                              <meta property="fc:frame" content="vNext" />
                              <meta property="fc:frame:image" content="https://nouns.gg/artwork/${
                                button === 1 ? n - 1 : n + 1
                              }.png" />
                              <meta property="fc:frame:button:1" content="Back" />
                              <meta property="fc:frame:button:2" content="Next" />
                              <meta property="fc:frame:button:3" content="View Round" />
                            <meta property="fc:frame:button:3:action" content="post_redirect" />
                              <meta property="fc:frame:post_url" content="https://nouns.gg/frames/artwork?n=${
                                button === 1 ? n - 1 : n + 1
                              }" />
                        </head>
                      </html>
                      `,
    { status: 200, headers: { "content-type": "text/html" } }
  );
}
