import { createEffect, createSignal, onMount } from "solid-js";
import resetCanvas from "../utils/resetCanvas";
import resizeCanvas from "../utils/resizeCanvas";

const [scrollOffset, setScrollOffset] = createSignal(0);

export default function Graphic() {
  let canvas: HTMLCanvasElement;

  const [isSmashLoaded, setIsSmashLoaded] = createSignal(false);
  const [isPokemonLoaded, setIsPokemonLoaded] = createSignal(false);

  const smash = new Image();
  smash.src = "smash.png";
  smash.onload = () => setIsSmashLoaded(true);

  const pokemon = new Image();
  pokemon.src = "pokemon.png";
  pokemon.onload = () => setIsPokemonLoaded(true);

  function draw() {
    resetCanvas(canvas);

    const context = canvas.getContext("2d");
    const alert = document.getElementById("alert");

    let offset = 0;

    if (alert) {
      if (scrollOffset() < alert.clientHeight) {
        offset = scrollOffset();
      } else {
        if (scrollOffset() - alert.clientHeight >= 0) {
          offset = alert.clientHeight;
        }
      }
    }

    if (context) {
      if (isSmashLoaded()) {
        context.save();
        context.beginPath();

        // Moves bottom point to the right
        context.moveTo(canvas.width / 2 + (scrollOffset() - offset) * 1.5, 0);
        context.lineTo(canvas.width, 0);
        context.lineTo(canvas.width, canvas.height);
        context.lineTo(canvas.width / 2 + (scrollOffset() - offset) * 1.5, 0);

        context.clip();
        context.drawImage(smash, -smash.width / 7.5, -smash.height / 10);
        context.restore();
      }

      if (isPokemonLoaded()) {
        context.save();
        context.beginPath();

        //  Moves bottom point to the right
        context.moveTo(
          canvas.width / 2 + (scrollOffset() - offset) * 1.5,
          canvas.height
        );
        context.lineTo(canvas.width, 0);
        context.lineTo(canvas.width, canvas.height);
        context.lineTo(
          canvas.width / 2 + (scrollOffset() - offset) * 1.5,
          canvas.height
        );

        context.clip();
        context.drawImage(pokemon, -smash.width / 11.5, -smash.height / 16);

        context.restore();
      }
    }
  }

  onMount(() => {
    resizeCanvas(canvas, draw);
    window.addEventListener("resize", () => resizeCanvas(canvas, draw));

    document.addEventListener("scroll", () => {
      setScrollOffset(window.scrollY);
    });
  });

  createEffect(draw);

  return (
    <canvas
      //@ts-ignore
      ref={canvas}
      class="fixed top-0 max-lg:hidden"
    />
  );
}
