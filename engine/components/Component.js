import GameEntity from "../GameEntity.js";

class Component extends GameEntity {
    constructor() {
        super();
    }

    mount(gameObject) {
        this.gameObject = gameObject;
        this.onMount(gameObject);
    }
    onMount(gameObject) {}
}

export default Component;