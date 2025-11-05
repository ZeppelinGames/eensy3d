import { Box, Mesh } from "../ogl/index.js";
import Component from "./Component.js";

class MeshRenderer extends Component {
    constructor(gl, material) {
        super();
        const cubeGeometry = new Box(gl);
        this.mesh = new Mesh(gl, { geometry: cubeGeometry, program: material.program })
    }

    GetComponent() {
        return this.mesh;
    }
}
export default MeshRenderer;