import { z } from "zod";
import { publicProcedure } from "../trpc";
import { gql } from "@apollo/client";
import { arweave, client } from "../arweave";

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

export const post = publicProcedure
  .input(z.string())
  .query(async ({ input }) => {
    const { data } = await client.query<{
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
      title: transactionData.title,
      slug: transactionData.slug,
      image:
        transactionData.cover_img?.img?.src ?? transactionData.cover_img_url,
      markdown: transactionData.markdown,
      json: transactionData.json,
    };
  });
