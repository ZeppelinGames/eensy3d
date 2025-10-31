import Engine from './engine/Engine.js';
import MeshRenderer from './engine/components/MeshRenderer.js';
import BasicMat from './engine/shaders/BasicMat.js';
import GameObject from './engine/GameObject.js';
import Scene from './engine/Scene.js';

const engine = new Engine('canvas3d');

// Build a custom scene
const cube = new GameObject('Cube');
cube.transform.scale.set(1,1,1);

const material = new BasicMat(engine.gl);
cube.addComponent(new MeshRenderer(engine.gl, material));

engine.setScene(new Scene(engine.gl));
engine.scene.addToScene(cube.transform);

engine.onUpdate = (delta) => {
    cube.transform.rotation.x += 0.01 * delta;
    cube.transform.rotation.y += 0.01 * delta;
}

// Start everything
engine.start();
