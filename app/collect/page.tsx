import CollectionViewer from "@/components/CollectionViewer";
import fetchCollections from "@/utils/fetchCollections";

export default async function Collect() {
  const collections = await fetchCollections();

  return (
    <main className="mb-4">
      <CollectionViewer collections={collections} />
    </main>
  );
}
