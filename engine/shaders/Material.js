import { Program } from "../ogl/index.js";

class Material {
    constructor(gl, vert, frag) {
        this.program = new Program(gl, { 
            vertex: vert, 
            fragment: frag, 
            cullFace: gl.BACK 
        });
    }
}

export default Material;