import Actor from './Actor.js';
import MeshRenderer from './components/MeshRenderer.js';
import { Program, Renderer } from './ogl/index.js';
import Scene from './Scene.js';
import BasicMat from './shaders/BasicMat.js';

const renderCanvas = document.getElementById("canvas3d");

// Create renderer
const renderer = new Renderer({ canvas: renderCanvas, width: 256, height: 256 });
const gl = renderer.gl;
gl.clearColor(0, 0, 0, 1);

const basicMat = new BasicMat(gl);

let scene = new Scene(gl);
let go = new Actor();
go.addComponent(new MeshRenderer(gl, basicMat));
go.transform.scale.set(3,1,3)

scene.addToScene(go.transform);

start();

function start() {
    // Handle resizing
    window.addEventListener('resize', handleResize, false);
    handleResize();

    loadScene(scene);

    // Start core loop
    requestAnimationFrame(update);
}

function update(t) {
    // Render world
    if (scene) {
        renderer.render({
            scene: scene.root.transform,
            camera: scene.camera
        });
    }

    requestAnimationFrame(update);
}


function loadScene(scene) {
    scene.start();
}

function handleResize() {
    if (scene && scene.camera) {
        scene.camera.perspective({
            aspect: gl.canvas.width / gl.canvas.height,
        });
    }
}