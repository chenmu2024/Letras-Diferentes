import React, { useState, useMemo } from "react";
import { SUPERSCRIPT_MAP, SUBSCRIPT_MAP } from "../utils/textTransformers";
import { 
  Copy, 
  Check, 
  Sparkles, 
  Smile, 
  ArrowRight, 
  Keyboard, 
  Sliders, 
  ShieldAlert, 
  CheckCircle2, 
  RefreshCw, 
  HelpCircle, 
  Gamepad2, 
  Heart, 
  Crown, 
  Flame, 
  Trash2,
  Share2,
  BookOpen
} from "lucide-react";

interface LetrasPequenasProps {
  onNotify: (message: string) => void;
}

export default function LetrasPequenas({ onNotify }: LetrasPequenasProps) {
  const [inputText, setInputText] = useState("Letras");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Customizer States
  const [customPrefix, setCustomPrefix] = useState("꧁");
  const [customSuffix, setCustomSuffix] = useState("꧂");
  const [customBodyStyle, setCustomBodyStyle] = useState<"super" | "sub" | "caps" | "inverted" | "normal">("super");
  const [customSeparator, setCustomSeparator] = useState("");
  const [badgeTheme, setBadgeTheme] = useState<"cyber" | "imperial" | "angel" | "hacker">("cyber");
  const [keyboardAction, setKeyboardAction] = useState<"append" | "copy">("append");
  const [insertTarget, setInsertTarget] = useState<"body" | "prefix" | "suffix">("body");
  const [activeKeyboardTab, setActiveKeyboardTab] = useState(0);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    onNotify("Copiado com sucesso! ⚡ Prontinho para colar.");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Convert helpers
  const superscriptText = useMemo(() => {
    return inputText
      .split("")
      .map((char) => {
        const upper = char.toUpperCase();
        const lower = char.toLowerCase();
        return SUPERSCRIPT_MAP[lower] || SUPERSCRIPT_MAP[upper] || char;
      })
      .join("");
  }, [inputText]);

  const subscriptText = useMemo(() => {
    return inputText
      .split("")
      .map((char) => {
        const lower = char.toLowerCase();
        return SUBSCRIPT_MAP[lower] || char;
      })
      .join("");
  }, [inputText]);

  const smallCapsText = useMemo(() => {
    const capsMap: Record<string, string> = {
      a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ғ", g: "ɢ", h: "ʜ",
      i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ",
      q: "ǫ", r: "ʀ", s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x",
      y: "ʏ", z: "ᴢ"
    };
    return inputText
      .toLowerCase()
      .split("")
      .map((char) => capsMap[char] || char)
      .join("");
  }, [inputText]);

  const upsideDownText = useMemo(() => {
    const UPSIDE_DOWN_MAP: Record<string, string> = {
      a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ɓ", h: "ɥ",
      i: "ı", j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d",
      q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x",
      y: "ʎ", z: "z",
      A: "Ɐ", B: "ᗺ", C: "Ɔ", D: "Ǝ", E: "Ǝ", F: "Ⅎ", G: "⅁", H: "H",
      I: "I", J: "ſ", K: "ʞ", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ",
      Q: "Ό", R: "ᴚ", S: "S", T: "┴", U: "∩", V: "Λ", W: "M", X: "X",
      Y: "⅄", Z: "Z",
      "0": "0", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "ϛ", "6": "9", "7": "ㄥ", "8": "8", "9": "6"
    };
    const converted = inputText
      .split("")
      .map((char) => UPSIDE_DOWN_MAP[char] || UPSIDE_DOWN_MAP[char.toLowerCase()] || char)
      .join("");
    return converted.split("").reverse().join("");
  }, [inputText]);

  // Prefix & Suffix preset chips
  const PREFIX_PRESETS = [
    { label: "Asas", value: "꧁" },
    { label: "Coroa FF", value: "亗" },
    { label: "Garras", value: "╰•𓆩" },
    { label: "Guarda-chuva", value: "☂️" },
    { label: "Flor", value: "✿" },
    { label: "Estrela", value: "★彡" },
    { label: "Raio", value: "⚡" },
    { label: "Anjo", value: "ʚ𓆩" },
    { label: "Caveira", value: "☠️" },
    { label: "Marca", value: "『" }
  ];

  const SUFFIX_PRESETS = [
    { label: "Asas", value: "꧂" },
    { label: "Coroa FF", value: "亗" },
    { label: "Garras", value: "𓆪•╯" },
    { label: "Guarda-chuva", value: "☂️" },
    { label: "Flor", value: "✿" },
    { label: "Estrela", value: "彡★" },
    { label: "Raio", value: "⚡" },
    { label: "Anjo", value: "𓆪ɞ" },
    { label: "Caveira", value: "☠️" },
    { label: "Marca", value: "』" }
  ];

  // Symbol keyboard categories
  const SYMBOL_CATEGORIES = [
    {
      name: "🔥 Populares",
      symbols: ["亗", "꧂", "꧁", "☂️", "☠️", "✿", "👑", "⚡", "〆", "々", "𓆩", "𓆪", "✝️", "☯️", "⚔️", "❄️"]
    },
    {
      name: "👑 Realeza & Raros",
      symbols: ["👑", "亗", "𐂡", "𐂂", "𓅓", "𓆏", "𓃠", "𓃗", "⚜️", "𐇵", "✧", "✦", "✪", "❂", "🪐", "⚓"]
    },
    {
      name: "💖 Amor & Estrelas",
      symbols: ["❤️", "💖", "💝", "💘", "🤍", "🖤", "💙", "💚", "💛", "💜", "♥", "♡", "★", "☆", "🌟", "⭐", "☄️", "✨"]
    },
    {
      name: "⚔️ Armas & Pontas",
      symbols: ["︻╦̵̵͇̿̿̿̿╤──", "⚔️", "🏹", "➸", "𓆩", "𓆪", "ʚ𓆩", "𓆪ɞ", "彡", "ミ", "𐕣", "➳", "➵", "➛", "➸", "🔫"]
    },
    {
      name: "『』 Bordas & Parênteses",
      symbols: ["『』", "〖〗", "【】", "（）", "《》", "⟨⟩", "「」", "⟦⟧", "⦗⦘", "『", "』", "【", "】", "«", "»"]
    }
  ];

  const handleSymbolClick = (symbol: string) => {
    if (keyboardAction === "copy") {
      navigator.clipboard.writeText(symbol);
      onNotify(`Símbolo "${symbol}" copiado para a área de transferência!`);
    } else {
      if (insertTarget === "prefix") {
        setCustomPrefix((prev) => prev + symbol);
        onNotify(`Símbolo adicionado ao prefixo! ⬅️`);
      } else if (insertTarget === "suffix") {
        setCustomSuffix((prev) => prev + symbol);
        onNotify(`Símbolo adicionado ao sufixo! ➡️`);
      } else {
        setInputText((prev) => prev + symbol);
        onNotify(`Símbolo adicionado ao texto principal! ✍️`);
      }
    }
  };

  // Build custom nickname based on state
  const customBodyTransformed = useMemo(() => {
    const letters = inputText.split("");
    const separator = customSeparator;

    const transformedLetters = letters.map((char) => {
      if (customBodyStyle === "super") {
        const upper = char.toUpperCase();
        const lower = char.toLowerCase();
        return SUPERSCRIPT_MAP[lower] || SUPERSCRIPT_MAP[upper] || char;
      }
      if (customBodyStyle === "sub") {
        const lower = char.toLowerCase();
        return SUBSCRIPT_MAP[lower] || char;
      }
      if (customBodyStyle === "caps") {
        const capsMap: Record<string, string> = {
          a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ғ", g: "ɢ", h: "ʜ",
          i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ",
          q: "ǫ", r: "ʀ", s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x",
          y: "ʏ", z: "ᴢ"
        };
        return capsMap[char.toLowerCase()] || char;
      }
      if (customBodyStyle === "inverted") {
        const UPSIDE_DOWN_MAP: Record<string, string> = {
          a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ɓ", h: "ɥ",
          i: "ı", j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d",
          q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x",
          y: "ʎ", z: "z",
          A: "Ɐ", B: "ᗺ", C: "Ɔ", D: "Ǝ", E: "Ǝ", F: "Ⅎ", G: "⅁", H: "H",
          I: "I", J: "ſ", K: "ʞ", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ",
          Q: "Ό", R: "ᴚ", S: "S", T: "┴", U: "∩", V: "Λ", W: "M", X: "X",
          Y: "⅄", Z: "Z",
          "0": "0", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "ϛ", "6": "9", "7": "ㄥ", "8": "8", "9": "6"
        };
        return UPSIDE_DOWN_MAP[char] || UPSIDE_DOWN_MAP[char.toLowerCase()] || char;
      }
      return char;
    });

    const joinedText = customBodyStyle === "inverted"
      ? transformedLetters.reverse().join(separator)
      : transformedLetters.join(separator);

    return joinedText;
  }, [inputText, customBodyStyle, customSeparator]);

  const customFullNick = useMemo(() => {
    return `${customPrefix}${customBodyTransformed}${customSuffix}`;
  }, [customPrefix, customBodyTransformed, customSuffix]);

  // Combined Nicknames decorators preset list
  const nicknamePresets = useMemo(() => {
    const text = inputText || "Nick";
    const superText = superscriptText || "ᶰᶦᶜᵏ";
    const subText = subscriptText || "ₙᵢcₖ";
    const caps = smallCapsText || "ɴɪᴄᴋ";
    const inverted = upsideDownText || "ʞɔıu";
    
    return [
      { id: "p1", result: `⚡ ${caps} ${superText} ⚡` },
      { id: "p2", result: `꧁ ${caps} ${superText} ꧂` },
      { id: "p3", result: `亗 ${caps} ${superText} 亗` },
      { id: "p4", result: `☂️ ${caps} ${superText} ☂️` },
      { id: "p5", result: `☠️ ${caps}_${subText} ☠️` },
      { id: "p6", result: `✿ ${caps} ${superText} ✿` },
      { id: "p7", result: `👑 ${caps} ${superText} 👑` },
      { id: "p8", result: `╰•𓆩 ${caps} 𓆪•╯` },
      { id: "p9", result: `꧁༺ ${caps} ༻꧂` },
      { id: "p10", result: `〆 ${inverted} 々` },
      { id: "p11", result: `『 ${caps} ${superText} 』` },
      { id: "p12", result: `ʚ𓆩 ${caps} 𓆪ɞ` }
    ];
  }, [inputText, superscriptText, subscriptText, smallCapsText, upsideDownText]);

  // Verification limits helper
  const validationFF = useMemo(() => {
    const len = customFullNick.length;
    return {
      len,
      valid: len <= 12,
      max: 12
    };
  }, [customFullNick]);

  const validationRoblox = useMemo(() => {
    const len = customFullNick.length;
    return {
      len,
      valid: len <= 20,
      max: 20
    };
  }, [customFullNick]);

  const validationInsta = useMemo(() => {
    const len = customFullNick.length;
    return {
      len,
      valid: len <= 30,
      max: 30
    };
  }, [customFullNick]);

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div className="text-center md:text-left space-y-3.5 border-b border-slate-200/60 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/50 text-[11px] text-[#4F46E5] font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
          <span>Micro-Formatos de Letras Unicode</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
          Letras <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-violet-600">Pequenas</span> para Nick
        </h1>
        <p className="text-xs md:text-sm text-slate-500 max-w-3xl leading-relaxed font-semibold">
          Use o melhor gerador de <strong>letras pequenas</strong> para criar seu nick personalizado! Se você precisa de uma <strong>letra pequena</strong> bonita para Free Fire, Roblox ou Fortnite, nosso site gera <strong>letras pequenas</strong> sobrescritas e subscritas em segundos. Descubra como cada <strong>letra pequena</strong> pode transformar o seu visual nas redes sociais e jogos com nossas ferramentas exclusivas de <strong>letras pequenas</strong> para copiar.
        </p>
      </div>

      {/* Primary Input Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full pointer-events-none" />
        <div>
          <label className="block text-[11px] font-extrabold text-[#0F172A] uppercase tracking-widest mb-3 font-mono flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
            Digite sua palavra ou apelido principal:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ex: Letras, ProNick, Vandal..."
              maxLength={40}
              className="flex-1 bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-3.5 text-[#0F172A] font-sans placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-[#4F46E5] focus:bg-white transition-all text-lg font-bold leading-normal"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setInputText("Vandal");
                  onNotify("Exemplo carregado! ⚡");
                }}
                className="px-4 py-3.5 bg-slate-50 border border-slate-200 hover:border-indigo-200 rounded-2xl text-xs font-bold text-slate-600 hover:text-indigo-600 transition-all cursor-pointer font-sans"
                title="Carregar exemplo rápido"
              >
                Exemplo
              </button>
              <button
                onClick={() => {
                  setInputText("");
                  onNotify("Limpado! 🧹");
                }}
                className="px-4 py-3.5 bg-slate-50 border border-slate-200 hover:border-rose-200 hover:bg-rose-50/30 rounded-2xl text-xs font-bold text-slate-500 hover:text-rose-600 transition-all cursor-pointer font-sans"
                title="Limpar campo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setInputText("Letras");
                  setCustomPrefix("꧁");
                  setCustomSuffix("꧂");
                  setCustomBodyStyle("super");
                  setCustomSeparator("");
                  onNotify("Configurações resetadas! 🔄");
                }}
                className="px-5 py-3.5 bg-slate-50 border border-slate-200 hover:border-indigo-600 rounded-2xl text-xs font-bold text-slate-700 hover:text-[#4F46E5] transition-all cursor-pointer font-sans uppercase tracking-wider shrink-0 flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Resetar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE CUSTOM NICKNAME BUILDER (O ESTÚDIO DE CRIAÇÃO) */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 text-white space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F46E5]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Header Block */}
        <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-lg inline-block font-mono">
              Ferramenta VIP
            </span>
            <h3 className="font-sans font-black text-xl md:text-2xl mt-1.5 uppercase tracking-tight flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-400" />
              Estúdio Criador de Super Nick
            </h3>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed mt-0.5">
              Personalize, decore e verifique o tamanho do seu apelido para qualquer jogo em tempo real.
            </p>
          </div>

          {/* Holographic Badge Theme Selector */}
          <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 flex gap-1">
            <button
              onClick={() => setBadgeTheme("cyber")}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all cursor-pointer ${
                badgeTheme === "cyber" ? "bg-pink-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              🌌 Cyber
            </button>
            <button
              onClick={() => setBadgeTheme("imperial")}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all cursor-pointer ${
                badgeTheme === "imperial" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"
              }`}
            >
              👑 Gold
            </button>
            <button
              onClick={() => setBadgeTheme("angel")}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all cursor-pointer ${
                badgeTheme === "angel" ? "bg-indigo-500 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              👼 Angel
            </button>
            <button
              onClick={() => setBadgeTheme("hacker")}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all cursor-pointer ${
                badgeTheme === "hacker" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"
              }`}
            >
              👾 Hacker
            </button>
          </div>
        </div>

        {/* Builder Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Box: left side */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Custom Decorators Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Prefix input */}
              <div className="space-y-2">
                <label className="block text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">
                  ⬅️ Prefixo / Decoração Esquerda:
                </label>
                <input
                  type="text"
                  value={customPrefix}
                  onChange={(e) => setCustomPrefix(e.target.value)}
                  placeholder="Ex: ꧁"
                  className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-sans font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {/* Prefix preset chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PREFIX_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCustomPrefix(preset.value);
                        onNotify(`Prefixo "${preset.value}" selecionado!`);
                      }}
                      className="text-[9px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 font-bold font-sans transition-all cursor-pointer"
                    >
                      {preset.label}: {preset.value}
                    </button>
                  ))}
                  <button
                    onClick={() => setCustomPrefix("")}
                    className="text-[9px] px-2 py-1 rounded bg-rose-950/30 text-rose-400 border border-rose-900/40 font-bold font-sans transition-all cursor-pointer"
                  >
                    Nenhum
                  </button>
                </div>
              </div>

              {/* Suffix input */}
              <div className="space-y-2">
                <label className="block text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">
                  ➡️ Sufixo / Decoração Direita:
                </label>
                <input
                  type="text"
                  value={customSuffix}
                  onChange={(e) => setCustomSuffix(e.target.value)}
                  placeholder="Ex: ꧂"
                  className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-sans font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {/* Suffix preset chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {SUFFIX_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCustomSuffix(preset.value);
                        onNotify(`Sufixo "${preset.value}" selecionado!`);
                      }}
                      className="text-[9px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 font-bold font-sans transition-all cursor-pointer"
                    >
                      {preset.label}: {preset.value}
                    </button>
                  ))}
                  <button
                    onClick={() => setCustomSuffix("")}
                    className="text-[9px] px-2 py-1 rounded bg-rose-950/30 text-rose-400 border border-rose-900/40 font-bold font-sans transition-all cursor-pointer"
                  >
                    Nenhum
                  </button>
                </div>
              </div>
            </div>

            {/* Formatting & Style choices */}
            <div className="space-y-3.5">
              <label className="block text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">
                ⚙️ Formato das Letras do Corpo:
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <button
                  onClick={() => setCustomBodyStyle("super")}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    customBodyStyle === "super"
                      ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                      : "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="text-[9px] text-indigo-300">SOBRESCRITO</span>
                  <span className="font-mono text-base font-extrabold">ᵃᵇᶜ</span>
                </button>
                <button
                  onClick={() => setCustomBodyStyle("sub")}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    customBodyStyle === "sub"
                      ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                      : "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="text-[9px] text-indigo-300">SUBSCRITO</span>
                  <span className="font-mono text-base font-extrabold">ₐ_c</span>
                </button>
                <button
                  onClick={() => setCustomBodyStyle("caps")}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    customBodyStyle === "caps"
                      ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                      : "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="text-[9px] text-indigo-300">SMALL CAPS</span>
                  <span className="font-mono text-base font-extrabold">ᴀʙᴄ</span>
                </button>
                <button
                  onClick={() => setCustomBodyStyle("inverted")}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    customBodyStyle === "inverted"
                      ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                      : "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="text-[9px] text-indigo-300">INVERTIDO</span>
                  <span className="font-mono text-base font-extrabold">ɐqɔ</span>
                </button>
                <button
                  onClick={() => setCustomBodyStyle("normal")}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    customBodyStyle === "normal"
                      ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                      : "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="text-[9px] text-indigo-300">NORMAL</span>
                  <span className="font-mono text-base font-extrabold">abc</span>
                </button>
              </div>
            </div>

            {/* Separators configuration */}
            <div className="space-y-3.5">
              <label className="block text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">
                🔗 Separador de Caracteres:
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Nenhum", value: "" },
                  { label: "Espaço", value: " " },
                  { label: "Ponto (•)", value: "•" },
                  { label: "Tracinho (_)", value: "_" },
                  { label: "Estrela (★)", value: "★" },
                  { label: "Onda (~)", value: "~" }
                ].map((sep) => (
                  <button
                    key={sep.label}
                    onClick={() => {
                      setCustomSeparator(sep.value);
                      onNotify(`Separador "${sep.label}" ativado!`);
                    }}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      customSeparator === sep.value
                        ? "bg-slate-100 text-slate-900 border-white shadow-md shadow-white/5"
                        : "bg-slate-950/50 border-slate-850 text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    {sep.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* HOLOGRAPHIC PREVIEW BADGE: right side */}
          <div className="lg:col-span-5 space-y-5">
            <label className="block text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">
              👁️ Visualização do Crachá de Jogador:
            </label>

            {/* Cyber Neon Badge Theme */}
            {badgeTheme === "cyber" && (
              <div className="bg-slate-950 border border-pink-500/40 rounded-3xl p-6 shadow-[0_0_25px_rgba(236,72,153,0.15)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-xl pointer-events-none" />
                <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] font-mono font-extrabold text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2.5 py-0.5 rounded uppercase tracking-wider">
                    CYBER-NICK V.2
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" /> LIVE PREVIEW
                  </span>
                </div>
                <div className="text-center py-6 border-y border-slate-800/80 my-4 bg-slate-900/50 rounded-2xl relative">
                  <p className="text-2xl md:text-3xl font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-indigo-200 tracking-wide select-all break-all leading-normal px-2">
                    {customFullNick || "SeuNick"}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(customFullNick, "custom")}
                  className={`w-full py-4 rounded-2xl text-xs font-bold tracking-widest transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                    copiedId === "custom"
                      ? "bg-emerald-500 text-white scale-95 shadow-md shadow-emerald-500/10"
                      : "bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20"
                  }`}
                >
                  {copiedId === "custom" ? (
                    <>
                      <Check className="w-4.5 h-4.5 text-white" />
                      COPIADO COM SUCESSO!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4.5 h-4.5" />
                      COPIAR APELIDO DECORADO
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Imperial Gold Theme */}
            {badgeTheme === "imperial" && (
              <div className="bg-[#0b0f19] border border-amber-500/50 rounded-3xl p-6 shadow-[0_0_25px_rgba(245,158,11,0.15)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] font-mono font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                    <Crown className="w-3 h-3 text-amber-500" /> ROYALTY CHASSIS
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> LIVE PREVIEW
                  </span>
                </div>
                <div className="text-center py-6 border-y border-amber-950/40 my-4 bg-slate-950/80 rounded-2xl relative">
                  <p className="text-2xl md:text-3xl font-sans font-black text-amber-300 tracking-wide select-all break-all leading-normal px-2">
                    {customFullNick || "SeuNick"}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(customFullNick, "custom")}
                  className={`w-full py-4 rounded-2xl text-xs font-bold tracking-widest transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                    copiedId === "custom"
                      ? "bg-emerald-500 text-slate-950 scale-95 shadow-md shadow-emerald-500/10"
                      : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20"
                  }`}
                >
                  {copiedId === "custom" ? (
                    <>
                      <Check className="w-4.5 h-4.5 text-slate-950" />
                      COPIADO COM SUCESSO!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4.5 h-4.5" />
                      COPIAR APELIDO REAL
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Angel Dream Theme */}
            {badgeTheme === "angel" && (
              <div className="bg-gradient-to-r from-indigo-950 to-slate-950 border border-indigo-400/40 rounded-3xl p-6 shadow-[0_0_25px_rgba(99,102,241,0.15)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] font-mono font-extrabold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                    <Heart className="w-3 h-3 text-pink-400" /> ANGELIC SKY
                  </span>
                  <span className="text-[10px] font-mono text-indigo-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" /> LIVE PREVIEW
                  </span>
                </div>
                <div className="text-center py-6 border-y border-indigo-900/40 my-4 bg-slate-900/50 rounded-2xl relative">
                  <p className="text-2xl md:text-3xl font-sans font-black text-indigo-100 tracking-wide select-all break-all leading-normal px-2">
                    {customFullNick || "SeuNick"}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(customFullNick, "custom")}
                  className={`w-full py-4 rounded-2xl text-xs font-bold tracking-widest transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                    copiedId === "custom"
                      ? "bg-emerald-500 text-white scale-95 shadow-md"
                      : "bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-lg shadow-indigo-500/10"
                  }`}
                >
                  {copiedId === "custom" ? (
                    <>
                      <Check className="w-4.5 h-4.5 text-white" />
                      COPIADO COM SUCESSO!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4.5 h-4.5" />
                      COPIAR APELIDO DIVINO
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Hacker Obsidian Theme */}
            {badgeTheme === "hacker" && (
              <div className="bg-black border border-emerald-500/40 rounded-3xl p-6 shadow-[0_0_25px_rgba(16,185,129,0.15)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] font-mono font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded uppercase tracking-wider">
                    👾 OBSIDIAN_NODE
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE PREVIEW
                  </span>
                </div>
                <div className="text-center py-6 border-y border-emerald-950/40 my-4 bg-emerald-950/10 rounded-2xl relative">
                  <p className="text-2xl md:text-3xl font-mono font-extrabold text-emerald-400 tracking-wide select-all break-all leading-normal px-2">
                    {customFullNick || "SeuNick"}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(customFullNick, "custom")}
                  className={`w-full py-4 rounded-2xl text-xs font-bold tracking-widest transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                    copiedId === "custom"
                      ? "bg-emerald-600 text-slate-950 scale-95"
                      : "bg-emerald-950 border border-emerald-500/60 hover:bg-emerald-900 text-emerald-400 shadow-lg shadow-emerald-500/10"
                  }`}
                >
                  {copiedId === "custom" ? (
                    <>
                      <Check className="w-4.5 h-4.5 text-white" />
                      COPIADO COM SUCESSO!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4.5 h-4.5" />
                      COPIAR APELIDO MATRIX
                    </>
                  )}
                </button>
              </div>
            )}

            {/* REAL-TIME CHARACTER LIMIT VALIDATOR */}
            <div className="bg-slate-950/80 border border-slate-850 rounded-2xl p-4 space-y-3">
              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 block font-bold">
                Validador de Tamanho para Jogos &amp; Redes:
              </span>
              
              <div className="space-y-2.5">
                {/* Free Fire */}
                <div>
                  <div className="flex justify-between items-center text-[10.5px] font-mono">
                    <span className="text-slate-300 flex items-center gap-1">
                      <Gamepad2 className="w-3.5 h-3.5 text-pink-500" /> Free Fire (Max 12)
                    </span>
                    <span className={validationFF.valid ? "text-emerald-400 font-extrabold" : "text-rose-400 font-extrabold"}>
                      {validationFF.len}/{validationFF.max}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${validationFF.valid ? "bg-emerald-500" : "bg-rose-500"}`}
                      style={{ width: `${Math.min((validationFF.len / validationFF.max) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Roblox */}
                <div>
                  <div className="flex justify-between items-center text-[10.5px] font-mono">
                    <span className="text-slate-300 flex items-center gap-1">
                      <Gamepad2 className="w-3.5 h-3.5 text-indigo-400" /> Roblox (Max 20)
                    </span>
                    <span className={validationRoblox.valid ? "text-emerald-400 font-extrabold" : "text-rose-400 font-extrabold"}>
                      {validationRoblox.len}/{validationRoblox.max}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${validationRoblox.valid ? "bg-emerald-500" : "bg-rose-500"}`}
                      style={{ width: `${Math.min((validationRoblox.len / validationRoblox.max) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Instagram */}
                <div>
                  <div className="flex justify-between items-center text-[10.5px] font-mono">
                    <span className="text-slate-300 flex items-center gap-1">
                      <Smile className="w-3.5 h-3.5 text-amber-500" /> Instagram Bio (Max 30)
                    </span>
                    <span className={validationInsta.valid ? "text-emerald-400 font-extrabold" : "text-rose-400 font-extrabold"}>
                      {validationInsta.len}/{validationInsta.max}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${validationInsta.valid ? "bg-emerald-500" : "bg-rose-500"}`}
                      style={{ width: `${Math.min((validationInsta.len / validationInsta.max) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* DYNAMIC VIRTUAL SYMBOL KEYBOARD */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-500/5 to-transparent rounded-full pointer-events-none" />
        
        {/* Keyboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-pink-50 text-pink-600 rounded-2xl border border-pink-100">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-black text-[#0F172A] uppercase tracking-tight flex items-center gap-1.5">
                Teclado Virtual de Símbolos &amp; Letras para Nick
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mt-0.5">
                Clique nos caracteres raros abaixo para utilizá-los no seu apelido instantaneamente!
              </p>
            </div>
          </div>

          {/* Action settings */}
          <div className="flex flex-wrap gap-2 text-xs">
            {/* Click Mode action */}
            <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200">
              <button
                onClick={() => setKeyboardAction("append")}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  keyboardAction === "append" ? "bg-white text-[#4F46E5] shadow-sm" : "text-slate-500"
                }`}
              >
                ✍️ Inserir no Criador
              </button>
              <button
                onClick={() => setKeyboardAction("copy")}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  keyboardAction === "copy" ? "bg-white text-[#4F46E5] shadow-sm" : "text-slate-500"
                }`}
              >
                📋 Copiar Direto
              </button>
            </div>

            {/* If Mode is Append, select target */}
            {keyboardAction === "append" && (
              <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200">
                <button
                  onClick={() => setInsertTarget("prefix")}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    insertTarget === "prefix" ? "bg-indigo-100 text-indigo-700 font-extrabold" : "text-slate-500"
                  }`}
                  title="Inserir no prefixo"
                >
                  ⬅️ Prefixo
                </button>
                <button
                  onClick={() => setInsertTarget("body")}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    insertTarget === "body" ? "bg-indigo-100 text-indigo-700 font-extrabold" : "text-slate-500"
                  }`}
                  title="Inserir no texto principal"
                >
                  ✍️ Texto
                </button>
                <button
                  onClick={() => setInsertTarget("suffix")}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    insertTarget === "suffix" ? "bg-indigo-100 text-indigo-700 font-extrabold" : "text-slate-500"
                  }`}
                  title="Inserir no sufixo"
                >
                  ➡️ Sufixo
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
          {SYMBOL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.name}
              onClick={() => setActiveKeyboardTab(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeKeyboardTab === idx
                  ? "bg-[#0F172A] text-white"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Symbols Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
          {SYMBOL_CATEGORIES[activeKeyboardTab].symbols.map((symbol) => (
            <button
              key={symbol}
              onClick={() => handleSymbolClick(symbol)}
              className="p-3 bg-slate-50 border border-slate-100 hover:border-[#4F46E5] hover:bg-[#4F46E5]/5 text-slate-800 hover:text-[#4F46E5] rounded-xl text-base font-extrabold transition-all duration-300 cursor-pointer flex items-center justify-center font-sans active:scale-90"
              title={`Clique para ${keyboardAction === "copy" ? "copiar" : "inserir"} ${symbol}`}
            >
              {symbol}
            </button>
          ))}
        </div>
      </div>

      {/* CORE micro-font outputs for individual copy */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Superscript */}
        <div className="editorial-card p-6 flex flex-col justify-between group relative overflow-hidden bg-white border border-slate-200/80 rounded-3xl">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#4F46E5] bg-indigo-50/80 border border-indigo-100/60 px-2.5 py-0.5 rounded-lg inline-block">
              Sobrescrito (Letras Pequenas Altas)
            </span>
            <p className="text-[11px] text-slate-400 font-semibold leading-normal">
              Gere cada <strong>letra pequena</strong> suspensa no topo com nosso transformador de <strong>letras pequenas</strong>.
            </p>
            <p className="text-2xl md:text-3xl text-[#0F172A] font-sans font-extrabold py-3 select-all break-all leading-normal min-h-[5rem] transition-colors group-hover:text-indigo-950">
              {superscriptText || "ᵃᵇᶜ"}
            </p>
          </div>
          <button
            onClick={() => handleCopy(superscriptText, "super")}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
              copiedId === "super"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/10 scale-95"
                : "bg-[#0F172A] hover:bg-[#4F46E5] text-white hover:shadow-md hover:shadow-indigo-500/10"
            }`}
          >
            {copiedId === "super" ? (
              <>
                <Check className="w-4.5 h-4.5 text-white" />
                COPIADO COM SUCESSO!
              </>
            ) : (
              <>
                <Copy className="w-4.5 h-4.5" />
                COPIAR SOBRESCRITO
              </>
            )}
          </button>
        </div>

        {/* Subscript */}
        <div className="editorial-card p-6 flex flex-col justify-between group relative overflow-hidden bg-white border border-slate-200/80 rounded-3xl">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#4F46E5] bg-indigo-50/80 border border-indigo-100/60 px-2.5 py-0.5 rounded-lg inline-block">
              Subscrito (Letras Pequenas Baixas)
            </span>
            <p className="text-[11px] text-slate-400 font-semibold leading-normal">
              Ideal para criar um visual de <strong>letra pequena</strong> inferior usando <strong>letras pequenas</strong> subscritas.
            </p>
            <p className="text-2xl md:text-3xl text-[#0F172A] font-sans font-extrabold py-3 select-all break-all leading-normal min-h-[5rem] transition-colors group-hover:text-indigo-950">
              {subscriptText || "ₐ_c"}
            </p>
          </div>
          <button
            onClick={() => handleCopy(subscriptText, "sub")}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
              copiedId === "sub"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/10 scale-95"
                : "bg-[#0F172A] hover:bg-[#4F46E5] text-white hover:shadow-md hover:shadow-indigo-500/10"
            }`}
          >
            {copiedId === "sub" ? (
              <>
                <Check className="w-4.5 h-4.5 text-white" />
                COPIADO COM SUCESSO!
              </>
            ) : (
              <>
                <Copy className="w-4.5 h-4.5" />
                COPIAR SUBSCRITO
              </>
            )}
          </button>
        </div>

        {/* Small Caps */}
        <div className="editorial-card p-6 flex flex-col justify-between group relative overflow-hidden bg-white border border-slate-200/80 rounded-3xl">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#4F46E5] bg-indigo-50/80 border border-indigo-100/60 px-2.5 py-0.5 rounded-lg inline-block">
              Mini Caixa Alta (Letras Pequenas)
            </span>
            <p className="text-[11px] text-slate-400 font-semibold leading-normal">
              Um formato onde cada <strong>letra pequena</strong> fica em caixa alta menor, combinando com <strong>letras pequenas</strong>.
            </p>
            <p className="text-2xl md:text-3xl text-[#0F172A] font-sans font-extrabold py-3 select-all break-all leading-normal min-h-[5rem] transition-colors group-hover:text-indigo-950">
              {smallCapsText || "ᴀʙᴄ"}
            </p>
          </div>
          <button
            onClick={() => handleCopy(smallCapsText, "caps")}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
              copiedId === "caps"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/10 scale-95"
                : "bg-[#0F172A] hover:bg-[#4F46E5] text-white hover:shadow-md hover:shadow-indigo-500/10"
            }`}
          >
            {copiedId === "caps" ? (
              <>
                <Check className="w-4.5 h-4.5 text-white" />
                COPIADO COM SUCESSO!
              </>
            ) : (
              <>
                <Copy className="w-4.5 h-4.5" />
                COPIAR SMALL CAPS
              </>
            )}
          </button>
        </div>

        {/* Upside Down */}
        <div className="editorial-card p-6 flex flex-col justify-between group relative overflow-hidden bg-white border border-slate-200/80 rounded-3xl">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#4F46E5] bg-indigo-50/80 border border-indigo-100/60 px-2.5 py-0.5 rounded-lg inline-block">
              Invertido (Letras Pequenas Inversas)
            </span>
            <p className="text-[11px] text-slate-400 font-semibold leading-normal">
              Inverta e rotacione sua <strong>letra pequena</strong> para destacar suas <strong>letras pequenas</strong> em qualquer jogo.
            </p>
            <p className="text-2xl md:text-3xl text-[#0F172A] font-sans font-extrabold py-3 select-all break-all leading-normal min-h-[5rem] transition-colors group-hover:text-indigo-950">
              {upsideDownText || "ɐqɔ"}
            </p>
          </div>
          <button
            onClick={() => handleCopy(upsideDownText, "inverted")}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
              copiedId === "inverted"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/10 scale-95"
                : "bg-[#0F172A] hover:bg-[#4F46E5] text-white hover:shadow-md hover:shadow-indigo-500/10"
            }`}
          >
            {copiedId === "inverted" ? (
              <>
                <Check className="w-4.5 h-4.5 text-white" />
                COPIADO COM SUCESSO!
              </>
            ) : (
              <>
                <Copy className="w-4.5 h-4.5" />
                COPIAR INVERTIDO
              </>
            )}
          </button>
        </div>
      </div>

      {/* Popular Nickname Combinations using small letters */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full pointer-events-none" />
        <div>
          <h3 className="font-display text-base font-black text-[#0F172A] flex items-center gap-2">
            <span className="p-2 bg-indigo-50 text-[#4F46E5] rounded-xl border border-indigo-100">
              <Flame className="w-5 h-5 text-indigo-500" />
            </span>
            Ideias Prontas de Nicks com Letras Pequenininhas
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
            Nicks estilizados prontos para copiar misturando caracteres minúsculos de topo, símbolos asiáticos e decorações de elite.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {nicknamePresets.map((preset) => (
            <div
              key={preset.id}
              className="p-4 bg-slate-50 border border-slate-150 rounded-2xl flex items-center justify-between group hover:border-[#4F46E5]/40 hover:bg-white transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.01)]"
            >
              <span className="text-sm text-[#0F172A] font-black select-all truncate pr-1 font-sans">
                {preset.result}
              </span>
              <button
                onClick={() => handleCopy(preset.result, preset.id)}
                className="p-2 bg-white text-slate-500 hover:bg-[#4F46E5] hover:text-white rounded-xl border border-slate-200 transition-all duration-300 cursor-pointer shrink-0 hover:shadow-sm"
                title="Copiar Nick Decorado"
              >
                {copiedId === preset.id ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Guia de Otimização e SEO - Manual Completo */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6">
        <h3 className="font-display text-lg font-black text-[#0F172A] flex items-center gap-2 uppercase tracking-tight">
          <span className="p-2 bg-indigo-100 text-[#4F46E5] rounded-xl">
            <BookOpen className="w-5 h-5 text-indigo-500" />
          </span>
          Guia de Letra Pequena e Letras Pequenas para Nick
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm text-slate-600 leading-relaxed font-semibold">
          <div className="space-y-4">
            <p>
              Quer saber por que usar uma <strong>letra pequena</strong> ou várias <strong>letras pequenas</strong> no seu nick é o segredo dos pro players? No cenário competitivo de jogos como Free Fire e Roblox, destacar-se é fundamental. Ao inserir uma <strong>letra pequena</strong> estilizada, você cria um design exclusivo. Nosso gerador de <strong>letras pequenas</strong> foi programado para facilitar essa transformação, convertendo o alfabeto normal em <strong>letras pequenas</strong> ideais para nick.
            </p>
            <p>
              Muitos usuários se perguntam se qualquer <strong>letra pequena</strong> é aceita nos jogos. A resposta é sim, desde que você utilize as <strong>letras pequenas</strong> certas! Nosso sistema garante que a sua <strong>letra pequena</strong> seja gerada com códigos Unicode estáveis. Isso impede que as suas <strong>letras pequenas</strong> fiquem com aquele símbolo de interrogação quadrado no chat, garantindo que cada <strong>letra pequena</strong> apareça perfeitamente para todos.
            </p>
            <p>
              Ao escolher entre usar <strong>letras pequenas</strong> no início ou uma <strong>letra pequena</strong> no final do apelido, pense no equilíbrio visual. Uma única <strong>letra pequena</strong> bem posicionada pode fazer mais diferença do que várias <strong>letras pequenas</strong> sem critério. Use as decorações do nosso estúdio de <strong>letras pequenas</strong> para emoldurar cada <strong>letra pequena</strong> com perfeição.
            </p>
          </div>
          <div className="space-y-4">
            <p>
              As vantagens de adotar uma <strong>letra pequena</strong> em seu perfil vão além dos jogos. Nas redes sociais, usar <strong>letras pequenas</strong> na bio do Instagram ou TikTok ajuda a criar uma estética minimalista. Se você quer colocar uma <strong>letra pequena</strong> no topo ou <strong>letras pequenas</strong> na linha inferior, nosso site é a solução ideal. Cada <strong>letra pequena</strong> gerada aqui é otimizada para ser leve e estilosa.
            </p>
            <p>
              Para quem busca ideias de combinação, misturar uma <strong>letra pequena</strong> com símbolos asiáticos cria um efeito incrível. Você pode gerar <strong>letras pequenas</strong> e depois adicionar ornamentos raros. Lembre-se de que a escolha de uma <strong>letra pequena</strong> ideal depende do jogo: no Free Fire, por exemplo, o limite de espaço exige que cada <strong>letra pequena</strong> seja bem aproveitada para economizar caracteres.
            </p>
            <p>
              Não perca tempo tentando digitar cada <strong>letra pequena</strong> manualmente no teclado do celular. Nosso conversor de <strong>letras pequenas</strong> faz todo o trabalho duro para você. Basta digitar, escolher a sua <strong>letra pequena</strong> preferida e copiar as <strong>letras pequenas</strong> prontas com apenas um toque!
            </p>
          </div>
        </div>
      </div>

      {/* SEO Content & FAQ Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-slate-200/80 pt-10">
        
        {/* Left Column - Concept */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-indigo-50/50 rounded-3xl border border-indigo-100/60 p-6 space-y-4">
            <h4 className="font-display font-black text-[#0F172A] text-sm uppercase tracking-wide flex items-center gap-1.5">
              <CheckCircle2 className="w-4.5 h-4.5 text-[#4F46E5]" />
              Gerador de Letra Pequena e Letras Pequenas
            </h4>
            <div className="text-xs text-slate-600 space-y-3 font-semibold leading-relaxed">
              <p>
                Nosso conversor inteligente de <strong>letra pequena</strong> utiliza símbolos nativos para criar as melhores <strong>letras pequenas</strong> do mercado. Isso garante que a sua <strong>letra pequena</strong> favorita e todas as <strong>letras pequenas</strong> geradas tenham as seguintes vantagens:
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-500 pl-1 text-[11px]">
                <li>Nenhuma <strong>letra pequena</strong> quebra ao colar nos jogos</li>
                <li>Total compatibilidade de <strong>letras pequenas</strong> no Free Fire e Roblox</li>
                <li>Ideal para usar como <strong>letra pequena</strong> na bio do Instagram</li>
                <li>Gerador rápido de <strong>letras pequenas</strong> sem precisar instalar nada</li>
              </ul>
              <p className="text-[11px] text-slate-400 italic">
                *Nota de uso: Se você prefere usar <strong>letra pequena</strong> subscrita ou <strong>letras pequenas</strong> sobrescritas, nosso sistema entrega cada <strong>letra pequena</strong> com precisão cirúrgica de estilo para seu nick.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - FAQ Accordion Grid */}
        <div className="md:col-span-7 space-y-4">
          <h4 className="font-display font-black text-[#0F172A] text-base uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4.5 h-4.5 text-pink-500" />
            Perguntas Frequentes: Letras Pequenas &amp; Letra Pequena
          </h4>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
            <div className="space-y-1.5 text-xs">
              <span className="text-[#0F172A] font-black text-sm block">
                1. Como colocar letras pequenas (sobrescritas) e letra pequena no Nick do Free Fire?
              </span>
              <p className="text-slate-500 font-semibold leading-relaxed">
                Basta digitar seu apelido no nosso gerador de <strong>letras pequenas</strong>, escolher o estilo de <strong>letra pequena</strong> ideal, copiar o resultado das <strong>letras pequenas</strong> geradas e colar diretamente no jogo. O sistema aceita perfeitamente cada <strong>letra pequena</strong> sobrescrita.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs">
              <span className="text-[#0F172A] font-black text-sm block">
                2. Por que alguma letra pequena (ex: &quot;q&quot;) não vira letras pequenas no subscrito?
              </span>
              <p className="text-slate-500 font-semibold leading-relaxed">
                O consórcio Unicode não incluiu uma versão de <strong>letra pequena</strong> para a letra &quot;q&quot; subscrita. Para manter suas <strong>letras pequenas</strong> legíveis, nosso gerador substitui a <strong>letra pequena</strong> ausente pelo caractere padrão para que suas <strong>letras pequenas</strong> não quebrem no nick.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs">
              <span className="text-[#0F172A] font-black text-sm block">
                3. Meus amigos verão minhas letras pequenas e cada letra pequena no celular?
              </span>
              <p className="text-slate-500 font-semibold leading-relaxed">
                Sim! Qualquer celular moderno exibe <strong>letras pequenas</strong> e <strong>letra pequena</strong> perfeitamente. O suporte para <strong>letra pequena</strong> Unicode é nativo em todos os sistemas, permitindo visualizar <strong>letras pequenas</strong> em qualquer tela.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs">
              <span className="text-[#0F172A] font-black text-sm block">
                4. Posso usar letra pequena com outros símbolos e letras pequenas para nick?
              </span>
              <p className="text-slate-500 font-semibold leading-relaxed">
                Com certeza! Você pode misturar <strong>letras pequenas</strong> com coroas e outros símbolos raros. Adicionar uma <strong>letra pequena</strong> no final ou usar <strong>letras pequenas</strong> como prefixo deixa seu nick super personalizado. Crie sua combinação de <strong>letra pequena</strong> favorita agora!
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
