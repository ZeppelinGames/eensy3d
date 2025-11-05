import Material from "./Material.js";

class BaseColorMat extends Material {
    constructor(gl, color) {
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
                uniform vec3 uColor;

                void main() {
                    vec3 normal = normalize(vNormal);
                    float lighting = dot(normal, normalize(vec3(-0.3, 0.8, 0.6)));
                    gl_FragColor.rgb = uColor + lighting * 0.1;
                    gl_FragColor.a = 1.0;
                }
            `;

        const uniforms = {
            uColor: { value: color }
        };
        super(gl, vertex, fragment, uniforms);
    }
}

export default BaseColorMat;    