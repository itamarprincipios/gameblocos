// ============================================================
// ENGINE MODULE — Block.js
// Bloco com palavra em queda.
// Suporta tipos: "single" | "compound" | "phrase"
// Blocos de frase (2 palavras) têm largura automática maior.
// ============================================================

import { getWordForGrade } from "../data/words.js";

// Paleta de cores pastel
const BLOCK_COLORS = [
    { bg: "#FFB3C6", border: "#FF6B9D", shadow: "#FF6B9D44" },
    { bg: "#B3D9FF", border: "#5BAEFF", shadow: "#5BAEFF44" },
    { bg: "#B3FFD9", border: "#00D68F", shadow: "#00D68F44" },
    { bg: "#FFE4B3", border: "#FF9F1C", shadow: "#FF9F1C44" },
    { bg: "#E4B3FF", border: "#9B59B6", shadow: "#9B59B644" },
    { bg: "#FFFCB3", border: "#F7D000", shadow: "#F7D00044" },
];

export const BLOCK_HEIGHT = 70;
export const FALL_SPEED = 55; // velocidade base padrão

// Largura por tipo de bloco
const WIDTH_BY_TYPE = {
    single: 160,
    compound: 210,
    phrase: 260,
};

export class Block {
    /**
     * @param {number} canvasWidth
     * @param {number} speed       - velocidade de queda em px/s
     * @param {string} grade       - "ano1" | ... | "ano5"
     */
    constructor(canvasWidth, speed = FALL_SPEED, grade = "ano1") {
        const data = getWordForGrade(grade);
        this.word = data.text;
        this.type = data.type;           // "single" | "compound" | "phrase"
        this.id = crypto.randomUUID();

        // Calcular largura dinâmica baseada no tamanho da palavra
        const baseWidth = WIDTH_BY_TYPE[this.type] || 160;
        const charWidth = this.type === "phrase" ? 10 : (this.type === "compound" ? 12 : 14);
        const padding = 44;
        this.blockWidth = Math.max(baseWidth, (this.word.length * charWidth) + padding);

        const margin = this.blockWidth / 2 + 10;
        this.x = margin + Math.random() * (canvasWidth - margin * 2);
        this.y = -BLOCK_HEIGHT;

        this.speed = speed;
        this.active = true;
        this.landed = false;
        this.alpha = 1;

        this.color = BLOCK_COLORS[Math.floor(Math.random() * BLOCK_COLORS.length)];

        this._destroying = false;
        this._destroyTimer = 0;
        this._DESTROY_DURATION = 0.35;

        this._wobble = (Math.random() - 0.5) * 0.15;
        this._wobblePhase = Math.random() * Math.PI * 2;
    }

    update(dt) {
        if (this._destroying) {
            this._destroyTimer += dt;
            this.alpha = Math.max(0, 1 - this._destroyTimer / this._DESTROY_DURATION);
            return this._destroyTimer >= this._DESTROY_DURATION;
        }
        if (!this.landed) this.y += this.speed * dt;
        this._wobblePhase += dt * 2.5;
        return false;
    }

    triggerDestroy() {
        this._destroying = true;
        this._destroyTimer = 0;
    }

    draw(ctx) {
        if (!this.active && !this._destroying) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;

        const wobbleX = this.landed ? 0 : Math.sin(this._wobblePhase) * 3 * this._wobble;
        const w = this.blockWidth;
        const h = BLOCK_HEIGHT;
        const x = this.x - w / 2 + wobbleX;
        const y = this.y;
        const r = 18;

        // Sombra
        ctx.shadowColor = this.color.shadow;
        ctx.shadowBlur = this._destroying ? 20 : 10;
        ctx.shadowOffsetY = this._destroying ? 0 : 4;

        // Fundo gradiente
        const grad = ctx.createLinearGradient(x, y, x, y + h);
        grad.addColorStop(0, this.color.bg);
        grad.addColorStop(1, this.color.border + "88");

        // Forma arredondada
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        // Borda
        ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
        ctx.strokeStyle = this.color.border;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Ícone de tipo no canto (composto=🔗, frase=💬)
        if (this.type === "compound") {
            ctx.font = "13px serif";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText("🔗", x + 6, y + 6);
        } else if (this.type === "phrase") {
            ctx.font = "13px serif";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText("💬", x + 6, y + 6);
        }

        // Texto da palavra — fonte adaptada ao tipo
        ctx.shadowBlur = 0;
        const fontSize = this.type === "phrase" ? 18 : (this.type === "compound" ? 20 : 24);
        ctx.font = `bold ${fontSize}px 'Nunito', sans-serif`;
        ctx.fillStyle = "#2D2D5E";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.word, x + w / 2, y + h / 2);

        ctx.restore();
    }
}
