export default function resizeCanvas(
  canvas: HTMLCanvasElement,
  draw: Function
) {
  canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  canvas.height = window.screen.availHeight;

  draw();
}
