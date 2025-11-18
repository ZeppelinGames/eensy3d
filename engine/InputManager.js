export default class InputManager {
    constructor() {
        this.keyStates = {};

        window.addEventListener('keydown', (e) => { this.keyDown(e) });
        window.addEventListener('keyup', (e) => { this.keyUp(e) });

        this.onKeyDown = null;
        this.onKeyUp = null;
    }

    keyDown(e) {
        const code = e.code;
        console.log(code);
        if (this.keyStates[code] === true) return;

        this.keyStates[code] = true;
        if (this.onKeyDown) this.onKeyDown(e);
    }

    keyUp(e) {
        const code = e.code;
        if (this.keyStates[code] === false) return;

        this.keyStates[code] = false;
        if (this.onKeyUp) this.onKeyUp(e);
    }
}

export const inputManager = new InputManager();