import React, { useState, useMemo } from "react";
import { 
  Copy, 
  Check, 
  Shield, 
  Sword, 
  Sparkles, 
  HelpCircle, 
  Shuffle, 
  Flame, 
  Zap, 
  User, 
  Users, 
  Award, 
  Plus, 
  RefreshCw,
  Hash,
  Info
} from "lucide-react";

interface NicksFreeFireProps {
  onNotify: (message: string) => void;
}

type TabType = "all" | "tryhard" | "masculino" | "feminino" | "guildas" | "casal";

export default function NicksFreeFire({ onNotify }: NicksFreeFireProps) {
  // Input and global states
  const [nickInput, setNickInput] = useState("Nobru");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("all");

  // Custom Nick Builder (Oficina de Nicks) state
  const [builderPrefix, setBuilderPrefix] = useState("꧁༺");
  const [builderName, setBuilderName] = useState("APELÃO");
  const [builderSpace, setBuilderSpace] = useState("ㅤ"); // Invisible space
  const [builderSuffix, setBuilderSuffix] = useState("༻꧂");
  const [builderTag, setBuilderTag] = useState("Ⓥ"); // Verified badge by default

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    onNotify("Nick copiado! Divirta-se no Free Fire! 🎮");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to copy and immediately inform about character length
  const handleCopyBuilder = (text: string, id: string) => {
    if (text.length > 12) {
      onNotify("Aviso: Seu nick tem mais de 12 caracteres e pode ser cortado no FF! Mas foi copiado! ⚠️");
    } else {
      onNotify("Nick customizado copiado! Pronto para usar no Free Fire! 🏆");
    }
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Popular individual symbols categorized
  const symbolCategories = [
    {
      name: "Asas e Decorações de Respeito",
      items: ["꧁", "꧂", "亗", "𓆩", "𓆪", "彡", "★彡", "ミ★", "『", "』", "「", "」", "ツ", "么", "☯", "⚡"]
    },
    {
      name: "Símbolos Pro-Player & Rank",
      items: ["☠️", "⚔️", "🛡️", "🔱", "♚", "👑", "🔥", "✨", "", "Ⓥ", "ᶠᶠ", "ʸᵗ", "ˣᵈ", "ᵍᵒᵈ", "〆", "☁️"]
    },
    {
      name: "Estrelas, Corações e Clima",
      items: ["☂️", "❄️", "☄️", "✿", "❤", "★", "☘", "☾", "✦", "✖", "✚", "☣️", "🎯", "⚡", "☯", "♥"]
    },
    {
      name: "Ideogramas Japoneses e Raros",
      items: ["𓃠", "卍", "𓆉", "𓃓", "𓃗", "𓃱", "𓅂", "𓆗", "𓆙", "𓈊", "𓈋", "𓊈", "𓊉", "𓊆", "𓊇", "𓊬"]
    }
  ];

  // Curated Lists of Ready-to-Use Nicknames by style
  const readyMadeNicks = {
    tryhard: [
      "亗 APELÃO.ff 亗", "꧁༺ NOBRU_XP ༻꧂", "⚡ CRUSH_FPS ⚡", "𓆩 SKULL_亗 𓆪", "☠️ DANTAS_〆 ☠️",
      "LOUD_BAK Ⓥ", "TWO9_神", "VITIN_ʸᵗ 么", "亗 CANGAÇO 亗", "CEROL_", "BAD_BOY Ⓥ", "SANTOS_⚡"
    ],
    masculino: [
      "猎人 HUNTER", "꧁ SMOKE_XP ꧂", "亗 VULCANO 亗", "𓆩 RAGNAR 𓆪", "⚡ ZERO_KILLS ⚡", "PHEONIX_ff",
      "GHOST_亗", "『 SHADOW 』", "VIPER_神", "亗 BLADE 亗", "BEAST_ff", "KING_⚡"
    ],
    feminino: [
      "✿ BELLA_YT ✿", "꧁ CHERRY ꧂", "☂️ AMY_FF", "LARA_亗", "✿ LUNA_FPS ✿", "QUEEN_ff Ⓥ",
      "ANGEL_★", "『 MOON_LIGHT 』", "SWEET_DEATH", "亗 KIRA 亗", "LIDIA_⚡", "BABY_GIRL ✿"
    ],
    guildas: [
      "LOUD_CORINGA", "fluxo_Nobru", "LOS_GRANDES", "GOD_BAK", "BD_TWO9", "PAIN_VITO",
      "INTZ_CRAZY", "KABUM_RUY", "FURIA_MAX", "RED_DANTAS", "SPORTS_VINI", "META_BAD"
    ],
    casal: [
      "✿ MARIDO_ff / ✿ ESPOSA_ff", "𓆩 REI_亗 / 𓆪 RAINHA_亗", "⚡ ATOM_XP / ⚡ BELLA_XP",
      "『 DUO_KILLER 』/ 『 DUO_HEALER 』", "ADÃO_FF / EVA_FF", "ROMEO_⚡ / JULIET_⚡"
    ]
  };

  // Prefixes & Suffixes for the Interactive Custom builder
  const prefixOptions = ["꧁༺", "亗", "𓆩", "★彡", "☠️", "『", "✿", "⚡", "", "Ⓥ", "⚔️", ""];
  const suffixOptions = ["༻꧂", "亗", "𓆪", "彡★", "☠️", "』", "✿", "⚡", "ff", "ʸᵗ", "〆", ""];
  const tagOptions = ["Ⓥ", "ᶠᶠ", "ʸᵗ", "ˣᵈ", "ᵍᵒᵈ", "神", "么", "XP", "〆", "无", ""];
  const spaceOptions = [
    { name: "Espaço Invisível Grande", char: "ㅤ" },
    { name: "Espaço Invisível Médio", char: "ﾵ" },
    { name: "Espaço Invisível Pequeno", char: " " },
    { name: "Sem Espaço", char: "" }
  ];

  // Random base names to inject
  const baseNames = [
    "Nobru", "Cerol", "Bak", "Two9", "Thurzin", "Jordan", "Coringa", "Babi", "Weedzao", "Shax",
    "Apelão", "Mestre", "Capudo", "BlackN444", "Ghost", "Hunter", "Sniper", "Vitin", "Ronaldo", "Dante"
  ];

  // Advanced randomize logic
  const handleRandomizeBuilder = () => {
    const randomPrefix = prefixOptions[Math.floor(Math.random() * prefixOptions.length)];
    const randomSuffix = suffixOptions[Math.floor(Math.random() * suffixOptions.length)];
    const randomTag = tagOptions[Math.floor(Math.random() * tagOptions.length)];
    const randomBaseName = baseNames[Math.floor(Math.random() * baseNames.length)].toUpperCase();
    
    setBuilderPrefix(randomPrefix);
    setBuilderName(randomBaseName);
    setBuilderSuffix(randomSuffix);
    setBuilderTag(randomTag);
    onNotify("Nova combinação tryhard gerada na oficina! ⚡");
  };

  // Live calculation of the custom builder output
  const builderOutput = useMemo(() => {
    const spacePart = builderSpace;
    const tagPart = builderTag ? `${spacePart}${builderTag}` : "";
    return `${builderPrefix}${builderName}${tagPart}${builderSuffix}`.trim();
  }, [builderPrefix, builderName, builderSpace, builderSuffix, builderTag]);

  // Handle shuffling suggestion in the regular list
  const handleShuffleSuggestion = () => {
    const randomName = baseNames[Math.floor(Math.random() * baseNames.length)];
    setNickInput(randomName);
    onNotify(`Apelido sugerido: ${randomName} 🎲`);
  };

  // Generate dynamic styles for the regular list based on nickInput
  const generatedFFNicks = useMemo(() => {
    const n = nickInput.trim() === "" ? "Player" : nickInput;
    const upper = n.toUpperCase();

    return [
      { id: "ff1", result: `꧁༺ ${upper} ༻꧂`, style: "tryhard" },
      { id: "ff2", result: `亗 ${upper} ᶠᶠ 亗`, style: "tryhard" },
      { id: "ff3", result: `⚡ ${upper} ⚡`, style: "masculino" },
      { id: "ff4", result: `☂️ ${upper} ʸᵗ`, style: "tryhard" },
      { id: "ff5", result: `𓆩 ${n} 𓆪`, style: "masculino" },
      { id: "ff6", result: `★彡 ${upper} 彡★`, style: "tryhard" },
      { id: "ff7", result: `☠️ ${n} ☠️`, style: "masculino" },
      { id: "ff8", result: `✿ ${n} ✿`, style: "feminino" },
      { id: "ff9", result: `『 ${upper} 』`, style: "tryhard" },
      { id: "ff10", result: `👑 ${n} ᶠᶠ`, style: "tryhard" },
      { id: "ff11", result: ` ${n} ˣᵈ`, style: "masculino" },
      { id: "ff12", result: `LOUD_${upper} 么`, style: "guildas" },
      { id: "ff13", result: `${n} Ⓥ`, style: "tryhard" },
      { id: "ff14", result: `☣️ ${upper} ☣️`, style: "masculino" },
      { id: "ff15", result: `✞ ${n} ✞`, style: "masculino" },
      { id: "ff16", result: `✿ ${n}_MILGRAU ✿`, style: "feminino" },
      { id: "ff17", result: `『 DUO_${upper} 』`, style: "casal" },
      { id: "ff18", result: `FLUXO_${upper} Ⓥ`, style: "guildas" }
    ];
  }, [nickInput]);

  // Filter regular generated nicks
  const filteredNicks = useMemo(() => {
    if (activeTab === "all") return generatedFFNicks;
    if (activeTab === "tryhard") return generatedFFNicks.filter(x => x.style === "tryhard");
    if (activeTab === "masculino") return generatedFFNicks.filter(x => x.style === "masculino" || x.style === "tryhard");
    if (activeTab === "feminino") return generatedFFNicks.filter(x => x.style === "feminino");
    if (activeTab === "guildas") return generatedFFNicks.filter(x => x.style === "guildas");
    if (activeTab === "casal") return generatedFFNicks.filter(x => x.style === "casal");
    return generatedFFNicks;
  }, [generatedFFNicks, activeTab]);

  return (
    <div className="space-y-10">
      {/* Editorial Header with deep gaming background tone */}
      <div className="text-center md:text-left space-y-3.5 border-b border-slate-200/60 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-100 bg-orange-50/50 text-[11px] text-orange-600 font-semibold tracking-wider uppercase">
          <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
          <span>Esports Nick Workshop, Símbolos de Free Fire &amp; letras diferentes ff</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
          Nicks de <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-500 to-indigo-600">Free Fire</span>, Símbolos Pro &amp; Letras Diferentes FF
        </h2>
        <p className="text-xs md:text-sm text-slate-500 max-w-2xl leading-relaxed font-semibold">
          Gere nicks de Free Fire apelões com <span className="text-orange-600">letras diferentes ff</span> de alta qualidade. Copie símbolos especiais, verificado Ⓥ, raios, asas e o famoso espaço invisível com <span className="text-orange-600">letras diferentes ff</span> para se destacar no lobby. Use nossa oficina inteligente de <span className="text-orange-600">letras diferentes ff</span> para montar e testar o tamanho oficial do seu apelido!
        </p>
      </div>

      {/* 🚀 FEATURE 1: OFICINA DE NICKS (Dynamic Nick Builder Workspace) */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(249,115,22,0.15)] border border-orange-500/25 relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial-gradient from-orange-500/10 via-transparent to-transparent pointer-events-none" />
        
        {/* Workspace Title & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/30 text-[10px] text-orange-400 font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-orange-500 animate-bounce" />
              Exclusivo: Oficina Interativa de Letras Diferentes FF
            </div>
            <h3 className="font-display text-lg font-black tracking-tight text-white flex items-center gap-2">
              Monte seu Nick de Free Fire Personalizado usando Letras Diferentes FF
            </h3>
          </div>
          <button
            onClick={handleRandomizeBuilder}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-orange-600 rounded-xl text-xs font-bold transition-all text-orange-400 hover:text-white border border-slate-700 hover:border-orange-500 cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
            SORTEAR COMPOSIÇÃO
          </button>
        </div>

        {/* Live Preview Screen (Aesthetic Game Panel) */}
        <div className="bg-slate-950 rounded-2xl p-5 md:p-7 border border-slate-800 text-center relative space-y-3 shadow-inner">
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          <span className="text-[9px] uppercase tracking-widest text-slate-500 font-mono block">
            Visualização dentro do Jogo com suas letras diferentes ff (Free Fire HUD)
          </span>

          {/* Glowing Nick Output */}
          <div className="py-4 select-all">
            <span className="font-mono text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-yellow-400 tracking-wide drop-shadow-[0_4px_10px_rgba(249,115,22,0.3)]">
              {builderOutput || "DIGITE_SEU_NICK"}
            </span>
          </div>

          {/* Limit character indicator */}
          <div className="flex items-center justify-center gap-4 border-t border-slate-900 pt-3">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400">Tamanho total do nick com letras diferentes ff:</span>
              <span className={`font-mono font-black px-2 py-0.5 rounded ${
                builderOutput.length > 12 ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
              }`}>
                {builderOutput.length} / 12 caracteres
              </span>
            </div>

            {builderOutput.length > 12 ? (
              <span className="text-[10px] text-red-400 font-bold flex items-center gap-1 animate-pulse">
                ⚠️ Limite Excedido (Máx 12 no FF)
              </span>
            ) : (
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                ✅ Letras Diferentes FF Válidas
              </span>
            )}
          </div>
        </div>

        {/* Interactive Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          {/* 1. Prefix Selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
              1. Decoração Esquerda para letras diferentes ff:
            </label>
            <select
              value={builderPrefix}
              onChange={(e) => setBuilderPrefix(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            >
              {prefixOptions.map((opt, i) => (
                <option key={i} value={opt}>{opt || "(Nenhum)"}</option>
              ))}
            </select>
          </div>

          {/* 2. Core Name Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
              2. Nome de Guerra com letras diferentes ff:
            </label>
            <input
              type="text"
              value={builderName}
              onChange={(e) => setBuilderName(e.target.value.toUpperCase())}
              placeholder="NOME"
              maxLength={12}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
          </div>

          {/* 3. Space Selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
              3. Tipo de Espaço para letras diferentes ff:
            </label>
            <select
              value={builderSpace}
              onChange={(e) => setBuilderSpace(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            >
              {spaceOptions.map((opt, i) => (
                <option key={i} value={opt.char}>{opt.name}</option>
              ))}
            </select>
          </div>

          {/* 4. Suffix Tag Selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
              4. Símbolo Final das letras diferentes ff:
            </label>
            <select
              value={builderTag}
              onChange={(e) => setBuilderTag(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            >
              {tagOptions.map((opt, i) => (
                <option key={i} value={opt}>{opt || "(Nenhum)"}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Bottom Row with Custom Suffix Option */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-800 justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-mono bg-slate-800 px-2 py-1 rounded text-orange-400">Dica:</span>
            <span>Altere os campos para ver as mudanças nas letras diferentes ff na hora.</span>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            {/* Custom Right Suffix */}
            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-2">
              <span className="text-[9px] text-slate-400 font-mono px-1">Fim:</span>
              <input
                type="text"
                value={builderSuffix}
                onChange={(e) => setBuilderSuffix(e.target.value)}
                placeholder="Ex: 亗"
                className="w-16 bg-transparent text-white font-mono text-xs focus:outline-none border-none py-1.5 px-1"
              />
            </div>

            {/* Print Trigger Copy Button */}
            <button
              onClick={() => handleCopyBuilder(builderOutput, "custom-builder")}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-orange-500/25 cursor-pointer"
            >
              {copiedId === "custom-builder" ? (
                <>
                  <Check className="w-4 h-4 animate-bounce" />
                  COPIADO COM SUCESSO!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  COPIAR LETRAS DIFERENTES FF
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 🚀 FEATURE 2: ESPAÇO INVISÍVEL HUB (Multiple Sizes & Generator) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="font-display text-lg font-bold text-[#0F172A] flex items-center gap-2">
            <Shield className="w-5 h-5 text-orange-500" />
            Central do Espaço Invisível para Letras Diferentes FF (Letra Oculta Free Fire)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Como o Free Fire bloqueia o espaço comum do teclado, utilize estes caracteres Unicode especiais combinados com suas <span className="text-orange-600 font-semibold">letras diferentes ff</span> para dar espaçamento de forma profissional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Big Space */}
          <div className="border border-slate-150 rounded-2xl p-4 space-y-3 bg-slate-50/50 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-700 text-[9px] font-bold uppercase tracking-wider">
                Grande (Mais Usado)
              </span>
              <h4 className="text-xs font-black text-slate-800">Espaço Invisível Grande para Letras Diferentes FF</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Caractere padrão Unicode HANGUL FILLER (U+3164). Perfeito para afastar suas letras diferentes ff.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-2 justify-between">
              <span className="font-mono bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-black text-slate-800">
                (ㅤ)
              </span>
              <button
                onClick={() => handleCopy("ㅤ", "space-big")}
                className="px-3 py-2 bg-[#0F172A] hover:bg-orange-600 text-white text-[10px] font-bold rounded-lg transition-all shrink-0 cursor-pointer"
              >
                {copiedId === "space-big" ? "COPIADO" : "COPIAR"}
              </button>
            </div>
          </div>

          {/* Medium Space */}
          <div className="border border-slate-150 rounded-2xl p-4 space-y-3 bg-slate-50/50 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-[9px] font-bold uppercase tracking-wider">
                Médio
              </span>
              <h4 className="text-xs font-black text-slate-800">Espaço Invisível Médio para Letras Diferentes FF</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Espaço intermediário especial para organizar nicks com letras diferentes ff em celulares incompatíveis.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-2 justify-between">
              <span className="font-mono bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-black text-slate-800">
                (ﾵ)
              </span>
              <button
                onClick={() => handleCopy("ﾵ", "space-medium")}
                className="px-3 py-2 bg-[#0F172A] hover:bg-orange-600 text-white text-[10px] font-bold rounded-lg transition-all shrink-0 cursor-pointer"
              >
                {copiedId === "space-medium" ? "COPIADO" : "COPIAR"}
              </button>
            </div>
          </div>

          {/* Small Space */}
          <div className="border border-slate-150 rounded-2xl p-4 space-y-3 bg-slate-50/50 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[9px] font-bold uppercase tracking-wider">
                Pequeno
              </span>
              <h4 className="text-xs font-black text-slate-800">Espaço Invisível Pequeno para Letras Diferentes FF</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Cria uma separação sutil de menos de meio milímetro entre as suas letras diferentes ff.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-2 justify-between">
              <span className="font-mono bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-black text-slate-800">
                ( )
              </span>
              <button
                onClick={() => handleCopy(" ", "space-small")}
                className="px-3 py-2 bg-[#0F172A] hover:bg-orange-600 text-white text-[10px] font-bold rounded-lg transition-all shrink-0 cursor-pointer"
              >
                {copiedId === "space-small" ? "COPIADO" : "COPIAR"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 FEATURE 3: DINAMIC APELIDOS GENERATOR GRID */}
      <div className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <Sword className="w-5 h-5 text-orange-500" />
              Sugerir e Gerar Combinações de Letras Diferentes FF Prontas
            </h3>
            <p className="text-xs text-slate-500">
              Digite abaixo para estilizar suas <span className="text-orange-600 font-bold">letras diferentes ff</span> instantaneamente, ou mude a aba para ver sugestões já estilizadas de letras diferentes ff.
            </p>
          </div>
          
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "all" ? "bg-[#0F172A] text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              Todos ({generatedFFNicks.length})
            </button>
            <button
              onClick={() => setActiveTab("tryhard")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "tryhard" ? "bg-orange-600 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              ⚡ Tryhard
            </button>
            <button
              onClick={() => setActiveTab("masculino")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "masculino" ? "bg-[#0F172A] text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              👦 Masculinos
            </button>
            <button
              onClick={() => setActiveTab("feminino")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "feminino" ? "bg-pink-600 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              👧 Femininos
            </button>
            <button
              onClick={() => setActiveTab("guildas")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "guildas" ? "bg-[#0F172A] text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              🛡️ Guildas
            </button>
            <button
              onClick={() => setActiveTab("casal")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "casal" ? "bg-red-600 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              ❤️ Casal / Duo
            </button>
          </div>
        </div>

        {/* Text Filter Input box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={nickInput}
              onChange={(e) => setNickInput(e.target.value)}
              placeholder="Escreva um apelido simples para estilizar com letras diferentes ff..."
              maxLength={14}
              className="w-full bg-[#F8FAFC]/50 border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-[#0F172A] font-sans focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/15 focus:border-slate-400 text-sm font-semibold"
            />
          </div>
          <button
            onClick={handleShuffleSuggestion}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 transition-all flex items-center justify-center gap-2 font-bold text-xs cursor-pointer"
          >
            <Shuffle className="w-4 h-4 text-slate-500" />
            NOME ALEATÓRIO SUGERIDO
          </button>
        </div>

        {/* Output Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNicks.map((nick) => (
            <div
              key={nick.id}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-4 transition-all hover:border-orange-500/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between group"
            >
              <div className="flex flex-col min-w-0 pr-2">
                <span className="font-mono text-sm md:text-base font-black text-[#0F172A] select-all truncate">
                  {nick.result}
                </span>
                <span className="text-[9px] uppercase font-bold text-slate-400 mt-1 font-mono tracking-wider">
                  {nick.style} • {nick.result.length} letras diferentes ff
                </span>
              </div>
              <button
                onClick={() => handleCopy(nick.result, nick.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer ${
                  copiedId === nick.id
                    ? "bg-emerald-600 text-white"
                    : "bg-[#0F172A] hover:bg-orange-600 text-white"
                }`}
              >
                {copiedId === nick.id ? "COPIADO" : "COPIAR"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🚀 FEATURE 4: STATIC READY-MADE LISTS (For inspiration if input is too long/short) */}
      <div className="bg-[#FAF9F6] border border-slate-200/60 rounded-3xl p-6 md:p-8 space-y-6">
        <div>
          <h3 className="font-display text-lg font-black text-[#0F172A] flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-500" />
            Catálogo de Letras Diferentes FF e Nomes de Free Fire Famosos
          </h3>
          <p className="text-xs text-slate-500">
            Inspire-se ou use diretamente as <span className="text-orange-600 font-bold">letras diferentes ff</span> mais temidas e estilosas prontas para o ranking de FF.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Masculinos / Tryhard */}
          <div className="space-y-3">
            <span className="text-xs font-black text-slate-800 flex items-center gap-1.5 border-b border-slate-200 pb-2 uppercase tracking-wider">
              <Sword className="w-4 h-4 text-orange-500" /> Apelões com Letras Diferentes FF
            </span>
            <div className="space-y-2">
              {readyMadeNicks.tryhard.slice(0, 6).map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-150 text-xs font-bold text-slate-700">
                  <span className="font-mono truncate">{item}</span>
                  <button
                    onClick={() => handleCopy(item, `ready-try-${i}`)}
                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-orange-500 transition-all"
                  >
                    {copiedId === `ready-try-${i}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Femininos */}
          <div className="space-y-3">
            <span className="text-xs font-black text-slate-800 flex items-center gap-1.5 border-b border-slate-200 pb-2 uppercase tracking-wider">
              <User className="w-4 h-4 text-pink-500" /> Gamer Feminino com Letras Diferentes FF
            </span>
            <div className="space-y-2">
              {readyMadeNicks.feminino.slice(0, 6).map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-150 text-xs font-bold text-slate-700">
                  <span className="font-mono truncate">{item}</span>
                  <button
                    onClick={() => handleCopy(item, `ready-fem-${i}`)}
                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-orange-500 transition-all"
                  >
                    {copiedId === `ready-fem-${i}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Duos / Casal */}
          <div className="space-y-3">
            <span className="text-xs font-black text-slate-800 flex items-center gap-1.5 border-b border-slate-200 pb-2 uppercase tracking-wider">
              <Users className="w-4 h-4 text-red-500" /> Casal / Duo com Letras Diferentes FF
            </span>
            <div className="space-y-2">
              {readyMadeNicks.casal.map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-150 text-xs font-bold text-slate-700">
                  <span className="font-mono text-[10px] truncate">{item}</span>
                  <button
                    onClick={() => handleCopy(item, `ready-casal-${i}`)}
                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-orange-500 transition-all"
                  >
                    {copiedId === `ready-casal-${i}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 FEATURE 5: CATEGORIZED SYMBOLS DICTIONARY */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 md:p-8 space-y-6">
        <div>
          <h3 className="font-display text-lg font-black text-[#0F172A] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-500" />
            Catálogo Completo de Símbolos e Letras Diferentes FF para Copiar
          </h3>
          <p className="text-xs text-slate-500">
            Dê um toque pro-player ao seu nick usando <span className="text-orange-600 font-bold">letras diferentes ff</span> modernas. Clique nos símbolos especiais abaixo para copiar instantaneamente e monte suas próprias letras diferentes ff de combate na nossa oficina acima.
          </p>
        </div>

        {/* Categories of Symbols */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {symbolCategories.map((category) => (
            <div key={category.name} className="space-y-3">
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider border-l-2 border-orange-500 pl-2 font-mono">
                {category.name}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {category.items.map((item, index) => {
                  const uniqueId = `${category.name}-${index}`;
                  return (
                    <button
                      key={uniqueId}
                      onClick={() => handleCopy(item, uniqueId)}
                      className={`w-10 h-10 flex items-center justify-center bg-slate-50 hover:bg-orange-50 hover:border-orange-400 border border-[#E2E8F0] rounded-xl text-sm transition-all relative cursor-pointer ${
                        copiedId === uniqueId ? "border-orange-500 bg-white text-orange-500 scale-105" : "text-[#0F172A] font-bold"
                      }`}
                      title="Copiar Símbolo"
                    >
                      {copiedId === uniqueId ? (
                        <Check className="w-4 h-4 text-emerald-600 animate-pulse" />
                      ) : (
                        item
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🚀 HIGH-VALUE GAMING SEO & HELP SECTION */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200/80 p-6 md:p-8 space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h3 className="font-display text-lg font-black text-[#0F172A] flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-orange-500" />
            Como Mudar o Apelido no Free Fire usando Letras Diferentes FF? Dúvidas e Dicas
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Entenda como funciona o sistema de nicks no jogo, cartões de mudança de nome e limites permitidos para letras diferentes ff.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 leading-relaxed">
          <div className="space-y-4 font-semibold">
            <div className="space-y-1">
              <h4 className="font-black text-slate-800 text-sm">1. Quantas letras diferentes ff posso usar no Nick do FF?</h4>
              <p className="text-slate-500 font-medium">
                A Garena estabelece um limite de 12 caracteres para o nome de usuário no perfil. Símbolos de decorações, espaço invisível e <span className="text-orange-600">letras diferentes ff</span> contam para o limite total. Certifique-se de que sua combinação de letras diferentes ff fique dentro do limite de tamanho estabelecido no jogo! Nossa oficina inteligente de letras diferentes ff calcula as dimensões do nick em tempo real!
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-black text-slate-800 text-sm">2. Como conseguir o Cartão de Mudança para aplicar minhas letras diferentes ff?</h4>
              <p className="text-slate-500 font-medium">
                Você pode trocar de nick para exibir suas novas <span className="text-orange-600">letras diferentes ff</span> usando 800 diamantes ou adquirindo um Cartão de Mudança de Apelido na loja da guilda para colocar letras diferentes ff no seu perfil do Free Fire.
              </p>
            </div>
          </div>

          <div className="space-y-4 font-semibold">
            <div className="space-y-1">
              <h4 className="font-black text-slate-800 text-sm">3. Por que algumas letras diferentes ff não aparecem no meu celular?</h4>
              <p className="text-slate-500 font-medium">
                Símbolos e <span className="text-orange-600">letras diferentes ff</span> raras dependem das fontes instaladas no sistema operacional do seu celular (Android ou iOS). Caso alguma das letras diferentes ff apareça como um quadrado vazio no teclado, outros jogadores ainda poderão ver suas letras diferentes ff normalmente dentro da partida de FF.
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-black text-slate-800 text-sm">4. Símbolo de Verificado combina com letras diferentes ff?</h4>
              <p className="text-slate-500 font-medium">
                Sim! O selo de verificado oficial e tags de clãs ficam perfeitos ao lado de <span className="text-orange-600">letras diferentes ff</span> no perfil do Free Fire, gerando nicks personalizados com letras diferentes ff incríveis para chamar a atenção dos oponentes.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic call to action card */}
        <div className="p-5 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-2xl border border-orange-500/20 text-xs">
          <span className="font-black text-[#0F172A] flex items-center gap-1.5 mb-1.5 uppercase tracking-wide">
            🔥 Como Criar Letras Diferentes FF de Forma Avançada?
          </span>
          <p className="text-slate-500 font-semibold leading-relaxed">
            Se você quer converter seu apelido com fontes góticas, elegantes ou cursivas de <span className="text-orange-600 font-bold">letras diferentes ff</span>, use a nossa ferramenta principal de letras diferentes ff no menu superior do site. Basta digitar seu nick para gerar milhares de letras diferentes ff e depois decorá-las com os símbolos mais irados das guildas!
          </p>
        </div>
      </div>
    </div>
  );
}

