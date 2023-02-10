import { Outlet } from "@solidjs/router";
import Background from "../components/Background";
import Footer from "../components/Footer";
import Graphic from "../components/Graphic";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div class="w-screen">
      <Background />
      <div class="overflow-x-hidden relative">
        <Header />
        <div class="w-full min-h-screen">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
