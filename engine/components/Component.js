import GameEntity from "../GameEntity.js";

class Component extends GameEntity {
    constructor(gameObject) {
        super();
        this.gameObject = gameObject;
    }
}

export default Component;