import { createEffect, createSignal, onMount } from "solid-js";
import { scrollOffset, setScrollOffset } from "../App";
import { createStore } from "solid-js/store";
import resetCanvas from "../utils/resetCanvas";
import resizeCanvas from "../utils/resizeCanvas";

export default function Graphic() {
  let canvas: HTMLCanvasElement;

  const [isSmashLoaded, setIsSmashLoaded] = createSignal(false);
  const [isPokemonLoaded, setIsPokemonLoaded] = createSignal(false);

  const smash = new Image(3000, 1000);
  smash.src = "smash.png";
  smash.onload = () => setIsSmashLoaded(true);

  const pokemon = new Image(3000, 1000);
  pokemon.src = "pokemon.png";
  pokemon.onload = () => setIsPokemonLoaded(true);

  function draw() {
    resetCanvas(canvas);

    const context = canvas.getContext("2d");
    const width = 300;
    const startX = canvas.width * 0.69;
    const rate = 1.75;

    const points = {
      topLeft: { x: startX, y: 0 },
      topCenter: { x: startX + width / 2, y: 0 },
      topRight: { x: startX + width, y: -width / 2 },
      bottomRight: { x: startX + width, y: canvas.height },
      bottomCenter: {
        x: startX + width / 2,
        y: canvas.height,
      },
      bottomLeft: { x: startX, y: canvas.height },
    };

    if (isSmashLoaded()) {
      context.save();
      context.beginPath();

      context.moveTo(
        points.topLeft.x,
        points.topLeft.y - scrollOffset() * rate
      );

      context.lineTo(
        points.topRight.x,
        points.topRight.y - scrollOffset() * rate
      );

      context.lineTo(
        points.bottomRight.x,
        points.bottomRight.y - scrollOffset() * rate
      );

      context.arc(
        points.bottomCenter.x,
        points.bottomCenter.y - scrollOffset() * rate,
        width / 2,
        0,
        Math.PI
      );

      context.lineTo(
        points.topLeft.x,
        points.topRight.y - scrollOffset() * rate
      );

      context.clip();
      context.drawImage(smash, -355, -scrollOffset() * rate);
      context.restore();

      const gradient = context.createLinearGradient(
        points.topLeft.x,
        points.topLeft.y - scrollOffset(),
        points.topLeft.x,
        300 - scrollOffset()
      );

      gradient.addColorStop(0, "#0f0f0f");
      gradient.addColorStop(1, "transparent");

      context.fillStyle = gradient;
      context.fillRect(
        points.topLeft.x,
        points.topLeft.y - scrollOffset(),
        width,
        300 - scrollOffset()
      );
    }

    if (isPokemonLoaded()) {
      //   context.drawImage(pokemon, canvas.width / 2, scrollOffset() * 1.5);
    }

    // context.globalCompositeOperation = "copy";
    // context.drawImage(canvas, 0, -scrollOffset());
    // // reset back to normal for subsequent operations.
    // context.globalCompositeOperation = "source-over";
  }

  onMount(() => {
    resizeCanvas(canvas, draw);
    window.addEventListener("resize", () => resizeCanvas(canvas, draw));

    draw();
  });

  createEffect(draw);

  return <canvas ref={canvas} class="fixed" />;
}

//   const width = window.innerWidth * 0.2;

// <>
//   <img
//     src="smash.png"
//     style={{
//       height: `${window.innerHeight + width}px`,
//       width: `${width}px`,
//       top: `-${scrollOffset() * 1.75 + width / 2}px`,
//     }}
//     class="fixed right-48 object-cover rounded-full"
//   />

//   <img
//     src="pokemon.png"
//     class="fixed rounded-full -rotate-45 object-cover"
//     style={{
//       right: `${scrollOffset() - width}px`,
//       top: `${window.innerHeight / 2 - width / 2 - scrollOffset()}px`,
//       width: `${window.innerHeight + width}px`,
//       height: `${width}px`,
//     }}
//   />
// </>
