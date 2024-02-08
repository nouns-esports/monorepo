import Arweave from "arweave";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

export const client = new ApolloClient({
  uri: "https://arweave.net/graphql",
  cache: new InMemoryCache(),
});
