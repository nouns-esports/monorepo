import { publicProcedure } from "../clients/trpc";
import { arweave, arweaveClient } from "../clients/arweave";
import { gql } from "@apollo/client";

const GetAllPublications = gql`
  query GetParagraphPosts($limit: Int! = 3) {
    transactions(
      tags: [{ name: "PublicationSlug", values: ["@nounsesports"] }]
      sort: HEIGHT_DESC
      first: $limit
    ) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          block {
            timestamp
          }
          tags {
            name
            value
          }
        }
      }
    }
  }
`;

export const getPosts = publicProcedure.query(async () => {
  const seen: Record<string, boolean> = {};

  const { data } = await arweaveClient.query<{
    transactions: {
      edges: Array<{
        cursor: string;
        node: {
          id: string;
          tags: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
  }>({
    query: GetAllPublications,
    variables: { limit: 100 },
  });

  const posts = [];

  for (const edge of data.transactions.edges) {
    if (Object.keys(seen).length > 2) {
      return posts;
    }

    const transactionData = JSON.parse(
      (await arweave.transactions.getData(edge.node.id, {
        decode: true,
        string: true,
      })) as string
    );

    if (!transactionData.cover_img && !transactionData.cover_img_url) continue;

    if (seen[transactionData.slug]) continue;
    seen[transactionData.slug] = true;

    posts.push({
      id: transactionData.id,
      title: transactionData.title,
      slug: transactionData.slug,
      image:
        transactionData.cover_img?.img?.src ?? transactionData.cover_img_url,
    });
  }

  return posts;
});
