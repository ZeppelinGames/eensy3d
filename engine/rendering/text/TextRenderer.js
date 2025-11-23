import { renderer } from "../Renderer.js";
import Font from "./Font.js";
import pixelfont3x4 from "./pixelfont3x4.js";

export default class TextRenderer {
    constructor() {
        this.font = new Font(pixelfont3x4);
    }

    drawText(text, x, y, color = "white", scale = 1) {
        let cursorX = x;
        for (const char of text) {
            this.font.drawCharacter(renderer.ctx2D, char, cursorX, y, color, scale);
            cursorX += (this.font.FONT_WIDTH + 1) * scale;
        }
    }
}