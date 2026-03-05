// ============================================================
// RECOGNITION MODULE — VoskWorker.js
// Web Worker: carrega Vosk WASM e processa chunks de áudio offline.
// Comunica resultados via postMessage ao thread principal.
//
// Protocolo de mensagens (recebidas):
//   { type: 'init' }           → inicia o modelo
//   { type: 'audio', data: Float32Array }  → processa chunk
//   { type: 'reset' }          → reseta o recognizer
//
// Protocolo de mensagens (enviadas):
//   { type: 'ready' }          → modelo carregado
//   { type: 'result', text }   → resultado final
//   { type: 'partial', text }  → resultado parcial
//   { type: 'error', message } → erro
// ============================================================

// URL do modelo Vosk — carregado do servidor local (arquivo baixado manualmente)
// O arquivo ZIP está na raiz do projeto: vosk-model-small-pt-0.3.zip
const MODEL_URL = "/vosk-model-small-pt-0.3.zip";

let recognizer = null;
let model = null;
let vosk = null;

self.onmessage = async (e) => {
    const msg = e.data;
    switch (msg.type) {
        case "init":
            await initVosk();
            break;
        case "audio":
            processAudio(msg.data);
            break;
        case "reset":
            if (recognizer) recognizer.reset();
            break;
        default:
            break;
    }
};

async function initVosk() {
    // Timeout de segurança: se Vosk não inicializar em 30s, dispara erro
    // (createModel pode travar sem rejeitar a promise quando o modelo é inválido)
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(
            () => reject(new Error("Timeout: modelo Vosk não carregou em 30s")),
            30000
        );
    });

    try {
        // Importa Vosk via CDN (UMD bundle)
        importScripts("https://cdn.jsdelivr.net/npm/vosk-browser@0.0.8/dist/vosk.js");
        vosk = self.Vosk; // alias global exposto pelo bundle

        self.postMessage({ type: "progress", percent: 5, message: "Iniciando Vosk..." });

        // Race entre o carregamento real e o timeout
        model = await Promise.race([
            vosk.createModel(MODEL_URL, {
                onProgress: (percent) => {
                    self.postMessage({
                        type: "progress",
                        percent: Math.round(percent),
                        message: `Baixando modelo… ${Math.round(percent)}%`,
                    });
                },
            }),
            timeoutPromise,
        ]);

        clearTimeout(timeoutId);

        recognizer = new vosk.KaldiRecognizer(model, 16000);
        recognizer.setWords(false);

        self.postMessage({ type: "ready" });
    } catch (err) {
        clearTimeout(timeoutId);
        self.postMessage({ type: "error", message: err.message || String(err) });
    }
}

function processAudio(float32Data) {
    if (!recognizer) return;
    try {
        // Vosk espera Int16Array (PCM 16-bit)
        const int16 = float32ToInt16(float32Data);
        const accepted = recognizer.acceptWaveform(int16);
        if (accepted) {
            const result = recognizer.result();
            const text = (result && result.text) ? result.text.trim() : "";
            if (text) self.postMessage({ type: "result", text });
        } else {
            const partial = recognizer.partialResult();
            const text = (partial && partial.partial) ? partial.partial.trim() : "";
            if (text) self.postMessage({ type: "partial", text });
        }
    } catch {/* ignora erros de processamento */ }
}

function float32ToInt16(float32Array) {
    const int16 = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
        const s = Math.max(-1, Math.min(1, float32Array[i]));
        int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return int16;
}
