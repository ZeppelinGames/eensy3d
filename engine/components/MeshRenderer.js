import { engine } from "../Engine.js";
import { Box, Mesh } from "../ogl/index.js";
import Component from "./Component.js";

class MeshRenderer extends Component {
    constructor(material) {
        super();
        const cubeGeometry = new Box(engine.gl);
        this.mesh = new Mesh(engine.gl, { geometry: cubeGeometry, program: material.program });
        this.material = material;
    }

    GetComponent() {
        return this.mesh;
    }
}
export default MeshRenderer;