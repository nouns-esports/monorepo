/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

render(
  () => (
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>
  ),
  document.getElementById("root") as HTMLElement
);
