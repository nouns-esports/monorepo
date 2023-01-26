export default function resizeCanvas(
  canvas: HTMLCanvasElement,
  draw: Function
) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  draw();
}
