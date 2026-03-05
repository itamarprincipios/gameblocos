// ============================================================
// ENGINE MODULE — Stack.js
// Gerencia os blocos que pousaram no chão.
// Detecta quando a pilha ultrapassa o limite de game over.
// ============================================================

import { BLOCK_HEIGHT } from "./Block.js";

export class Stack {
    /**
     * @param {number} canvasHeight
     * @param {number} gameOverRatio - fração da altura da tela que dispara game over (0.70)
     */
    constructor(canvasHeight, gameOverRatio = 0.70) {
        this.canvasHeight = canvasHeight;
        this.gameOverLine = canvasHeight * (1 - gameOverRatio); // Y limite (do topo)
        this.blocks = [];           // blocos pousados (Block instâncias)
        this._stackTopY = canvasHeight; // Y do topo da pilha atual
    }

    /**
     * Verifica se um bloco chegou ao chão ou ao topo da pilha.
     * Se sim, pousa-o e retorna true.
     * @param {import('./Block.js').Block} block
     * @returns {boolean}
     */
    checkLanding(block) {
        if (block.landed) return false;
        const blockBottom = block.y + BLOCK_HEIGHT;
        if (blockBottom >= this._stackTopY) {
            // Ajusta posição Y para sentar na pilha
            block.y = this._stackTopY - BLOCK_HEIGHT;
            block.landed = true;
            this.blocks.push(block);
            this._stackTopY -= BLOCK_HEIGHT;
            return true;
        }
        return false;
    }

    /**
     * Retorna true se a pilha ultrapassou a linha de game over.
     */
    isGameOver() {
        if (this.canvasHeight === 0) return false; // canvas ainda não renderizou
        return this._stackTopY <= this.gameOverLine;
    }

    /**
     * Reseta a pilha.
     */
    reset() {
        this.blocks = [];
        this._stackTopY = this.canvasHeight;
    }

    /**
     * Renderiza a linha de alerta de game over e os blocos pousados.
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        // Linha de limite – pisca em vermelho quando próximo
        const danger = this._stackTopY < this.gameOverLine + BLOCK_HEIGHT * 2;
        ctx.save();
        ctx.setLineDash([12, 8]);
        ctx.strokeStyle = danger ? "#FF4757" : "#FF475733";
        ctx.lineWidth = danger ? 3 : 2;
        if (danger) {
            ctx.shadowColor = "#FF4757";
            ctx.shadowBlur = 10;
        }
        ctx.beginPath();
        ctx.moveTo(0, this.gameOverLine);
        ctx.lineTo(ctx.canvas.width, this.gameOverLine);
        ctx.stroke();
        ctx.restore();

        // Label da linha
        ctx.save();
        ctx.font = "bold 13px 'Nunito', sans-serif";
        ctx.fillStyle = danger ? "#FF4757" : "#FF475788";
        ctx.textAlign = "right";
        ctx.fillText("⚠ LIMITE", ctx.canvas.width - 10, this.gameOverLine - 6);
        ctx.restore();

        // Blocos pousados são desenhados pelo GameEngine (já estão na lista de blocks)
    }
}
