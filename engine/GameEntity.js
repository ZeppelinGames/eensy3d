class GameEntity {
    constructor() {
        this.isActive = true;
    }
    start() {
        if (!this.isActive) return;
        this.onStart();
    }
    onStart() {

    }
    update() {
        if (!this.isActive) return;
        this.onUpdate();
    }
    onUpdate() {

    }
}

export default GameEntity;