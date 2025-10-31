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