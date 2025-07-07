import GameObject from "./GameObject.js";
import { Camera } from "./ogl/index.js";

class Scene {
    constructor(gl) {
        this.camera = new Camera(gl, { fov: 35 });
        this.camera.lookAt([0, 0, 0]);
        this.camera.position.set(0, 0, 10);
        this.root = new GameObject("root");
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