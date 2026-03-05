// ============================================================
// SCORING MODULE — ScoreSystem.js
// Gerencia pontuação, combo e highscore (localStorage)
// ============================================================

const STORAGE_KEY = "jogo_blocos_highscore";
const BASE_POINTS = 10;
const COMBO_BONUS = 5;

export class ScoreSystem {
    constructor() {
        this.score = 0;
        this.combo = 0;        // acertos consecutivos
        this.blocksCleared = 0;
        this.blocksMissed = 0;
        this.highscore = this._loadHighscore();
        this._listeners = [];
    }

    /** Registra um acerto: soma pontos + combo e notifica. */
    registerHit() {
        this.combo++;
        this.blocksCleared++;
        const points = BASE_POINTS + (this.combo > 1 ? COMBO_BONUS * (this.combo - 1) : 0);
        this.score += points;
        this._emit("hit", { points, combo: this.combo, score: this.score });
        return points;
    }

    /** Registra um erro: reseta combo. */
    registerMiss() {
        this.combo = 0;
        this.blocksMissed++;
        this._emit("miss", { score: this.score });
    }

    /** Finaliza a partida e salva highscore se necessário. */
    finalize() {
        if (this.score > this.highscore) {
            this.highscore = this.score;
            this._saveHighscore(this.highscore);
        }
        return {
            score: this.score,
            highscore: this.highscore,
            blocksCleared: this.blocksCleared,
            blocksMissed: this.blocksMissed,
        };
    }

    /** Reseta para nova partida. */
    reset() {
        this.score = 0;
        this.combo = 0;
        this.blocksCleared = 0;
        this.blocksMissed = 0;
    }

    /** Inscreve um listener para eventos de pontuação. */
    on(fn) {
        this._listeners.push(fn);
    }

    _emit(type, data) {
        this._listeners.forEach(fn => fn(type, data));
    }

    _loadHighscore() {
        try {
            return parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
        } catch { return 0; }
    }

    _saveHighscore(value) {
        try { localStorage.setItem(STORAGE_KEY, String(value)); } catch {/* ignore */ }
    }
}
