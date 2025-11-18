export default class Font {
    constructor(fontDefinition) {
        this.FONT_WIDTH = fontDefinition.FONT_WIDTH;
        this.FONT_HEIGHT = fontDefinition.FONT_HEIGHT;
        this.characters = fontDefinition.characters;
        //     this.hex = hex;
        //     this.binary = this.hex.toString(2).padStart(FontCharacter.FONT_WIDTH * FontCharacter.FONT_HEIGHT, '0');
        //     console.log(`Char hex: ${hex} (${parseInt(hex, 16).toString(2)}), binary: ${this.binary}`);
    }

    draw(ctx, text, x, y, color = "white", scale = 1) {
        // A = 111101111101 = 3965 = 0xF7D
        ctx.fillStyle = color;
        for (let row = 0; row < this.FONT_HEIGHT; row++) {
            for (let col = 0; col < this.FONT_WIDTH; col++) {
                if (this.binary[(row * this.FONT_WIDTH) + col] === '1') {
                    ctx.fillRect(x + col * scale, y + row * scale, scale, scale);
                }
            }
        }
    }

    drawCharacter(ctx, char, x, y, color = 'white', scale = 1) {
        const c = this.characters[char];
        if (c === undefined) return;

        const bin = c.toString(2).padStart(this.FONT_WIDTH * this.FONT_HEIGHT, '0');

        ctx.fillStyle = color;
        for (let row = 0; row < this.FONT_HEIGHT; row++) {
            for (let col = 0; col < this.FONT_WIDTH; col++) {
                if (bin[(row * this.FONT_WIDTH) + col] === '1') {
                    ctx.fillRect(x + col * scale, y + row * scale, scale, scale);
                }
            }
        }
    }
}