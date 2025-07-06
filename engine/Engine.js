import Actor from './Actor.js';
import MeshRenderer from './components/MeshRenderer.js';
import { Program, Renderer } from './ogl/index.js';
import Scene from './Scene.js';

const renderCanvas = document.getElementById("renderCanvas");

// Create renderer
const renderer = new Renderer({ canvas: renderCanvas, width: 256, height: 256 });
const gl = renderer.gl;
gl.clearColor(0, 0, 0, 1);

const vertex = /* glsl */ `
                attribute vec3 position;
                attribute vec3 normal;

                uniform mat4 modelViewMatrix;
                uniform mat4 projectionMatrix;
                uniform mat3 normalMatrix;

                varying vec3 vNormal;

                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `;

const fragment = /* glsl */ `
                precision highp float;

                varying vec3 vNormal;

                void main() {
                    vec3 normal = normalize(vNormal);
                    float lighting = dot(normal, normalize(vec3(-0.3, 0.8, 0.6)));
                    gl_FragColor.rgb = vec3(0.2, 0.8, 1.0) + lighting * 0.1;
                    gl_FragColor.a = 1.0;
                }
            `;
const program = new Program(gl, {
    vertex,
    fragment,
    cullFace: gl.BACK,
});

let scene = new Scene(gl);
let go = new Actor();
go.addComponent(new MeshRenderer(gl, program));
scene.root.transform.addChild(go.transform);

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