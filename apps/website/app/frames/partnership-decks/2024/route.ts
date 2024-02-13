import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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
                                <meta property="fc:frame:image" content="https://nouns.gg/partnership-decks/2024/2.webp" />
                                <meta property="fc:frame:button:1" content="Back" />
                                <meta property="fc:frame:button:2" content="Next" />
                                <meta property="fc:frame:button:3" content="Mint" />
                                <meta property="fc:frame:button:3:action" content="mint" />
                                <meta property="fc:frame:button:3:target" content="eip155:8453:0xc2edf80bdaf2f067640fb0f3bf695f3dc76b0cf7:1" />
                                <meta property="fc:frame:post_url" content="https://nouns.gg/frames/partnership-decks/2024?n=2" />
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
                                <meta property="fc:frame:image" content="https://nouns.gg/partnership-decks/2024/1.webp" />
                                <meta property="fc:frame:button:1" content="Next" />
                                <meta property="fc:frame:button:2" content="Mint" />
                                <meta property="fc:frame:button:2:action" content="mint" />
                                <meta property="fc:frame:button:2:target" content="eip155:8453:0xc2edf80bdaf2f067640fb0f3bf695f3dc76b0cf7:1" />
                                <meta property="fc:frame:post_url" content="https://nouns.gg/frames/partnership-decks/2024?n=1" />
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
                                <meta property="fc:frame:image" content="https://nouns.gg/partnership-decks/2024/16.webp" />
                                <meta property="fc:frame:button:1" content="Back" />
                                <meta property="fc:frame:button:2" content="Mint" />
                                <meta property="fc:frame:button:2:action" content="mint" />
                                <meta property="fc:frame:button:2:target" content="eip155:8453:0xc2edf80bdaf2f067640fb0f3bf695f3dc76b0cf7:1" />
                                <meta property="fc:frame:post_url" content="https://nouns.gg/frames/partnership-decks/2024?n=16" />
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
                                <meta property="fc:frame:image" content="https://nouns.gg/partnership-decks/2024/15.webp" />
                                <meta property="fc:frame:button:1" content="Back" />
                                <meta property="fc:frame:button:2" content="Next" />
                                <meta property="fc:frame:button:3" content="Mint" />
                                <meta property="fc:frame:button:3:action" content="mint" />
                                <meta property="fc:frame:button:3:target" content="eip155:8453:0xc2edf80bdaf2f067640fb0f3bf695f3dc76b0cf7:1" />
                                <meta property="fc:frame:post_url" content="https://nouns.gg/frames/partnership-decks/2024?n=15" />
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
                              }.webp" />
                              <meta property="fc:frame:button:1" content="Back" />
                              <meta property="fc:frame:button:2" content="Next" />
                              <meta property="fc:frame:button:3" content="Mint" />
                              <meta property="fc:frame:button:3:action" content="mint" />
                              <meta property="fc:frame:button:3:target" content="eip155:8453:0xc2edf80bdaf2f067640fb0f3bf695f3dc76b0cf7:1" />
                              <meta property="fc:frame:post_url" content="https://nouns.gg/frames/partnership-decks/2024?n=${n}" />
                        </head>
                      </html>
                      `,
    { status: 200, headers: { "content-type": "text/html" } }
  );
}
