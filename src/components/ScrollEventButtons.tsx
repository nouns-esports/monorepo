export default function ScrollEventButtons() {
  return (
    <div class="flex gap-4 max-md:gap-2">
      <img
        onClick={() => {
          const events = document.getElementById("upcoming-events");

          if (events) {
            events.scrollBy({ left: -375, behavior: "smooth" });
          }
        }}
        class="w-10 rotate-180 cursor-pointer select-none"
        src="/icons/arrow.svg"
        draggable={false}
      />
      <img
        onClick={() => {
          const events = document.getElementById("upcoming-events");

          if (events) {
            events.scrollBy({ left: 375, behavior: "smooth" });
          }
        }}
        class="w-10 cursor-pointer select-none"
        src="/icons/arrow.svg"
        draggable={false}
      />
    </div>
  );
}
