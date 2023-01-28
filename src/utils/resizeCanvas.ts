export default function resizeCanvas(
  canvas: HTMLCanvasElement,
  draw: Function
) {
  canvas.width = window.screen.width;
  //   canvas.width = window.innerWidth;
  //   canvas.width = window.screen.availWidth;
  //   canvas.height = window.innerHeight;
  //   canvas.height = window.screen.availHeight;
  canvas.height = window.screen.height;

  draw();
}