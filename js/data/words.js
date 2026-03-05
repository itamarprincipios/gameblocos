// ============================================================
// DATA MODULE — words.js
// Palavras organizadas por ANO ESCOLAR do Ensino Fundamental.
//
// CRITÉRIOS PEDAGÓGICOS:
//   1º Ano: monossílabas (1 sílaba)
//   2º Ano: dissílabas (2 sílabas)
//   3º Ano: trissílabas (3 sílabas)
//   4º Ano: polissílabas (4+ sílabas)
//   5º Ano: polissílabas + substantivos compostos + frases curtas
// ============================================================

export const WORD_POOLS = {

  // ── 1º ANO — Monossílabas (Expansão: 60+ palavras) ─────────────
  ano1: [
    { text: "sol", type: "single" }, { text: "mel", type: "single" }, { text: "pé", type: "single" },
    { text: "mar", type: "single" }, { text: "flor", type: "single" }, { text: "rei", type: "single" },
    { text: "pão", type: "single" }, { text: "boi", type: "single" }, { text: "giz", type: "single" },
    { text: "luz", type: "single" }, { text: "paz", type: "single" }, { text: "cor", type: "single" },
    { text: "sal", type: "single" }, { text: "dez", type: "single" }, { text: "lar", type: "single" },
    { text: "fé", type: "single" }, { text: "lã", type: "single" }, { text: "nó", type: "single" },
    { text: "voz", type: "single" }, { text: "ás", type: "single" }, { text: "ar", type: "single" },
    { text: "mês", type: "single" }, { text: "pó", type: "single" }, { text: "nós", type: "single" },
    { text: "ré", type: "single" }, { text: "vi", type: "single" }, { text: "já", type: "single" },
    { text: "lá", type: "single" }, { text: "cá", type: "single" }, { text: "vão", type: "single" },
    { text: "mão", type: "single" }, { text: "tão", type: "single" }, { text: "dão", type: "single" },
    { text: "cão", type: "single" }, { text: "são", type: "single" }, { text: "rã", type: "single" },
    { text: "chá", type: "single" }, { text: "má", type: "single" }, { text: "pá", type: "single" },
    { text: "uá", type: "single" }, { text: "ué", type: "single" }, { text: "uô", type: "single" },
    { text: "gol", type: "single" }, { text: "rol", type: "single" }, { text: "mal", type: "single" },
    { text: "tal", type: "single" }, { text: "qual", type: "single" }, { text: "mel", type: "single" },
    { text: "fel", type: "single" }, { text: "mil", type: "single" }, { text: "vil", type: "single" },
    { text: "sol", type: "single" }, { text: "rol", type: "single" }, { text: "sul", type: "single" },
    { text: "azul", type: "single" }, { text: "bom", type: "single" }, { text: "com", type: "single" },
    { text: "dom", type: "single" }, { text: "som", type: "single" }, { text: "tom", type: "single" },
    { text: "um", type: "single" }, { text: "mim", type: "single" }, { text: "sim", type: "single" },
    { text: "fim", type: "single" }, { text: "rim", type: "single" }, { text: "vovô", type: "single" }
  ],

  // ── 2º ANO — Dissílabas (Expansão: 60+ palavras) ───────────────
  ano2: [
    { text: "gato", type: "single" }, { text: "bola", type: "single" }, { text: "casa", type: "single" },
    { text: "pato", type: "single" }, { text: "sapo", type: "single" }, { text: "rato", type: "single" },
    { text: "uva", type: "single" }, { text: "fada", type: "single" }, { text: "bolo", type: "single" },
    { text: "dado", type: "single" }, { text: "peixe", type: "single" }, { text: "leão", type: "single" },
    { text: "ovo", type: "single" }, { text: "mapa", type: "single" }, { text: "vaca", type: "single" },
    { text: "cama", type: "single" }, { text: "mesa", type: "single" }, { text: "vela", type: "single" },
    { text: "praia", type: "single" }, { text: "tigre", type: "single" }, { text: "zebra", type: "single" },
    { text: "nuvem", type: "single" }, { text: "palco", type: "single" }, { text: "neve", type: "single" },
    { text: "copo", type: "single" }, { text: "fogo", type: "single" }, { text: "gelo", type: "single" },
    { text: "ilha", type: "single" }, { text: "jogo", type: "single" }, { text: "kilo", type: "single" },
    { text: "lixo", type: "single" }, { text: "mato", type: "single" }, { text: "nada", type: "single" },
    { text: "pulo", type: "single" }, { text: "queijo", type: "single" }, { text: "rede", type: "single" },
    { text: "suco", type: "single" }, { text: "tatu", type: "single" }, { text: "unha", type: "single" },
    { text: "vida", type: "single" }, { text: "xale", type: "single" }, { text: "zero", type: "single" },
    { text: "arco", type: "single" }, { text: "boca", type: "single" }, { text: "ceia", type: "single" },
    { text: "doce", type: "single" }, { text: "eixo", type: "single" }, { text: "frio", type: "single" },
    { text: "guia", type: "single" }, { text: "hora", type: "single" }, { text: "item", type: "single" },
    { text: "joia", type: "single" }, { text: "lago", type: "single" }, { text: "mola", type: "single" },
    { text: "noite", type: "single" }, { text: "ouro", type: "single" }, { text: "ponta", type: "single" },
    { text: "rocha", type: "single" }, { text: "seta", type: "single" }, { text: "toca", type: "single" },
    { text: "urna", type: "single" }, { text: "vila", type: "single" }
  ],

  // ── 3º ANO — Trissílabas (Expansão: 60+ palavras) ──────────────
  ano3: [
    { text: "macaco", type: "single" }, { text: "janela", type: "single" }, { text: "caneta", type: "single" },
    { text: "gigante", type: "single" }, { text: "pássaro", type: "single" }, { text: "boneca", type: "single" },
    { text: "cômoda", type: "single" }, { text: "tomate", type: "single" }, { text: "lagarto", type: "single" },
    { text: "menino", type: "single" }, { text: "menina", type: "single" }, { text: "banana", type: "single" },
    { text: "cabelo", type: "single" }, { text: "camelo", type: "single" }, { text: "foguete", type: "single" },
    { text: "família", type: "single" }, { text: "cenoura", type: "single" }, { text: "japinha", type: "single" },
    { text: "girafa", type: "single" }, { text: "abacate", type: "single" }, { text: "caramujo", type: "single" },
    { text: "jacaré", type: "single" }, { text: "borracha", type: "single" }, { text: "garrafa", type: "single" },
    { text: "número", type: "single" }, { text: "alface", type: "single" }, { text: "bateria", type: "single" },
    { text: "cadeira", type: "single" }, { text: "dominó", type: "single" }, { text: "escola", type: "single" },
    { text: "fumaça", type: "single" }, { text: "galinha", type: "single" }, { text: "hotel", type: "single" },
    { text: "igreja", type: "single" }, { text: "janela", type: "single" }, { text: "laranja", type: "single" },
    { text: "mochila", type: "single" }, { text: "novelha", type: "single" }, { text: "olheiro", type: "single" },
    { text: "palhaço", type: "single" }, { text: "queimada", type: "single" }, { text: "raposa", type: "single" },
    { text: "sapato", type: "single" }, { text: "teclado", type: "single" }, { text: "urubu", type: "single" },
    { text: "violeta", type: "single" }, { text: "xadrez", type: "single" }, { text: "zangado", type: "single" },
    { text: "âncora", type: "single" }, { text: "bússola", type: "single" }, { text: "caminho", type: "single" },
    { text: "desenho", type: "single" }, { text: "estudo", type: "single" }, { text: "fazenda", type: "single" },
    { text: "gelado", type: "single" }, { text: "história", type: "single" }, { text: "idade", type: "single" },
    { text: "jardim", type: "single" }, { text: "limite", type: "single" }, { text: "música", type: "single" }
  ],

  // ── 4º ANO — Polissílabas (Expansão: 60+ palavras) ──────────────
  ano4: [
    { text: "borboleta", type: "single" }, { text: "elefante", type: "single" }, { text: "televisão", type: "single" },
    { text: "computador", type: "single" }, { text: "tartaruga", type: "single" }, { text: "dinossauro", type: "single" },
    { text: "bicicleta", type: "single" }, { text: "primavera", type: "single" }, { text: "chocolate", type: "single" },
    { text: "caramelo", type: "single" }, { text: "casamento", type: "single" }, { text: "aventura", type: "single" },
    { text: "uniforme", type: "single" }, { text: "horizontal", type: "single" }, { text: "televisor", type: "single" },
    { text: "democracia", type: "single" }, { text: "diversidade", type: "single" }, { text: "biblioteca", type: "single" },
    { text: "crocodilo", type: "single" }, { text: "hipopótamo", type: "single" }, { text: "calendário", type: "single" },
    { text: "fotografia", type: "single" }, { text: "astronauta", type: "single" }, { text: "hemisfério", type: "single" },
    { text: "experiência", type: "single" }, { text: "aniversário", type: "single" }, { text: "basquetebol", type: "single" },
    { text: "curiosidade", type: "single" }, { text: "dedicação", type: "single" }, { text: "educação", type: "single" },
    { text: "felicidade", type: "single" }, { text: "generosidade", type: "single" }, { text: "honestidade", type: "single" },
    { text: "imaginação", type: "single" }, { text: "juventude", type: "single" }, { text: "liberdade", type: "single" },
    { text: "manutenção", type: "single" }, { text: "natureza", type: "single" }, { text: "observação", type: "single" },
    { text: "pensamento", type: "single" }, { text: "qualidade", type: "single" }, { text: "reciclagem", type: "single" },
    { text: "sentimento", type: "single" }, { text: "tecnologia", type: "single" }, { text: "utilidade", type: "single" },
    { text: "velocidade", type: "single" }, { text: "xilofone", type: "single" }, { text: "zoologia", type: "single" },
    { text: "alimentação", type: "single" }, { text: "benefício", type: "single" }, { text: "compaixão", type: "single" },
    { text: "determinação", type: "single" }, { text: "entusiasmo", type: "single" }, { text: "fraternidade", type: "single" },
    { text: "gratidão", type: "single" }, { text: "harmonia", type: "single" }, { text: "inspiração", type: "single" },
    { text: "justiça", type: "single" }, { text: "lealdade", type: "single" }, { text: "motivação", type: "single" }
  ],

  // ── 5º ANO — Polissílabas + Compostos + Frases Curtas ───────────
  ano5: [
    { text: "guarda-chuva", type: "compound" }, { text: "beija-flor", type: "compound" }, { text: "couve-flor", type: "compound" },
    { text: "bate-boca", type: "compound" }, { text: "porta-voz", type: "compound" }, { text: "passa-tempo", type: "compound" },
    { text: "guarda-roupa", type: "compound" }, { text: "arco-íris", type: "compound" }, { text: "bem-estar", type: "compound" },
    { text: "pé-de-pato", type: "compound" }, { text: "amor-perfeito", type: "compound" }, { text: "viva-voz", type: "compound" },
    { text: "escola pública", type: "phrase" }, { text: "livro aberto", type: "phrase" }, { text: "água mineral", type: "phrase" },
    { text: "casa grande", type: "phrase" }, { text: "mar profundo", type: "phrase" }, { text: "sol nascente", type: "phrase" },
    { text: "vento forte", type: "phrase" }, { text: "chuva fina", type: "phrase" }, { text: "flores silvestres", type: "phrase" },
    { text: "noite estrelada", type: "phrase" }, { text: "céu azul", type: "phrase" }, { text: "dia lindo", type: "phrase" },
    { text: "responsabilidade", type: "single" }, { text: "sustentabilidade", type: "single" }, { text: "extraordinário", type: "single" },
    { text: "desenvolvimento", type: "single" }, { text: "representação", type: "single" }, { text: "solidariedade", type: "single" },
    { text: "independência", type: "single" }, { text: "conhecimento", type: "single" }, { text: "oportunidade", type: "single" },
    // Frases de TRÊS palavras (Novo!)
    { text: "bom dia mundo", type: "phrase" },
    { text: "amo meu brasil", type: "phrase" },
    { text: "sol brilha forte", type: "phrase" },
    { text: "estudar é bom", type: "phrase" },
    { text: "correr no parque", type: "phrase" },
    { text: "café com leite", type: "phrase" },
    { text: "livro de história", type: "phrase" },
    { text: "brincar é legal", type: "phrase" },
    { text: "comer fruta doce", type: "phrase" },
    { text: "viajar para longe", type: "phrase" },
    { text: "dormir muito bem", type: "phrase" },
    { text: "dançar com alegria", type: "phrase" },
    { text: "cesta de flores", type: "phrase" },
    { text: "chave do carro", type: "phrase" },
    { text: "bola na rede", type: "phrase" }
  ],
};

export const GRADE_CONFIG = {
  ano1: { label: "1º Ano", color: "#FF6B9D", description: "Monossílabas", baseSpeed: 45, spawnSec: 4.5 },
  ano2: { label: "2º Ano", color: "#5BAEFF", description: "Dissílabas", baseSpeed: 55, spawnSec: 4.0 },
  ano3: { label: "3º Ano", color: "#00D68F", description: "Trissílabas", baseSpeed: 65, spawnSec: 3.5 },
  ano4: { label: "4º Ano", color: "#F7D000", description: "Polissílabas", baseSpeed: 75, spawnSec: 3.0 },
  ano5: { label: "5º Ano", color: "#9B59B6", description: "Compostos e frases", baseSpeed: 60, spawnSec: 4.0 },
};

const _shuffledPools = {
  ano1: [], ano2: [], ano3: [], ano4: [], ano5: []
};

function _shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getWordForGrade(grade) {
  const mainPool = WORD_POOLS[grade] || WORD_POOLS.ano1;
  let currentShuffled = _shuffledPools[grade] || [];

  if (currentShuffled.length === 0) {
    currentShuffled = _shuffle(mainPool);
    _shuffledPools[grade] = currentShuffled;
  }

  return currentShuffled.pop();
}

export function resetWordPools() {
  Object.keys(_shuffledPools).forEach(k => _shuffledPools[k] = []);
}
