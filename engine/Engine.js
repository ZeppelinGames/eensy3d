import { Renderer } from "./ogl/index.js";

class Engine {
    constructor(canvasId = 'canvas3d', options = {}) {
        const renderCanvas = document.getElementById(canvasId);

        this.renderer = new Renderer({
            canvas: renderCanvas,
            width: options.width || 256,
            height: options.height || 256,
        });

        this.gl = this.renderer.gl;
        this.gl.clearColor(0, 0, 0, 1);

        this._lastTime = 0;

        this.scene = null;
        this._running = false;

        this.onUpdate = null;

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

        this.renderer.render({
            scene: this.scene.root.transform,
            camera: this.scene.camera,
        });
        this._lastTime = t;

        requestAnimationFrame((t) => this.update(t));
    }

    handleResize() {
        if (this.scene?.camera) {
            const { width, height } = this.renderer.gl.canvas;
            this.scene.camera.perspective({
                aspect: width / height,
            });
        }
    }
}

export default Engine;
