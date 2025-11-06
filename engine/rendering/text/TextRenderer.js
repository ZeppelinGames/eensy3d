import { engine } from "../../Engine.js";
import FontCharacter from "./FontCharacter.js";
import pixelfont from "./pixelfont.js";

export default class TextRenderer { 
    constructor() {
        const font = pixelfont;
        this.characters = {};
        for (const [char, hex] of Object.entries(font)) {
            this.characters[char] = new FontCharacter(hex);
        }
    }

    drawText(text, x, y, color = "white", scale = 1) {
        let cursorX = x;
        for (const char of text) {
            const fontChar = this.characters[char];
            if (fontChar) {
                fontChar.draw(engine.renderer.ctx2D, cursorX, y, color, scale);
            }
            cursorX += (FontCharacter.FONT_WIDTH + 1) * scale;
        }
    }
}