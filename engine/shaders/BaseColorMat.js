import Material from "./Material.js";

class BaseColorMat extends Material {
    static vertex = /* glsl */ `
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

    static fragment = /* glsl */ `
            precision highp float;

            varying vec3 vNormal;
            uniform vec4 uColor;

            void main() {
                vec3 normal = normalize(vNormal);
                float lighting = dot(normal, normalize(vec3(-0.3, 0.8, 0.6)));
                gl_FragColor.rgb = uColor.rgb + lighting * 0.1;
                gl_FragColor.a = uColor.a;
            }
        `;

    constructor(color) {
        let uColor = [1.0, 0.0, 1.0, 1.0]; // null pink
        if (color && Array.isArray(color) && color.length >= 3) {
            uColor = [
                color[0],
                color[1],
                color[2],
                color.length >= 4 ? color[3] : 1.0
            ];
        }
        const uniforms = {
            uColor: { value: uColor }
        };
        super(BaseColorMat.vertex, BaseColorMat.fragment, uniforms);
    }
}

export default BaseColorMat;    