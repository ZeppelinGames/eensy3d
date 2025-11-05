const RENDER_WIDTH = 256;
const RENDER_HEIGHT = 256;

const canvas = document.getElementById("canvas2d");
canvas.width = RENDER_WIDTH;
canvas.height = RENDER_HEIGHT;

const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;
ctx.textRendering = 'geometricPrecision';

export function drawTestPixel(x,y) {
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, 1, 1);
}

export function drawText(text, x, y, font = "8px ChunkySans", color = "white") {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
}

export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}