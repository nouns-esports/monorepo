export default function ArtworkPage() {
  return (
    <>
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
      </head>
    </>
  );
}
