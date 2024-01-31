import { NextRequest, NextResponse } from "next/server";

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
                                <meta property="fc:frame:image" content="https://nouns.gg/partnership-decks/2024/2.png" />
                                <meta property="fc:frame:button:1" content="Back" />
                                <meta property="fc:frame:button:2" content="Next" />
                                <meta property="fc:frame:post_url" content="https://nouns.gg/api/frames/partnership-decks/2024?n=2" />
                          </head>
                        </html>
                        `,
      { status: 200, headers: { "content-type": "text/html" } }
    );
  }

  if (n === 2 && button === 1) {
    return new NextResponse(
      `
                        <!DOCTYPE html>
                        <html>
                          <head>
                                <meta property="fc:frame" content="vNext" />
                                <meta property="fc:frame:image" content="https://nouns.gg/partnership-decks/2024/1.png" />
                                <meta property="fc:frame:button:1" content="Next" />
                                <meta property="fc:frame:post_url" content="https://nouns.gg/api/frames/partnership-decks/2024?n=1" />
                          </head>
                        </html>
                        `,
      { status: 200, headers: { "content-type": "text/html" } }
    );
  }

  if (n === 15 && button === 2) {
    return new NextResponse(
      `
                        <!DOCTYPE html>
                        <html>
                          <head>
                                <meta property="fc:frame" content="vNext" />
                                <meta property="fc:frame:image" content="https://nouns.gg/partnership-decks/2024/16.png" />
                                <meta property="fc:frame:button:1" content="Back" />
                                <meta property="fc:frame:post_url" content="https://nouns.gg/api/frames/partnership-decks/2024?n=16" />
                          </head>
                        </html>
                        `,
      { status: 200, headers: { "content-type": "text/html" } }
    );
  }

  if (n === 16 && button === 1) {
    return new NextResponse(
      `
                        <!DOCTYPE html>
                        <html>
                          <head>
                                <meta property="fc:frame" content="vNext" />
                                <meta property="fc:frame:image" content="https://nouns.gg/partnership-decks/2024/15.png" />
                                <meta property="fc:frame:button:1" content="Back" />
                                <meta property="fc:frame:button:2" content="Next" />
                                <meta property="fc:frame:post_url" content="https://nouns.gg/api/frames/partnership-decks/2024?n=15" />
                          </head>
                        </html>
                        `,
      { status: 200, headers: { "content-type": "text/html" } }
    );
  }

  return new NextResponse(
    `
                      <!DOCTYPE html>
                      <html>
                        <head>
                              <meta property="fc:frame" content="vNext" />
                              <meta property="fc:frame:image" content="https://nouns.gg/partnership-decks/2024/${
                                button === 1 ? n - 1 : n + 1
                              }.png" />
                              <meta property="fc:frame:button:1" content="Back" />
                              <meta property="fc:frame:button:2" content="Next" />
                              <meta property="fc:frame:post_url" content="https://nouns.gg/api/frames/partnership-decks/2024?n=${
                                button === 1 ? n - 1 : n + 1
                              }" />
                        </head>
                      </html>
                      `,
    { status: 200, headers: { "content-type": "text/html" } }
  );
}
