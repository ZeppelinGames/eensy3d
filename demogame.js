import { engine } from './engine/Engine.js';
import MeshRenderer from './engine/components/MeshRenderer.js';
import GameObject from './engine/GameObject.js';
import Scene from './engine/Scene.js';
import BaseColorMat from './engine/shaders/BaseColorMat.js';
import { inputManager } from './engine/InputManager.js';

engine.setScene(new Scene(engine.gl));

const cubes = [];

const root = new GameObject('Root');
engine.scene.addToScene(root.transform);

const bigCubeSize = 3.0;
for (let x = -bigCubeSize; x <= bigCubeSize; x++) {
    for (let y = -bigCubeSize; y <= bigCubeSize; y++) {
        for (let z = -bigCubeSize; z <= bigCubeSize; z++) {
            const smallCube = new GameObject(`SmallCube {${x},${y},${z}}`);
            smallCube.transform.position.set(x, y, z);
            smallCube.transform.scale.set(0.3, 0.3, 0.3);

            const cubeMaterial = new BaseColorMat([
                (x + bigCubeSize) / (2 * bigCubeSize),
                (y + bigCubeSize) / (2 * bigCubeSize),
                (z + bigCubeSize) / (2 * bigCubeSize),
                1.0
            ]);
            smallCube.addComponent(new MeshRenderer(cubeMaterial));

            smallCube.transform.setParent(root.transform);
            cubes.push(smallCube);
        }
    }
}

let spinSpeed = 0.001;

inputManager.onKeyDown = (e) => {
    if (inputManager.keyStates['KeyP']) {
        engine.togglePause();
    }
}

engine.onUpdate = (delta) => {
    engine.renderer.clearCanvas();

    // Draw FPS
    engine.renderer.textRenderer.drawText(engine.fps.toFixed(0), 8, 16);

    // Text rendering test
    engine.renderer.textRenderer.drawText('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8, 24);
    engine.renderer.textRenderer.drawText('abcdefghijklmnopqrstuvwxyz', 8, 32);
    engine.renderer.textRenderer.drawText('0123456789', 8, 40);

    cubes.forEach(c => {
        c.transform.rotation.x += 0.003 * delta;
        c.transform.rotation.y += 0.003 * delta;
        const s = c.transform.position.x + c.transform.position.y + c.transform.position.z;
        const sc = 0.5 + 0.2 * Math.sin(engine.time * 0.01 + s) + 0.2 * Math.sin((0.01 * -engine.time) * 0.01 + s);
        c.transform.scale.set(sc, sc, sc);
    });

    root.transform.rotation.x += spinSpeed * delta;
    root.transform.rotation.y += spinSpeed * delta;
}
// Start everything
engine.start();


export default engine;