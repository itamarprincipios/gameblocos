// ============================================================
// AUDIO MODULE — AudioSystem.js
// Captura áudio do microfone e entrega chunks ao SpeechRecognizer.
// ============================================================

export class AudioSystem {
    constructor() {
        this.stream = null;
        this.processor = null;
        this.context = null;
        this.active = false;
        this._onChunk = null;  // callback(float32Array)
    }

    /**
     * Solicita permissão ao microfone e começa a capturar áudio.
     * @param {function(Float32Array): void} onChunk - chamado com cada chunk de áudio
     */
    async start(onChunk) {
        if (this.active) return;
        this._onChunk = onChunk;

        this.stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                channelCount: 1,
                sampleRate: 16000,
                echoCancellation: true,
                noiseSuppression: true,
            },
        });

        this.context = new AudioContext({ sampleRate: 16000 });
        const source = this.context.createMediaStreamSource(this.stream);

        // ScriptProcessor (compatível com mobile/Android Chrome)
        const bufferSize = 4096;
        this.processor = this.context.createScriptProcessor(bufferSize, 1, 1);
        this.processor.onaudioprocess = (e) => {
            if (!this.active) return;
            const data = e.inputBuffer.getChannelData(0);
            // Copia Float32Array para enviar ao worker
            const copy = new Float32Array(data);
            this._onChunk && this._onChunk(copy);
        };

        source.connect(this.processor);
        this.processor.connect(this.context.destination);
        this.active = true;
    }

    /** Para a captura de áudio e libera recursos. */
    stop() {
        this.active = false;
        if (this.processor) {
            this.processor.disconnect();
            this.processor = null;
        }
        if (this.stream) {
            this.stream.getTracks().forEach(t => t.stop());
            this.stream = null;
        }
        if (this.context) {
            this.context.close().catch(() => { });
            this.context = null;
        }
    }

    /** Retorna true se o microfone estiver capturando. */
    isActive() { return this.active; }
}
