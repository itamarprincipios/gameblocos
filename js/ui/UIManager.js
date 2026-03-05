// ============================================================
// UI MODULE — UIManager.js
// Controla as três telas do jogo:
//   - Start Screen   (#screen-start)
//   - Game Screen    (#screen-game → canvas)
//   - Game Over      (#screen-gameover)
// Também gerencia feedbacks visuais (acerto/erro), mascote e HUD.
// ============================================================

export class UIManager {
    constructor() {
        // Telas
        this.screenStart = document.getElementById("screen-start");
        this.screenGame = document.getElementById("screen-game");
        this.screenGameover = document.getElementById("screen-gameover");

        // HUD
        this.hudScore = document.getElementById("hud-score");
        this.hudHighscore = document.getElementById("hud-highscore");
        this.hudCombo = document.getElementById("hud-combo");

        // Game Over
        this.goScore = document.getElementById("go-score");
        this.goHighscore = document.getElementById("go-highscore");
        this.goCleared = document.getElementById("go-cleared");
        this.goMissed = document.getElementById("go-missed");

        // Microfone
        this.micBtn = document.getElementById("mic-btn");
        this.micStatus = document.getElementById("mic-status");
        this.partialText = document.getElementById("partial-text");

        // Loading
        this.loadingBar = document.getElementById("loading-bar");
        this.loadingMsg = document.getElementById("loading-msg");
        this.loadingOverlay = document.getElementById("loading-overlay");

        // Feedback overlay
        this.feedbackEl = document.getElementById("feedback");

        // Mascote
        this.mascotEl = document.getElementById("mascot");

        this._feedbackTimer = null;
    }

    // ---- TELAS ----

    showStart() {
        this._setScreen("start");
        this._animateMascot("idle");
    }

    showGame() {
        this._setScreen("game");
    }

    showGameOver(stats) {
        this._setScreen("gameover");
        if (this.goScore) this.goScore.textContent = stats.score;
        if (this.goHighscore) this.goHighscore.textContent = stats.highscore;
        if (this.goCleared) this.goCleared.textContent = stats.blocksCleared;
        if (this.goMissed) this.goMissed.textContent = stats.blocksMissed;
        this._animateMascot(stats.score > 0 ? "happy" : "sad");
    }

    _setScreen(name) {
        [this.screenStart, this.screenGame, this.screenGameover].forEach(s => {
            if (s) s.classList.remove("active");
        });
        const target = { start: this.screenStart, game: this.screenGame, gameover: this.screenGameover }[name];
        if (target) target.classList.add("active");
    }

    // ---- HUD ----

    updateScore(score, combo, highscore) {
        if (this.hudScore) this.hudScore.textContent = score;
        if (this.hudHighscore) this.hudHighscore.textContent = highscore;
        if (this.hudCombo) {
            this.hudCombo.textContent = combo > 1 ? `🔥 x${combo}` : "";
            this.hudCombo.classList.toggle("combo-glow", combo > 1);
        }
    }

    // ---- FEEDBACK VISUAL ----

    showHit(word, points) {
        this._showFeedback(`✨ ${word}! +${points}`, "feedback-hit");
        this._animateMascot("cheer");
    }

    showMiss(word) {
        this._showFeedback(`😅 ${word}…`, "feedback-miss");
        this._animateMascot("sad");
    }

    /** Notificação de aumento de velocidade (tier de dificuldade) */
    showSpeedUp(message) {
        this._showFeedback(message, "feedback-speedup");
        this._animateMascot("cheer");
    }

    /** Atualiza o label de turma exibido no HUD durante o jogo */
    setGradeLabel(label) {
        const el = document.getElementById("hud-grade");
        if (el) el.textContent = label;
    }

    _showFeedback(text, cssClass) {
        if (!this.feedbackEl) return;
        clearTimeout(this._feedbackTimer);
        this.feedbackEl.textContent = text;
        this.feedbackEl.className = `feedback ${cssClass} visible`;
        this._feedbackTimer = setTimeout(() => {
            this.feedbackEl.classList.remove("visible");
        }, 1400);
    }

    // ---- MICROFONE ----

    setMicState(state) {
        // state: 'off' | 'loading' | 'on' | 'error'
        if (!this.micBtn || !this.micStatus) return;
        this.micBtn.dataset.state = state;
        const labels = { off: "🎤 OFF", loading: "⏳", on: "🎙️ ON", error: "❌" };
        this.micStatus.textContent = labels[state] || "🎤";
    }

    setPartialText(text) {
        if (this.partialText) {
            this.partialText.textContent = text ? `"${text}"` : "";
        }
    }

    // ---- LOADING DO MODELO ----

    showLoadingOverlay(show) {
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.toggle("visible", show);
        }
    }

    updateLoadingProgress(percent, message) {
        if (this.loadingBar) this.loadingBar.style.width = `${percent}%`;
        if (this.loadingMsg) this.loadingMsg.textContent = message || `${percent}%`;
    }

    // ---- MASCOTE ----

    _animateMascot(state) {
        if (!this.mascotEl) return;
        this.mascotEl.className = `mascot mascot-${state}`;
    }
}
