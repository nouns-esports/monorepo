import { z } from "zod";
import { publicProcedure } from "@/trpc";
import { gql } from "@apollo/client";
import { arweave, arweaveClient } from "../clients/arweave";

const GetPublicationBySlug = gql`
  query GetParagraphPosts($slug: String!) {
    transactions(
      tags: [
        { name: "PublicationSlug", values: ["@nounsesports"] }
        { name: "PostSlug", values: [$slug] }
      ]
      sort: HEIGHT_DESC
      first: 1
    ) {
      edges {
        cursor
        node {
          id
          tags {
            name
            value
          }
        }
      }
    }
  }
`;

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

export type Node = {
  [key: string]: any;
  type: string;
  content: Node[];
};

export const getPost = publicProcedure
  .input(z.string())
  .query(async ({ input }) => {
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
      query: GetPublicationBySlug,
      variables: { slug: input },
    });

    if (data.transactions.edges.length === 0) {
      return null;
    }

    const transactionData = JSON.parse(
      (await arweave.transactions.getData(data.transactions.edges[0].node.id, {
        decode: true,
        string: true,
      })) as string
    );

    if (!transactionData.cover_img && !transactionData.cover_img_url) {
      return null;
    }

    return {
      id: transactionData.id,
      timestamp: transactionData.publishedAt,
      title: transactionData.title,
      slug: transactionData.slug,
      image:
        transactionData.cover_img?.img?.src ?? transactionData.cover_img_url,
      markdown: transactionData.markdown,
      json: JSON.parse(transactionData.json) as {
        content: Node[];
      },
    };
  });

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
