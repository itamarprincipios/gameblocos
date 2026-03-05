// ============================================================
// UI MODULE — UIManager.js
// Controla as quatro telas do jogo:
//   - Start Screen   (#screen-start)
//   - Game Screen    (#screen-game → canvas)
//   - Game Over      (#screen-gameover)
//   - Ranking Screen (#screen-ranking)
// Também gerencia feedbacks visuais (acerto/erro), mascote e HUD.
// ============================================================

import { RankingSystem } from "../scoring/RankingSystem.js";

const GRADE_LABELS = {
    ano1: "1º Ano",
    ano2: "2º Ano",
    ano3: "3º Ano",
    ano4: "4º Ano",
    ano5: "5º Ano",
};

const ALL_GRADES = ["ano1", "ano2", "ano3", "ano4", "ano5"];

export class UIManager {
    constructor() {
        // Telas
        this.screenStart = document.getElementById("screen-start");
        this.screenGame = document.getElementById("screen-game");
        this.screenGameover = document.getElementById("screen-gameover");
        this.screenRanking = document.getElementById("screen-ranking");

        // HUD
        this.hudScore = document.getElementById("hud-score");
        this.hudHighscore = document.getElementById("hud-highscore");
        this.hudCombo = document.getElementById("hud-combo");

        // Game Over
        this.goScore = document.getElementById("go-score");
        this.goHighscore = document.getElementById("go-highscore");
        this.goCleared = document.getElementById("go-cleared");
        this.goMissed = document.getElementById("go-missed");
        this.goRankingMsg = document.getElementById("go-ranking-msg");

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

        // Ranking
        this._rankingTab = "ano1";
        this._bindRankingTabs();

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

    showGameOver(stats, grade, playerName) {
        this._setScreen("gameover");
        if (this.goScore) this.goScore.textContent = stats.score;
        if (this.goHighscore) this.goHighscore.textContent = stats.highscore;
        if (this.goCleared) this.goCleared.textContent = stats.blocksCleared;
        if (this.goMissed) this.goMissed.textContent = stats.blocksMissed;
        this._animateMascot(stats.score > 0 ? "happy" : "sad");

        // Salva no ranking e exibe posição
        if (this.goRankingMsg) {
            this.goRankingMsg.style.display = "none";
            if (playerName && stats.score > 0) {
                const pos = RankingSystem.saveEntry(grade, playerName, stats.score);
                if (pos) {
                    const medal = pos === 1 ? "🥇" : pos === 2 ? "🥈" : pos === 3 ? "🥉" : `#${pos}`;
                    this.goRankingMsg.textContent = `${medal} ${pos}º lugar no ranking de ${GRADE_LABELS[grade] || grade}!`;
                    this.goRankingMsg.style.display = "block";
                }
            }
        }
    }

    showRanking(fromScreen = "start") {
        this._setScreen("ranking");
        this._rankingFromScreen = fromScreen;
        this._renderRanking(this._rankingTab);
    }

    _setScreen(name) {
        [this.screenStart, this.screenGame, this.screenGameover, this.screenRanking].forEach(s => {
            if (s) s.classList.remove("active");
        });
        const map = {
            start: this.screenStart,
            game: this.screenGame,
            gameover: this.screenGameover,
            ranking: this.screenRanking,
        };
        const target = map[name];
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

    // ---- RANKING ----

    _bindRankingTabs() {
        document.querySelectorAll(".ranking-tab").forEach(tab => {
            tab.addEventListener("click", () => {
                document.querySelectorAll(".ranking-tab").forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                this._rankingTab = tab.dataset.tab;
                this._renderRanking(this._rankingTab);
            });
        });
    }

    _renderRanking(grade) {
        const list = document.getElementById("ranking-list");
        if (!list) return;
        const entries = RankingSystem.getRanking(grade);

        if (entries.length === 0) {
            list.innerHTML = `<div class="ranking-empty">Nenhum jogador ainda.<br>Seja o primeiro! 🎮</div>`;
            return;
        }

        const medals = ["🥇", "🥈", "🥉"];
        list.innerHTML = entries.map((entry, i) => `
            <div class="ranking-entry ${i < 3 ? "ranking-top" : ""}" role="listitem">
                <span class="ranking-pos">${medals[i] || `${i + 1}º`}</span>
                <span class="ranking-name">${this._escapeHtml(entry.name)}</span>
                <span class="ranking-score">${entry.score}</span>
                <span class="ranking-date">${entry.date || ""}</span>
            </div>
        `).join("");
    }

    _escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
}
