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

    const width = 300;

    const rate = 1.5;

    if (isSmashLoaded()) {
      const startX = canvas.width * 0.69;

      const points = {
        topLeft: { x: startX, y: 0 },
        topRight: { x: startX + width, y: -width / 2 },
        bottomRight: { x: startX + width, y: canvas.height },
        bottomCenter: {
          x: startX + width / 2,
          y: canvas.height,
        },
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
      const angle = 50 * (Math.PI / 180);
      const startY = canvas.height / 6;
      const rate = 1.75;
      const points = {
        topLeft: {
          x: canvas.width,
          y: startY,
        },
        topRight: {
          x: canvas.width,
          y: startY + width / Math.sin(angle),
        },
        bottomRight: {
          x:
            canvas.width -
            width * Math.cos(angle) -
            (canvas.height - startY - width / Math.sin(angle)) /
              Math.cos(Math.PI / 2 - angle) +
            width * Math.cos(angle) -
            (width * Math.sin(angle)) / Math.tan(Math.PI / 2 - angle),
          y: canvas.height + width * Math.sin(angle),
        },
        bottomCenter: {
          x:
            canvas.width -
            width * Math.cos(angle) -
            (canvas.height - startY - width / Math.sin(angle)) /
              Math.cos(Math.PI / 2 - angle) +
            width * Math.cos(angle) -
            (width * Math.sin(angle)) / Math.tan(Math.PI / 2 - angle) -
            (width / 2) * Math.sin(angle),
          y:
            canvas.height +
            width * Math.sin(angle) -
            (width / 2) * Math.cos(angle),
        },
        bottomLeft: {
          x:
            canvas.width -
            width / Math.sin(Math.PI / 2 - angle) -
            (canvas.height - startY - width / Math.sin(angle)) /
              Math.cos(Math.PI / 2 - angle),
          y: canvas.height,
        },
      };

      context.save();
      context.beginPath();
      context.moveTo(
        points.topLeft.x + scrollOffset() * rate,
        points.topLeft.y - scrollOffset() * rate
      );
      context.lineTo(
        points.topRight.x + scrollOffset() * rate,
        points.topRight.y - scrollOffset() * rate
      );
      context.lineTo(
        points.bottomRight.x + scrollOffset() * rate,
        points.bottomRight.y - scrollOffset() * rate
      );
      context.arc(
        points.bottomCenter.x + 14.5 + scrollOffset() * rate,
        points.bottomCenter.y - 15.5 - scrollOffset() * rate,
        width / 2,
        0,
        2 * Math.PI
      );
      context.lineTo(
        points.bottomLeft.x + scrollOffset() * rate,
        points.bottomLeft.y - scrollOffset() * rate
      );
      context.lineTo(
        points.topLeft.x + scrollOffset() * rate,
        points.topLeft.y - scrollOffset() * rate
      );
      context.clip();

      context.drawImage(
        pokemon,
        points.bottomCenter.x - width / 2 - 250 + scrollOffset() * rate,
        points.bottomCenter.y -
          width / 2 -
          canvas.height -
          scrollOffset() * rate,
        pokemon.width * 1.25,
        pokemon.height * 1.25
      );
      context.restore();
      // context.save();
      // context.fillStyle = "red";

      // context.fillRect(0, 0, 100, 100);
      // context.beginPath();
      // context.moveTo(0, 0);
      // context.lineTo(100, 0);
      // context.lineTo(100, 100);
      // // context.lineTo(0, 100);
      // context.arcTo(50, 150, -1, 100, 50);
      // context.lineTo(0, 0);

      // context.arc(
      //   points.bottomCenter.x + scrollOffset(),
      //   points.bottomCenter.y - scrollOffset(),
      //   width / 2,
      //   0,
      //   2 * Math.PI
      //   // (3 * Math.PI) / 2 - angle,
      //   // Math.PI / 2 - angle
      // );

      // context.fill();
      // context.restore();
    }
  }

  onMount(() => {
    resizeCanvas(canvas, draw);
    window.addEventListener("resize", () => resizeCanvas(canvas, draw));

    draw();
  });

  createEffect(draw);

  return <canvas ref={canvas} class="fixed max-lg:hidden z-0" />;
}
