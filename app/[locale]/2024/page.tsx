import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Nouns Esports 2024",
  description: "",
  metadataBase: new URL("https://nouns.gg"),
  openGraph: {
    type: "website",
    images: ["/2024.png"],
  },
  twitter: {
    site: "@NounsEsports",
    card: "summary_large_image",
    images: ["/2024.png"],
  },
} satisfies Metadata;

export default function Page() {
    redirect("https://nouns.wtf/vote/466")
    // return <div>Test</div>
}