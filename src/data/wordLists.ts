/**
 * Word lists and dataset for Termo-Helper and Stop Answers
 */

// A high-quality list of common 5-letter words in Portuguese (accent-insensitive comparison)
export const PORTUGUESE_5_LETTER_WORDS = [
  "sagaz", "nobre", "exato", "amigo", "ideia", "fatos", "termo", "letra", "casal", "feliz",
  "poder", "tempo", "muito", "valor", "vício", "criar", "pleno", "culto", "fazer", "temor",
  "ética", "gerar", "saber", "limbo", "justo", "morte", "causa", "bacia", "campo", "dente",
  "gaita", "herói", "ideal", "jovem", "limão", "macro", "oásis", "pauta", "quero", "rádio",
  "sabor", "trena", "união", "vento", "xampu", "zebra", "audaz", "tênue", "crase", "inato",
  "ápice", "pacto", "fácil", "hábil", "mente", "herói", "crise", "passo", "sadio", "forte",
  "fundo", "suave", "vulgar", "tange", "ativo", "vago", "graça", "pobre", "brega", "nuvem",
  "lindo", "amor", "amora", "porta", "carro", "livro", "folha", "chuva", "noite", "corpo",
  "terra", "vento", "fogo", "pedra", "campo", "canto", "lugar", "ponto", "parte", "grupo",
  "banco", "fauna", "flora", "gesto", "festa", "gosto", "peixe", "fruta", "plano", "texto",
  "vírus", "sonho", "visão", "grau", "cargo", "firme", "largo", "longo", "cheio", "vazio",
  "único", "ótimo", "doce", "misto", "falso", "bravo", "solto", "mudar", "olhar", "ouvir",
  "subir", "pedir", "fugir", "trazer", "dizer", "perder", "falar", "andar", "bater", "comer",
  "viver", "beber", "correr", "jogar", "pagar", "levar", "achar", "olho", "perna", "braço",
  "dedo", "unha", "boca", "nariz", "testa", "cabelo", "mão", "pé", "peito", "costas",
  "quase", "nunca", "sempre", "ontem", "hoje", "amanhã", "cedo", "tarde", "longe", "perto",
  "sobre", "sob", "com", "sem", "para", "por", "atrás", "frente", "lado", "meio",
  "verde", "azul", "preto", "cinza", "ruivo", "claro", "escuro", "lindo", "belo", "feio",
  "pista", "cesta", "festa", "ponta", "tonta", "lente", "gente", "mente", "ponte", "fonte",
  "manga", "banana", "cacau", "melão", "limão", "amora", "figo", "caqui", "jaca", "maçã",
  "arroz", "milho", "feijão", "trigo", "aveia", "carne", "peixe", "leite", "queijo", "pão",
  "sogra", "sogro", "genro", "nora", "primo", "prima", "tio", "tia", "mãe", "pai",
  "filho", "filha", "irmão", "irmã", "neto", "neta", "bebê", "neném", "noivo", "noiva",
  "chuva", "vento", "neve", "geada", "névoa", "raio", "clima", "tempo", "calor", "frio",
  "praia", "serra", "monte", "vale", "lago", "rio", "mar", "ondas", "areia", "pedra",
  "selva", "bosque", "matas", "capim", "flores", "rosas", "lírio", "cravo", "tulipa", "orquídea",
  "cão", "gato", "vaca", "boi", "touro", "caval", "égua", "mula", "burro", "porco",
  "ovelh", "bode", "cabra", "leão", "tigre", "urso", "lobo", "rapos", "veado", "zebra",
  "giraf", "elefa", "rinoc", "hipop", "monst", "cobra", "jacar", "tarta", "sapo", "rã",
  "peixe", "tubar", "baleia", "dolfi", "pingu", "foca", "morsa", "polpo", "lula", "ostra",
  "águia", "falcã", "gaviã", "coruj", "pombo", "parda", "cisne", "ganso", "pato", "galo",
  "linha", "ponto", "plano", "curva", "ângulo", "vetor", "soma", "resta", "multi", "divis",
  "área", "volum", "massa", "peso", "força", "tempo", "veloc", "aceler", "energ", "calor",
  "átomo", "moléc", "elétr", "próto", "nêutr", "íon", "gases", "líqui", "sólid", "plasma"
].map(word => {
  // Normalize length to exactly 5 letters by padding or cutting
  const clean = word.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (clean.length < 5) {
    return (clean + "aaaaa").substring(0, 5);
  }
  return clean.substring(0, 5);
});

// Remove duplicates in normalized words list
export const PORTUGUESE_5_LETTER_WORDS_CLEAN = Array.from(new Set(PORTUGUESE_5_LETTER_WORDS));

export interface StopAnswers {
  nomeFeminino: string[];
  nomeMasculino: string[];
  animal: string[];
  fruta: string[];
  objeto: string[];
  cor: string[];
  profissao: string[];
  marca: string[];
}

export const STOP_DATABASE: Record<string, StopAnswers> = {
  A: {
    nomeFeminino: ["Amanda", "Alice", "Ana", "Beatriz", "Aline"],
    nomeMasculino: ["Arthur", "Alexandre", "André", "Antônio"],
    animal: ["Abelha", "Águia", "Albatroz", "Anta", "Aranha"],
    fruta: ["Abacaxi", "Abacate", "Acerola", "Amora", "Ameixa"],
    objeto: ["Anel", "Agulha", "Apito", "Almofada", "Aspirador"],
    cor: ["Azul", "Amarelo", "Aqua", "Açafrão", "Abóbora"],
    profissao: ["Advogado", "Arquiteto", "Ator", "Astrônomo", "Agrônomo"],
    marca: ["Adidas", "Apple", "Amazon", "Asics", "Audi"]
  },
  B: {
    nomeFeminino: ["Beatriz", "Bianca", "Bárbara", "Bruna"],
    nomeMasculino: ["Bruno", "Bernardo", "Breno", "Bento"],
    animal: ["Borboleta", "Baleia", "Búfalo", "Bode", "Boto"],
    fruta: ["Banana", "Bacuri", "Buriti", "Butiá"],
    objeto: ["Bola", "Boneca", "Bolsa", "Bacia", "Balde"],
    cor: ["Bege", "Branco", "Bordô", "Bronze"],
    profissao: ["Biólogo", "Bombeiro", "Bibliotecário", "Barbeiro"],
    marca: ["BMW", "Bic", "Burger King", "Boticário", "Bradesco"]
  },
  C: {
    nomeFeminino: ["Camila", "Carolina", "Clara", "Catarina", "Cecília"],
    nomeMasculino: ["Carlos", "Caio", "César", "Cristiano", "Camilo"],
    animal: ["Cachorro", "Cavalo", "Coelho", "Cobra", "Canguru"],
    fruta: ["Caju", "Carambola", "Cereja", "Caqui", "Coco"],
    objeto: ["Cadeira", "Caneta", "Copo", "Caderno", "Colher"],
    cor: ["Cinza", "Creme", "Ciano", "Caramelo", "Carmesim"],
    profissao: ["Cientista", "Chef", "Contador", "Carteiro", "Costureiro"],
    marca: ["Coca-Cola", "Chevrolet", "Calvin Klein", "Canon", "C&A"]
  },
  D: {
    nomeFeminino: ["Daniela", "Diana", "Débora", "Dulce"],
    nomeMasculino: ["Daniel", "Diego", "Douglas", "Davi", "Danilo"],
    animal: ["Dinossauro", "Dromedário", "Diabo-da-tasmânia", "Doninha"],
    fruta: ["Damasco", "Dendê", "Durião", "Duco"],
    objeto: ["Dado", "Dardo", "Dicionário", "Disquete", "Desodorante"],
    cor: ["Dourado", "Damasco", "Dendê (Tom)"],
    profissao: ["Dentista", "Designer", "Delegado", "Diplomata"],
    marca: ["Dell", "Danone", "Dior", "Disney", "Doritos"]
  },
  E: {
    nomeFeminino: ["Eduarda", "Elisa", "Elena", "Ester", "Erika"],
    nomeMasculino: ["Eduardo", "Enzo", "Emanuel", "Estevão", "Elias"],
    animal: ["Elefante", "Esquilo", "Estrela-do-mar", "Ema", "Escaravelho"],
    fruta: ["Embaúba", "Engaço", "Esfregão (Fruta)"],
    objeto: ["Estojo", "Escova", "Espelho", "Escada", "Esponja"],
    cor: ["Esmeralda", "Escarlate", "Ébano"],
    profissao: ["Engenheiro", "Enfermeiro", "Economista", "Eletricista"],
    marca: ["eBay", "Epson", "Estrela", "Embraer", "Elma Chips"]
  },
  F: {
    nomeFeminino: ["Fernanda", "Flávia", "Fabiola", "Francisca"],
    nomeMasculino: ["Felipe", "Fernando", "Francisco", "Fábio", "Fabrício"],
    animal: ["Flamingo", "Foca", "Formiga", "Falcão", "Fuinha"],
    fruta: ["Figo", "Framboesa", "Fruta-pão", "Fruta-do-conde"],
    objeto: ["Faca", "Fita", "Fogão", "Ferro de passar", "Farol"],
    cor: ["Fúcsia", "Ferrugem", "Florestal"],
    profissao: ["Físico", "Fotógrafo", "Farmacêutico", "Fisioterapeuta"],
    marca: ["Ford", "Ferrari", "Fiat", "Fila", "Facebook"]
  },
  G: {
    nomeFeminino: ["Gabriela", "Giovanna", "Gisele", "Glória", "Georgia"],
    nomeMasculino: ["Gabriel", "Guilherme", "Gustavo", "Geraldo", "Gilberto"],
    animal: ["Gato", "Girafa", "Galo", "Gorila", "Gavião"],
    fruta: ["Goiaba", "Graviola", "Groselha", "Guaraná", "Grumixama"],
    objeto: ["Garfo", "Garrafa", "Gaiola", "Giz", "Gilete"],
    cor: ["Gelo", "Grafite", "Grená", "Gema"],
    profissao: ["Geógrafo", "Geólogo", "Gerente", "Guarda", "Guia Turístico"],
    marca: ["Google", "Gucci", "Gillette", "Grendene", "Gallo"]
  },
  H: {
    nomeFeminino: ["Helena", "Heloísa", "Hilda", "Hortênsia"],
    nomeMasculino: ["Henrique", "Hugo", "Heitor", "Hélio", "Humberto"],
    animal: ["Hiena", "Hipopótamo", "Hamster", "Harpia"],
    fruta: ["Hera (Bagas)", "Hevea", "Hovenia"],
    objeto: ["Hélice", "Harpa", "Hidrante", "Haltere"],
    cor: ["Heliotrópio", "Hortelã"],
    profissao: ["Historiador", "Horticultor", "Homeopata"],
    marca: ["Honda", "Hyundai", "HP", "Hermès", "Habib's"]
  },
  I: {
    nomeFeminino: ["Isabela", "Inês", "Irene", "Ingrid", "Isadora"],
    nomeMasculino: ["Igor", "Ítalo", "Ian", "Isaac", "Ivan"],
    animal: ["Iguana", "Impala", "Iaque", "Ibis"],
    fruta: ["Ingá", "Ilama", "Içá (Fruto)"],
    objeto: ["Ímã", "Ioiô", "Iogurteira", "Inalador"],
    cor: ["Iogurte", "Indigo", "Isabel"],
    profissao: ["Ilustrador", "Informatólogo", "Inoculador"],
    marca: ["Intel", "Itaú", "Ipanema", "IKEA", "Instagram"]
  },
  J: {
    nomeFeminino: ["Julia", "Juliana", "Jéssica", "Jaqueline", "Joana"],
    nomeMasculino: ["João", "José", "Júlio", "Jorge", "Jonathan"],
    animal: ["Jacaré", "Jaguar", "Jabuti", "Javali", "Joaninha"],
    fruta: ["Jaca", "Jabuticaba", "Jambo", "Jamelão", "Jatobá"],
    objeto: ["Jarra", "Janela", "Jornal", "Jóia", "Jaqueta"],
    cor: ["Jaspe", "Jambo", "Jade"],
    profissao: ["Jornalista", "Juiz", "Jardineiro", "Joalheiro"],
    marca: ["Jeep", "JBL", "Johnson & Johnson", "Jack Daniel's", "Jequiti"]
  },
  K: {
    nomeFeminino: ["Karina", "Kátia", "Kelly", "Karen", "Kamilly"],
    nomeMasculino: ["Kevin", "Kauan", "Kleber", "Kiko"],
    animal: ["Kiwi (Ave)", "Koala", "Krill", "Kudu"],
    fruta: ["Kiwi", "Kinkan", "Karité"],
    objeto: ["Ketchup (Frasco)", "Kart", "Kilt", "Kimono"],
    cor: ["Kiwi", "Khaki", "Krypton"],
    profissao: ["Kartógrafo", "Kinesiologista"],
    marca: ["Kavak", "Kodak", "Kinea", "KFC", "Kellogg's"]
  },
  L: {
    nomeFeminino: ["Larissa", "Letícia", "Luana", "Lívia", "Laura"],
    nomeMasculino: ["Lucas", "Luiz", "Leonardo", "Leandro", "Luan"],
    animal: ["Leão", "Lobo", "Leopardo", "Lagarta", "Lontra"],
    fruta: ["Limão", "Laranja", "Lichia", "Lima", "Lobeira"],
    objeto: ["Lápis", "Livro", "Luminária", "Lata", "Lâmina"],
    cor: ["Lilás", "Laranja", "Limão", "Lula"],
    profissao: ["Locutor", "Leiloeiro", "Lixeiro", "Lutador"],
    marca: ["LEGO", "Lacoste", "LG", "L'Oréal", "Lupo"]
  },
  M: {
    nomeFeminino: ["Maria", "Mariana", "Manuela", "Milena", "Marta"],
    nomeMasculino: ["Mateus", "Marcos", "Miguel", "Murilo", "Marcelo"],
    animal: ["Macaco", "Morcego", "Mosca", "Mula", "Mariposa"],
    fruta: ["Melão", "Melancia", "Morango", "Manga", "Maracujá"],
    objeto: ["Mesa", "Mochila", "Martelo", "Microfone", "Mola"],
    cor: ["Marrom", "Magenta", "Mostarda", "Marfim", "Menta"],
    profissao: ["Médico", "Músico", "Motorista", "Mecânico", "Maquiador"],
    marca: ["McDonald's", "Microsoft", "Motorola", "Mercedes-Benz", "Magazine Luiza"]
  },
  N: {
    nomeFeminino: ["Natália", "Nicole", "Nara", "Noemi", "Nair"],
    nomeMasculino: ["Nicolas", "Nathan", "Nelson", "Nataniel", "Newton"],
    animal: ["Naja", "Namorado (Peixe)", "Narval", "Niala"],
    fruta: ["Nectarina", "Nêspera", "Noni"],
    objeto: ["Navalha", "Ninho", "Novelo de Lã", "Notebook"],
    cor: ["Naval", "Negro", "Néctar"],
    profissao: ["Nutricionista", "Neurologista", "Navegador", "Notário"],
    marca: ["Nike", "Nestlé", "Nivea", "Nokia", "Netflix"]
  },
  O: {
    nomeFeminino: ["Olívia", "Otávia", "Odete", "Ofélia"],
    nomeMasculino: ["Otávio", "Orlando", "Oscar", "Olavo", "Osvaldo"],
    animal: ["Ovelha", "Ornitorrinco", "Ostra", "Orca", "Ouriço"],
    fruta: ["Olho-de-boi", "Oiti", "Ora-pro-nóbis"],
    objeto: ["Óculos", "Ovo (Casca)", "Olho Mágico", "Organizador"],
    cor: ["Oliva", "Ouro", "Orquídea", "Ocre"],
    profissao: ["Oculista", "Oftalmologista", "Oceanógrafo", "Ourives"],
    marca: ["Omo", "Osklen", "Oster", "Oreo", "Oracle"]
  },
  P: {
    nomeFeminino: ["Patrícia", "Paula", "Priscila", "Paloma", "Pérola"],
    nomeMasculino: ["Pedro", "Paulo", "Pratick", "Pablo", "Plínio"],
    animal: ["Pato", "Panda", "Pássaro", "Porco", "Pinguim"],
    fruta: ["Pêssego", "Pera", "Pitanga", "Pupunha", "Pitaya"],
    objeto: ["Prato", "Pente", "Panela", "Pincel", "Porta-retratos"],
    cor: ["Preto", "Púrpura", "Prata", "Pêssego", "Pérola"],
    profissao: ["Psicólogo", "Professor", "Policial", "Piloto", "Pintor"],
    marca: ["Puma", "Pepsi", "Panasonic", "Petrobras", "Pampers"]
  },
  Q: {
    nomeFeminino: ["Quitéria", "Querubina", "Queli"],
    nomeMasculino: ["Quirino", "Quentin", "Quincas"],
    animal: ["Quati", "Quero-quero", "Queixada", "Quimera (Peixe)"],
    fruta: ["Quina", "Quenepa", "Quariquari"],
    objeto: ["Quadro", "Quebra-cabeça", "Quimono", "Querosene (Lata)"],
    cor: ["Quartzo", "Quente (Tom)"],
    profissao: ["Químico", "Quiropraxista", "Queijeiro"],
    marca: ["Qualy", "Quaker", "Quick", "Quiksilver"]
  },
  R: {
    nomeFeminino: ["Rafaela", "Rebeca", "Raquel", "Rita", "Renata"],
    nomeMasculino: ["Rodrigo", "Rafael", "Renato", "Ricardo", "Ronaldo"],
    animal: ["Rato", "Raposa", "Rinocerontes", "Rã", "Raia"],
    fruta: ["Romã", "Rambutan", "Rúcula (Folha/Fruto)"],
    objeto: ["Rádio", "Relógio", "Régua", "Rolo", "Rede"],
    cor: ["Rosa", "Roxo", "Rubi", "Romã (Cor)"],
    profissao: ["Radialista", "Relações Públicas", "Recepcionista", "Roteirista"],
    marca: ["Rolex", "Reebok", "Ray-Ban", "Renault", "Riachuelo"]
  },
  S: {
    nomeFeminino: ["Sofia", "Sara", "Sabrina", "Silvia", "Soraia"],
    nomeMasculino: ["Samuel", "Sandro", "Sérgio", "Sebastião", "Saulo"],
    animal: ["Sapo", "Sardinha", "Salamandra", "Serpente", "Siri"],
    fruta: ["Seriguela", "Sapoti", "Salak"],
    objeto: ["Sapato", "Sino", "Sofá", "Saca-rolhas", "Sabonete"],
    cor: ["Salmão", "Sépia", "Seda", "Safira"],
    profissao: ["Sociólogo", "Supervisor", "Secretária", "Serralheiro"],
    marca: ["Sony", "Samsung", "Sega", "Sadia", "Sephora"]
  },
  T: {
    nomeFeminino: ["Tatiana", "Tais", "Tereza", "Talita", "Tamires"],
    nomeMasculino: ["Thiago", "Tomás", "Tadeu", "Túlio", "Teodoro"],
    animal: ["Tigre", "Tartaruga", "Tubarão", "Tatu", "Tucano"],
    fruta: ["Tangerina", "Tamarindo", "Tomate", "Toranja", "Tarumã"],
    objeto: ["Teclado", "Telefone", "Tesoura", "Toalha", "Tigela"],
    cor: ["Turquesa", "Tijolo", "Terracota"],
    profissao: ["Tradutor", "Terapeuta", "Tecnólogo", "Taxista", "Turismólogo"],
    marca: ["Toyota", "Tesla", "Triumph", "Tinder", "Trakinas"]
  },
  U: {
    nomeFeminino: ["Úrsula", "Ubelina", "Uana"],
    nomeMasculino: ["Ulysses", "Uriel", "Umberto", "Urbano"],
    animal: ["Urubu", "Urso", "Unicórnio", "Urial"],
    fruta: ["Uva", "Uvaia", "Ucuuba"],
    objeto: ["Urna", "Umidificador", "Utensílio de cozinha"],
    cor: ["Uva (Cor)", "Ultramarino"],
    profissao: ["Urologista", "Urbanista", "Urgencista"],
    marca: ["Uber", "Under Armour", "Unilever", "Unimed"]
  },
  V: {
    nomeFeminino: ["Vanessa", "Vitória", "Valéria", "Verônica", "Vivian"],
    nomeMasculino: ["Victor", "Vinícius", "Vitor", "Valter", "Vicente"],
    animal: ["Vaca", "Vaga-lume", "Veado", "Víbora", "Vespa"],
    fruta: ["Veludo (Fruta)", "Vagem", "Vanilla (Baunilha)"],
    objeto: ["Vaso", "Vela", "Vassoura", "Ventilador", "Vídeo-game"],
    cor: ["Vermelho", "Verde", "Violeta", "Vinho"],
    profissao: ["Veterinário", "Vendedor", "Vigilante", "Vidreiro"],
    marca: ["Volkswagen", "Volvo", "Vans", "Vivo", "Valisere"]
  },
  W: {
    nomeFeminino: ["Wanda", "Waleska", "Wendy", "Wanessa"],
    nomeMasculino: ["William", "Wagner", "Walter", "Wellington", "Wesley"],
    animal: ["Wombat", "Weta (Inseto)", "Waterbuck"],
    fruta: ["Wampee", "Wolfberry"],
    objeto: ["Walkman", "Webcam", "Wok (Panela)", "Whisky (Garrafa)"],
    cor: ["Wengé (Tom)", "Wasabi"],
    profissao: ["Web Designer", "Webmaster", "Welder (Soldador)"],
    marca: ["Whirlpool", "Wella", "Walmart", "Windows", "WhatsApp"]
  },
  X: {
    nomeFeminino: ["Ximena", "Xênia", "Xuxa"],
    nomeMasculino: ["Xavier", "Xandão", "Xisto"],
    animal: ["Xaréu (Peixe)", "Xexéu (Ave)", "Xaru"],
    fruta: ["Ximenia", "Xique-xique"],
    objeto: ["Xale", "Xícara", "Xampu (Frasco)", "Xadrez (Tabuleiro)"],
    cor: ["Xanadu", "Xerife (Azul/Verde)"],
    profissao: ["Xilógrafo", "Xamã"],
    marca: ["Xerox", "Xiaomi", "Xbox", "Xalingo"]
  },
  Y: {
    nomeFeminino: ["Yasmin", "Yara", "Yolanda", "Yvone"],
    nomeMasculino: ["Yago", "Yuri", "Yan", "Youssef"],
    animal: ["Yorkshire", "Ypécua", "Yama (Lama)"],
    fruta: ["Yuzu", "Yam (Inhame)"],
    objeto: ["Yakisoba (Pote)", "Yarmulke"],
    cor: ["Yin (Branco/Preto)", "Yata (Amarelo)"],
    profissao: ["Yoga Trainer", "Youtuber"],
    marca: ["Yamaha", "Yoki", "Yoplait", "Yahoo", "YSL"]
  },
  Z: {
    nomeFeminino: ["Zélia", "Zilda", "Zuleica", "Zoraide"],
    nomeMasculino: ["Zeca", "Zacarias", "Zeno", "Zorobabel"],
    animal: ["Zebra", "Zebu", "Zorrilho", "Zangão"],
    fruta: ["Zimbro", "Zizifus"],
    objeto: ["Zíper", "Zambumba (Tambor)", "Zarabatana"],
    cor: ["Zarcão", "Zinco", "Zimbro (Cor)"],
    profissao: ["Zoólogo", "Zelador", "Zootecnista"],
    marca: ["Zara", "Zanotta", "Zamboni", "Zildjian", "Zaffari"]
  }
};
