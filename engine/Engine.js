import EngineRenderer from "./rendering/Renderer.js";

class Engine {
    constructor() {
        this.renderer = new EngineRenderer();

        this.gl = this.renderer.renderer.gl;
        this.gl.clearColor(0, 0, 0, 1);

        this._lastTime = 0;

        this.scene = null;
        this._running = false;

        this.onUpdate = null;
        this.fps = 0;
        this.time = 0;

        window.addEventListener('resize', () => this.handleResize(), false);
    }

    setScene(scene) {
        this.scene = scene;
        if (scene.camera) this.handleResize();
    }

    start() {
        console.log('Engine started');

        this._running = true;
        requestAnimationFrame((t) => this.update(t));
    }

    update(t) {
        if (!this._running || !this.scene) return;

        const delta = t - (this._lastTime || t);
        if (this.onUpdate) {
            this.onUpdate(delta);
        }

        this.renderer.renderer.render({
            scene: this.scene.root.transform,
            camera: this.scene.camera,
        });
        this._lastTime = t;
        this.fps = 1 / (delta / 1000);
        this.time += delta;

        requestAnimationFrame((t) => this.update(t));
    }

    handleResize() {
        if (this.scene?.camera) {
            const { width, height } = this.gl.canvas;
            this.scene.camera.perspective({
                aspect: width / height,
            });
        }
    }
}

export const engine = new Engine();
