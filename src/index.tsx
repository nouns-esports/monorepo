/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { Router } from "@solidjs/router";

render(
  () => (
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  ),
  document.getElementById("root") as HTMLElement
);
