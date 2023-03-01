import { createSignal } from "solid-js";

export default function MobileNav() {
  const [open, setOpen] = createSignal(false);

  return (
    <div class="max-sm:flex hidden">
      <img
        src="/icons/menu.svg"
        class="w-7 cursor-pointer"
        onClick={() => {
          const alert = document.getElementById("alert");

          if (alert) {
            alert.style.display = "none";
          }

          document.documentElement.style.overflowY = "hidden";

          setOpen(true);
        }}
      />
      <div
        style={{
          opacity: open() ? "1" : "0",
          "pointer-events": open() ? "auto" : "none",
        }}
        class="fixed flex flex-col transition-opacity duration-300 p-8 top-0 left-0 w-full h-screen backdrop-blur-xl z-50"
      >
        <div class="w-full flex justify-between items-center">
          <a
            href="/"
            draggable={false}
            class="flex gap-4 group items-center cursor-pointer select-none"
          >
            <img
              src="/logo.svg"
              alt="Nouns Esports Logo"
              draggable={false}
              class="group-hover:rotate-[14deg] w-10 transition-transform duration-150 delay-0"
            />
            <p class="text-white font-luckiest-guy text-3xl select-none max-[300px]:hidden">
              Nouns
            </p>
          </a>
          <img
            src="/icons/close.svg"
            class="cursor-pointer"
            onClick={() => {
              document.documentElement.style.overflowY = "scroll";
              setOpen(false);
            }}
          />
        </div>
        <div class="w-full h-full flex flex-col items-center justify-center font-luckiest-guy text-white text-4xl">
          <a href="/teams" class="w-full flex items-center justify-center p-8">
            Teams
          </a>
          <a
            href="/schedule"
            class="w-full flex items-center justify-center p-8"
          >
            Schedule
          </a>
          <a href="/about" class="w-full flex items-center justify-center p-8">
            About
          </a>
        </div>
      </div>
    </div>
  );
}
