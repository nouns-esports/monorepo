import Background from "./components/Background";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  return (
    <div class="w-[100vw]">
      <Background />
      <div class="overflow-x-hidden relative">
        <Header />
        <div class="w-full h-[100vh] flex items-center justify-center">
          <h1 class="text-white font-londrina text-6xl w-[500px] text-center cursor-default">
            Driving the intersection between{" "}
            <span class="text-red font-londrina">web3</span> and{" "}
            <span class="text-red font-londrina">gaming</span>.
          </h1>
        </div>
        <div class="h-[100vh]" />
        <Footer />
      </div>
    </div>
  );
}
