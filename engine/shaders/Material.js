import { engine } from "../Engine.js";
import { Program } from "../ogl/index.js";

class Material {
    constructor(vert, frag, uniforms = {}, options = {}) {
        this.uniforms = uniforms;
        this.program = new Program(engine.gl, {
            vertex: vert,
            fragment: frag,
            cullFace: engine.gl.BACK,
            uniforms:  this.uniforms,
            ...options
        });
    }

    setUniform(name, value) {
        if (this.uniforms[name]) this.uniforms[name].value = value;
    }
}

export default Material;