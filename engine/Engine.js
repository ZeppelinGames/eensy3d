import Actor from './Actor.js';
import MeshRenderer from './components/MeshRenderer.js';
import { Program, Renderer } from './ogl/index.js';
import Scene from './Scene.js';
import BasicMat from './shaders/BasicMat.js';

const renderCanvas = document.getElementById("renderCanvas");

// Create renderer
const renderer = new Renderer({ canvas: renderCanvas, width: 256, height: 256 });
const gl = renderer.gl;
gl.clearColor(0, 0, 0, 1);

const basicMat = new BasicMat(gl);

let scene = new Scene(gl);
let go = new Actor();
go.addComponent(new MeshRenderer(gl, basicMat));

let go2 = new Actor();
go2.addComponent(new MeshRenderer(gl, basicMat));

go.transform.addChild(go2.transform);
go2.transform.position.set(1,0,0);

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
        go.transform.rotation.x += 0.03;
        go.transform.rotation.y += 0.03;
    }

    requestAnimationFrame(update);
}


function loadScene(scene) {
    scene.start();
}

function handleResize() {
    // renderer.setSize(window.innerWidth, window.innerHeight);
    if (scene && scene.camera) {
        scene.camera.perspective({
            aspect: gl.canvas.width / gl.canvas.height,
        });
    }
}