import GameObject from "./GameObject.js";
import { Camera } from "./ogl/index.js";

class Scene {
    constructor(gl) {
        this.root = new GameObject("root");
        this.camera = new Camera(gl, { fov: 35 });
        this.camera.position.set(-10, 15, 10);
        this.camera.rotation.set(-Math.PI / 4,-Math.PI / 4,0);
    }

    start() {
        this.root.start();
    }

    update(t) {
        this.root.update(t);
    }

    addToScene(transform) {
        this.root.transform.addChild(transform);
    }
}

export default Scene;