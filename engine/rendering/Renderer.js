import { Renderer } from "../ogl/index.js";
import TextRenderer from "./text/TextRenderer.js";

export default class EngineRenderer {
    static RENDER_WIDTH = 256;
    static RENDER_HEIGHT = 256;

    constructor() {
        // Inject styles
        // Read styles from CSS file
        fetch('./engine/rendering/style.css')
            .then(response => response.text())
            .then(css => {
                const style = document.createElement('style');
                style.innerHTML = css;
                document.head.appendChild(style);
            });

        //Setup 3D canvas
        this.canvasContainer = document.createElement("div");
        this.canvasContainer.id = "canvasContainer";
        document.body.appendChild(this.canvasContainer);

        this.canvasGroup = document.createElement("div");
        this.canvasGroup.id = "canvasGroup";
        this.canvasContainer.appendChild(this.canvasGroup);

        this.canvas3D = this.createCanvas("canvas3d");

        this.renderer = new Renderer({
            canvas: this.canvas3D,
            width: EngineRenderer.RENDER_WIDTH,
            height: EngineRenderer.RENDER_HEIGHT,
            attributes: { antialias: false },
        });

        this.textRenderer = new TextRenderer();

        // Setup 2D canvas
        this.canvas2D = this.createCanvas("canvas2d");
        this.ctx2D = this.canvas2D.getContext("2d", { antialias: false });

        this.ctx2D.imageSmoothingEnabled = false;
        this.ctx2D.textRendering = 'geometricPrecision';

    }
    drawTestPixel(x, y) {
        this.ctx2D.fillStyle = "white";
        this.ctx2D.fillRect(x, y, 1, 1);
    }

    drawText(text, x, y, font = "8pt ChunkySans", color = "white") {
        this.ctx2D.font = font;
        this.ctx2D.fillStyle = color;
        this.ctx2D.fillText(text, x, y);
    }

    clearCanvas() {
        this.ctx2D.clearRect(0, 0, this.canvas2D.width, this.canvas2D.height);
    }

    createCanvas(id) {
        const canvas = document.createElement("canvas");
        this.canvasGroup.appendChild(canvas);

        canvas.id = id;
        canvas.classList.add('renderCanvas');
        canvas.width = EngineRenderer.RENDER_WIDTH;
        canvas.height = EngineRenderer.RENDER_HEIGHT;

        return canvas;
    }
}

