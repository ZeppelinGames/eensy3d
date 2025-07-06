import GameEntity from "./GameEntity.js";
import { Transform } from "./ogl/index.js";

class GameObject extends GameEntity {
    constructor(name = "GameObject") {
        super();
        this.name = name;
        this.transform = new Transform();
    }
}

export default GameObject;