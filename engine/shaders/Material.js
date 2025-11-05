import { Program } from "../ogl/index.js";

class Material {
    constructor(gl, vert, frag, uniforms = {}) {
        this.program = new Program(gl, { 
            vertex: vert, 
            fragment: frag, 
            cullFace: gl.BACK,
            uniforms: uniforms
        });
    }
}

export default Material;