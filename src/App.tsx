import { createSignal, onMount } from "solid-js";

import { Route, Routes } from "@solidjs/router";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Teams from "./pages/Teams";
import About from "./pages/About";
import MainLayout from "./layouts/MainLayout";
const [scrollOffset, setScrollOffset] = createSignal(0);
export { scrollOffset, setScrollOffset };

export default function App() {
  onMount(() => {
    document.addEventListener("scroll", () => {
      setScrollOffset(window.scrollY);
    });
  });

  return (
    <Routes>
      <Route path="/" component={MainLayout}>
        <Route path="/" component={Home} />
        <Route path="/teams" component={Teams} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/about" component={About} />
      </Route>
    </Routes>
  );
}
