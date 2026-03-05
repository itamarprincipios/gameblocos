// ============================================================
// ENTRY POINT — main.js
// Inicializa o GameEngine e exporta para o escopo global se necessário.
// ============================================================

import { GameEngine } from "./js/engine/GameEngine.js";

window.addEventListener("DOMContentLoaded", async () => {
    const canvas = document.getElementById("game-canvas");
    const engine = new GameEngine(canvas);
    await engine.init();

    // Expõe para debug no console
    window.__engine = engine;
});
