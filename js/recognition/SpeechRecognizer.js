// ============================================================
// RECOGNITION MODULE — SpeechRecognizer.js
// Usa Web Speech API nativa do Chrome/Edge (pt-BR).
// Funciona sem downloads, sem modelos, inicialização instantânea.
// ============================================================

export class SpeechRecognizer {
    constructor(callbacks = {}) {
        this._onResult = callbacks.onResult || (() => { });
        this._onPartial = callbacks.onPartial || (() => { });
        this._onProgress = callbacks.onProgress || (() => { });
        this._onReady = callbacks.onReady || (() => { });
        this._onError = callbacks.onError || (() => { });
        this._ready = false;
        this._active = false;
        this._recognition = null;
    }

    /**
     * Inicializa a Web Speech API diretamente — sem Vosk, sem delay.
     */
    async init() {
        this._onProgress(80, "Preparando reconhecimento de voz…");

        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) {
            this._onError("Reconhecimento de voz não suportado. Use Chrome ou Edge.");
            return;
        }

        const recognition = new SR();
        recognition.lang = "pt-BR";
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        // Cooldown para evitar duplos disparos da mesma palavra
        let lastFiredText = "";
        let lastFiredAt = 0;
        const COOLDOWN_MS = 50;

        recognition.onresult = (e) => {
            for (let i = e.resultIndex; i < e.results.length; i++) {
                const text = e.results[i][0].transcript.trim();
                const isFinal = e.results[i].isFinal;
                if (!text) continue;

                if (!isFinal) this._onPartial(text);

                // Avalia tanto resultados parciais quanto finais para resposta imediata
                const now = Date.now();
                const isDuplicate = text === lastFiredText && (now - lastFiredAt) < COOLDOWN_MS;
                if (!isDuplicate) {
                    lastFiredText = text;
                    lastFiredAt = now;
                    this._onResult(text);
                }
            }
        };

        recognition.onerror = (e) => {
            if (e.error === "no-speech" || e.error === "aborted") return;
            console.warn("[SpeechRecognizer] erro:", e.error);
        };

        recognition.onend = () => {
            // Reinicia automaticamente enquanto o jogo estiver ativo
            if (this._active) {
                try { recognition.start(); } catch { /* já rodando */ }
            }
        };

        this._recognition = recognition;
        this._onProgress(100, "Pronto!");
        this._ready = true;
        this._active = false;
        this._onReady();
    }

    /** Inicia a captura de voz (chamado ao iniciar o jogo). */
    start() {
        if (!this._recognition || this._active) return;
        this._active = true;
        try { this._recognition.start(); } catch { /* ignora */ }
    }

    /** Para a captura de voz. */
    stop() {
        this._active = false;
        try { this._recognition?.stop(); } catch { /* ignora */ }
    }

    /** Reset entre palavras (no-op — Web Speech é contínuo). */
    reset() { /* noop */ }

    /** Limpeza. */
    destroy() { this.stop(); }

    get isReady() { return this._ready; }
    get isUsingVosk() { return false; }  // sempre Web Speech API
}
