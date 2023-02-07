import { createSignal, onMount } from "solid-js";
import Background from "./components/Background";
import Footer from "./components/Footer";
import Graphic from "./components/Graphic";
import Header from "./components/Header";
import { Route, Routes } from "@solidjs/router";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Teams from "./pages/Teams";
import About from "./pages/About";

const [scrollOffset, setScrollOffset] = createSignal(0);
export { scrollOffset, setScrollOffset };

export default function App() {
  onMount(() => {
    document.addEventListener("scroll", () => {
      setScrollOffset(window.scrollY);
    });
  });

  return (
    <div class="w-screen">
      <Background />
      <div class="overflow-x-hidden relative">
        <Header />
        <div class="w-full min-h-screen">
          <Routes>
            <Route path="/" component={Home} />
            <Route path="/teams" component={Teams} />
            <Route path="/schedule" component={Schedule} />
            <Route path="/about" component={About} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}
