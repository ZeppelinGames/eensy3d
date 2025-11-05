import Engine from './engine/Engine.js';
import MeshRenderer from './engine/components/MeshRenderer.js';
import BasicMat from './engine/shaders/BasicMat.js';
import GameObject from './engine/GameObject.js';
import Scene from './engine/Scene.js';
import { clearCanvas, drawTestPixel, drawText } from './engine/ui/Renderer.js';
import BaseColorMat from './engine/shaders/BaseColorMat.js';

const engine = new Engine('canvas3d');
const material = new BasicMat(engine.gl);
const colorMat = new BaseColorMat(engine.gl, [1.0, 0.0, 0.0]);

engine.setScene(new Scene(engine.gl));

const cubes = [];

const root = new GameObject('Root');
engine.scene.addToScene(root.transform);

const bigCubeSize = 3;
for (let x = -bigCubeSize; x <= bigCubeSize; x++) {
    for (let y = -bigCubeSize; y <= bigCubeSize; y++) {
        for (let z = -bigCubeSize; z <= bigCubeSize; z++) {
            const smallCube = new GameObject(`SmallCube {${x},${y},${z}}`);
            smallCube.transform.position.set(x, y, z);
            smallCube.transform.scale.set(0.3, 0.3, 0.3);

            const cMat = new BaseColorMat(engine.gl, [
                x / (bigCubeSize * 2) / 2.0 + 0.3,
                y / (bigCubeSize * 2) / 2.0 + 0.3,
                z / (bigCubeSize * 2) / 2.0 + 0.3
            ]);

            smallCube.addComponent(new MeshRenderer(engine.gl, cMat));

            smallCube.transform.setParent(root.transform);
            cubes.push(smallCube);
        }
    }
}

engine.onUpdate = (delta) => {
    clearCanvas();
    drawTestPixel(4, 4);
    drawText(engine.fps.toFixed(0), 8, 16);

    cubes.forEach(c => {
        c.transform.rotation.x += 0.003 * delta;
        c.transform.rotation.y += 0.003 * delta;
        const s = c.transform.position.x + c.transform.position.y + c.transform.position.z;
        const sc = 0.5 + 0.2 * Math.sin(engine.time * 0.01 + s) + 0.2 * Math.sin((0.01 * -engine.time) * 0.01 + s);
        c.transform.scale.set(sc, sc, sc);
    });
    // const rootS = 1 + 0.2 * Math.sin(engine.time * 0.01) + 0.2 * Math.sin((0.01 * -engine.time) * 0.01);
    // root.transform.scale.set(rootS, rootS, rootS);

    root.transform.rotation.x += 0.001 * delta;
    root.transform.rotation.y += 0.001 * delta;
}

// Start everything
engine.start();
