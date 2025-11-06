import GameEntity from "./GameEntity.js";
import { Transform } from "./ogl/index.js";

class GameObject extends GameEntity {
    constructor(name = "GameObject") {
        super();
        this.name = name;
        this.transform = new Transform();
        this.components = [];
    }

    addComponent(component) {
        this.components.push(component);
        this.transform.addChild(component.GetComponent());
        return component;
    }

    getComponent(componentType) {
        for (let i = 0; i < this.components.length; i++) {
            if (this.components[i] instanceof componentType) {
                return this.components[i];
            }
        }
        return null;
    }

    onStart() {
        this.components.forEach(c => {
            c.start();
        });
    }
    onUpdate() {
        this.components.forEach(c => {
            c.update();
        });
    }
}

export default GameObject;