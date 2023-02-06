import { createEffect, createSignal, onMount } from "solid-js";
import { scrollOffset, setScrollOffset } from "../App";
import { createStore } from "solid-js/store";
import resetCanvas from "../utils/resetCanvas";
import resizeCanvas from "../utils/resizeCanvas";

export default function Graphic() {
  let canvas: HTMLCanvasElement;

  const [isSmashLoaded, setIsSmashLoaded] = createSignal(false);
  const [isPokemonLoaded, setIsPokemonLoaded] = createSignal(false);

  const smash = new Image(518, 1362);
  smash.src = "smash-cropped.png";
  smash.onload = () => setIsSmashLoaded(true);

  const pokemon = new Image(3000, 1000);
  pokemon.src = "pokemon.png";
  pokemon.onload = () => setIsPokemonLoaded(true);

  function draw() {
    resetCanvas(canvas);

    const context = canvas.getContext("2d");
    const angle = 40 * (Math.PI / 180);
    const width = 300;
    const angledHeight = width / Math.cos(angle) / 1.25;
    const angledWidth = width / Math.sin(angle);
    const startX = canvas.width * 0.69;
    const rate = 1.75;

    if (isSmashLoaded()) {
      const points = {
        topLeft: { x: startX, y: 0 },
        topRight: { x: startX + width, y: -width / 2 },
        bottomRight: { x: startX + width, y: canvas.height },
        bottomCenter: {
          x: startX + width / 2,
          y: canvas.height,
        },
        bottomLeft: { x: startX, y: canvas.height },
      };

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
      context.drawImage(
        smash,
        points.topLeft.x - width / 8,
        -scrollOffset() * rate,
        (smash.width / smash.height) * (canvas.height + width / 2),
        canvas.height + width / 2
      );
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
      const points = {
        topLeft: {
          x: canvas.width + scrollOffset(),
          y: canvas.height / 4 - scrollOffset(),
        },
        topRight: {
          x: canvas.width + scrollOffset(),
          y: canvas.height / 4 + angledHeight - scrollOffset(),
        },
        bottomRight: {
          x: canvas.width / 1.5 + scrollOffset(),
          y: canvas.height - scrollOffset(),
        },
        bottomLeft: {
          x: canvas.width / 1.5 - angledWidth + scrollOffset(),
          y: canvas.height - scrollOffset(),
        },
      };

      context.save();
      context.beginPath();
      context.moveTo(points.topLeft.x, points.topLeft.y);
      context.lineTo(points.topRight.x, points.topRight.y);
      context.lineTo(points.bottomRight.x, points.bottomRight.y);
      context.arcTo(
        points.bottomRight.x,
        points.bottomRight.y,
        points.bottomLeft.x,
        points.bottomLeft.y,
        angledWidth / 2
      );

      context.lineTo(points.topLeft.x, points.topLeft.y);
      context.clip();

      context.drawImage(pokemon, points.bottomLeft.x - scrollOffset(), 0);
      context.restore();
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

  return <canvas ref={canvas} class="fixed max-lg:hidden" />;
}
