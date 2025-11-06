export default class FontCharacter {
    static FONT_WIDTH = 3;
    static FONT_HEIGHT = 4;

    constructor(hex) {
        this.hex = hex;
        this.binary = this.hex.toString(2).padStart(FontCharacter.FONT_WIDTH * FontCharacter.FONT_HEIGHT, '0');
        console.log(`Char hex: ${hex} (${parseInt(hex, 16).toString(2)}), binary: ${this.binary}`);
    }

    draw(ctx, x, y, color = "white", scale = 1) {
        // A = 111101111101 = 3965 = 0xF7D
        ctx.fillStyle = color;
        for (let row = 0; row < FontCharacter.FONT_HEIGHT; row++) {
            for (let col = 0; col < FontCharacter.FONT_WIDTH; col++) {
                if (this.binary[(row * FontCharacter.FONT_WIDTH) + col] === '1') {
                    ctx.fillRect(x + col * scale, y + row * scale, scale, scale);
                }
            }
        }
    }
}