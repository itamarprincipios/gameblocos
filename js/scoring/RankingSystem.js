// ============================================================
// RANKING MODULE — RankingSystem.js
// Gerencia o ranking dos top 10 jogadores por turma.
// Dados salvos no localStorage por chave de turma.
// ============================================================

const RANKING_PREFIX = "jogo_blocos_ranking_";
const MAX_ENTRIES = 10;

export class RankingSystem {
    /**
     * Salva uma entrada de ranking para a turma especificada.
     * Mantém apenas os top MAX_ENTRIES por pontuação.
     * Retorna a posição no ranking (1-based) ou null se não entrou.
     */
    static saveEntry(grade, playerName, score) {
        const ranking = this.getRanking(grade);
        const entry = {
            name: playerName.trim(),
            score: score,
            date: new Date().toLocaleDateString("pt-BR"),
        };
        ranking.push(entry);
        // Ordena do maior para o menor
        ranking.sort((a, b) => b.score - a.score);
        // Mantém só os top 10
        const trimmed = ranking.slice(0, MAX_ENTRIES);
        const position = trimmed.findIndex(e => e === entry) + 1;

        try {
            localStorage.setItem(
                RANKING_PREFIX + grade,
                JSON.stringify(trimmed)
            );
        } catch { /* ignore */ }

        return position > 0 ? position : null;
    }

    /**
     * Retorna o ranking de uma turma (array ordenado).
     */
    static getRanking(grade) {
        try {
            const raw = localStorage.getItem(RANKING_PREFIX + grade);
            if (!raw) return [];
            return JSON.parse(raw);
        } catch { return []; }
    }

    /**
     * Retorna o ranking de todas as turmas.
     * { ano1: [...], ano2: [...], ... }
     */
    static getAllRankings(grades) {
        const result = {};
        for (const grade of grades) {
            result[grade] = this.getRanking(grade);
        }
        return result;
    }
}
