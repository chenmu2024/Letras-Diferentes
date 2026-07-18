import React, { useState, useMemo } from "react";
import { fontStyles } from "../utils/textTransformers";
import { Copy, Check, Sparkles, Search, RotateCcw, Heart, Trash2, X, Clock, HelpCircle, ChevronDown, Dices } from "lucide-react";
import SocialPreviewer from "./SocialPreviewer";
import SeoContent from "./SeoContent";

interface GeradorLetrasProps {
  onNotify: (message: string) => void;
  onNavigate?: (tabId: any) => void;
}

export default function GeradorLetras({ onNotify, onNavigate }: GeradorLetrasProps) {
  const [inputText, setInputText] = useState("Letras Diferentes");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Advanced Interactive Features
  const [fontSize, setFontSize] = useState<number>(22);
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("ld_favorites") || "[]");
    } catch {
      return [];
    }
  });
  const [copyHistory, setCopyHistory] = useState<{ text: string; styleName: string; timestamp: number }[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("ld_history") || "[]");
    } catch {
      return [];
    }
  });

  const categories = ["Todos", "Favoritos", "Estiloso", "Moderno", "Decorativo", "Clássico"];

  const presets = [
    { label: "Meu Nick ⚔️", text: "꧁ S0ldad0 ꧂" },
    { label: "Legenda ✨", text: "Apenas boas vibrações de paz" },
    { label: "Insta Bio 📸", text: "Viajante • Sonhador • Criador" },
    { label: "WhatsApp 💬", text: "Disponível para novos desafios!" },
  ];

  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(null);
  const [activeSymbolTab, setActiveSymbolTab] = useState<string>("estrelas");

  const quickDecorations = [
    { label: "꧁ ꧂", wrap: ["꧁ ", " ꧂"] },
    { label: "✨", append: " ✨" },
    { label: "⚡", append: " ⚡" },
    { label: "★ ★", wrap: ["★ ", " ★"] },
    { label: "✿", append: " ✿" },
    { label: "ツ", append: " ツ" },
    { label: "『 』", wrap: ["『 ", " 』"] },
    { label: "☠", append: " ☠" },
    { label: "❤", append: " ❤" },
    { label: "☯", append: " ☯" },
  ];

  const randomPhrases = [
    "Jogador Caro ⚽",
    "Estilo Lendário ⚔️",
    "Apenas boas vibrações ✨",
    "Gamer Profissional 🎮",
    "Sonhe Alto 🚀",
    "Rainha da Arena 👑",
    "Silencioso e Letal ☣️",
    "Insta Vibe 📸",
    "Foco no Objetivo 🎯"
  ];

  const handleRandomPhrase = () => {
    const randomIndex = Math.floor(Math.random() * randomPhrases.length);
    setInputText(randomPhrases[randomIndex]);
    onNotify("Ideia gerada aleatoriamente! 🎲");
  };

  const handleApplyDecoration = (dec: { wrap?: string[]; append?: string }) => {
    if (dec.wrap) {
      setInputText((prev) => `${dec.wrap![0]}${prev}${dec.wrap![1]}`);
      onNotify("Moldura aplicada com sucesso! ꧁꧂");
    } else if (dec.append) {
      setInputText((prev) => `${prev}${dec.append}`);
      onNotify("Símbolo adicionado! ✨");
    }
  };

  const toolDirectory = [
    { id: "tatuagem", title: "Letras para Tatuagem", desc: "Fontes cursivas, góticas e caligráficas refinadas para esboços e inspirações artísticas.", icon: "✍️" },
    { id: "grafite", title: "Letras de Grafite", desc: "Estilos urbanos do street art, do wildstyle ao bubble letter para desenhar nomes.", icon: "🎨" },
    { id: "pequenas", title: "Letras Pequenas Nick", desc: "Gerador de sobrescrito e subscrito perfeito para nicks de jogos e biografias.", icon: "ˢᵒᵐᵉ" },
    { id: "moldes", title: "Moldes para Recorte", desc: "Alfabetos completos em moldes limpos prontos para imprimir, recortar e pintar.", icon: "🖨️" },
    { id: "ff-nicks", title: "Símbolos & Nicks FF", desc: "Asas, raios, cruzes e caracteres raros para personalizar seu apelido gamer.", icon: "⚔️" },
    { id: "maiusculas", title: "Caixa Alta e Baixa", desc: "Formatador de texto rápido para inverter, capitalizar ou alternar maiúsculas.", icon: "🔤" },
    { id: "libras", title: "Alfabeto em Libras", desc: "Tradutor ilustrado em Língua Brasileira de Sinais para fins educacionais e didáticos.", icon: "👁️" },
    { id: "termo-helper", title: "Termo Wordle Helper", desc: "Filtro avançado de combinações de 5 letras para acertar no Termo, Letreco e Wordle.", icon: "❓" },
    { id: "stop-respostas", title: "Respostas Jogo Stop", desc: "Gabarito de palavras raras e de alta pontuação classificadas de A a Z por categoria.", icon: "🏆" }
  ];

  const handleCopy = (text: string, id: string, styleName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    onNotify(`"${styleName}" copiado! 🎉`);

    // Update history (max 5 items, prevent duplicates)
    setCopyHistory((prev) => {
      const filtered = prev.filter((item) => item.text !== text);
      const updated = [{ text, styleName, timestamp: Date.now() }, ...filtered].slice(0, 5);
      localStorage.setItem("ld_history", JSON.stringify(updated));
      return updated;
    });

    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleFavorite = (id: string, styleName: string) => {
    let nextFavorites: string[];
    if (favorites.includes(id)) {
      nextFavorites = favorites.filter((favId) => favId !== id);
      onNotify(`"${styleName}" removido dos favoritos! 🤍`);
    } else {
      nextFavorites = [...favorites, id];
      onNotify(`"${styleName}" salvo nos favoritos! ❤️`);
    }
    setFavorites(nextFavorites);
    localStorage.setItem("ld_favorites", JSON.stringify(nextFavorites));
  };

  const clearHistory = () => {
    setCopyHistory([]);
    localStorage.removeItem("ld_history");
    onNotify("Histórico de cópias limpo com sucesso! 🧹");
  };

  const filteredStyles = useMemo(() => {
    const textToTransform = inputText.trim() === "" ? "Exemplo" : inputText;
    return fontStyles
      .map((style) => {
        const rawResult = style.transform(textToTransform);
        return {
          ...style,
          result: `${prefix}${rawResult}${suffix}`,
        };
      })
      .filter((style) => {
        const matchesSearch = style.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          activeCategory === "Todos" ||
          (activeCategory === "Favoritos"
            ? favorites.includes(style.id)
            : style.category === activeCategory);
        return matchesSearch && matchesCategory;
      });
  }, [inputText, searchQuery, activeCategory, favorites, prefix, suffix]);

  const handleReset = () => {
    setInputText("Letras Diferentes");
    setSearchQuery("");
    setActiveCategory("Todos");
    setFontSize(22);
    setPrefix("");
    setSuffix("");
  };

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div className="text-center md:text-left space-y-3.5 border-b border-slate-200/60 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/50 text-[11px] text-[#4F46E5] font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-indigo-500" />
          <span>Estúdio de Tipografia e Arte</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
          Gerador de Letras <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600">Diferentes</span> e Fontes
        </h2>
        <p className="text-xs md:text-sm text-slate-500 max-w-2xl leading-relaxed font-medium">
          Transforme seu texto em estilos de <strong>letras diferentes</strong> e <strong>letra diferentes</strong> de forma imediata com nosso gerador gratuito de <strong>letras diferentes</strong> e <strong>letra diferentes</strong>. Copie e cole suas <strong>letras diferentes</strong> favoritas para usar no seu perfil do Instagram, TikTok, WhatsApp ou apelidos de jogos com total praticidade.
        </p>
      </div>

      {/* Main Interactive Controls */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6 relative overflow-hidden">
        {/* Soft corner gradient accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full pointer-events-none" />
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-extrabold text-[#0F172A] uppercase tracking-widest font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
              Insira ou cole seu texto abaixo:
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRandomPhrase}
                className="text-[10px] font-bold text-indigo-500 hover:text-indigo-700 transition-all uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                title="Gerar frase aleatória"
              >
                <Dices className="w-3.5 h-3.5 animate-bounce" />
                Ideia Aleatória
              </button>
              {inputText && (
                <button
                  onClick={() => setInputText("")}
                  className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-wider flex items-center gap-1"
                  title="Limpar texto"
                >
                  <X className="w-3.5 h-3.5" />
                  Limpar
                </button>
              )}
            </div>
          </div>
          <div className="relative group">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite algo aqui para começar..."
              rows={3}
              maxLength={200}
              className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 pr-12 text-[#0F172A] font-sans placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-[#4F46E5] focus:bg-white transition-all text-lg md:text-xl resize-none leading-relaxed"
            />
            {inputText && (
              <span className="absolute bottom-4.5 right-5 text-[10px] text-slate-400 font-mono font-semibold bg-white/80 px-2 py-0.5 rounded-md border border-slate-100">
                {inputText.length} / 200
              </span>
            )}
          </div>
          
          {/* Quick Case & Style Converters */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest font-mono mr-1">Efeitos Rápidos:</span>
            <button
              onClick={() => {
                setInputText(prev => prev.toUpperCase());
                onNotify("Texto convertido para MAIÚSCULAS! 🔠");
              }}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-[10px] font-bold rounded-lg text-slate-600 transition-all cursor-pointer"
            >
              MAIÚSCULAS
            </button>
            <button
              onClick={() => {
                setInputText(prev => prev.toLowerCase());
                onNotify("Texto convertido para minúsculas! 🔡");
              }}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-[10px] font-bold rounded-lg text-slate-600 transition-all cursor-pointer"
            >
              minúsculas
            </button>
            <button
              onClick={() => {
                setInputText(prev => prev.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()));
                onNotify("Texto convertido para Título! 🔤");
              }}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-[10px] font-bold rounded-lg text-slate-600 transition-all cursor-pointer"
            >
              Título
            </button>
            <button
              onClick={() => {
                setInputText(prev => [...prev].map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join(""));
                onNotify("Texto convertido para AlTeRnAdO! ⚡");
              }}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-[10px] font-bold rounded-lg text-slate-600 transition-all cursor-pointer"
            >
              AlTeRnAdO
            </button>
            <button
              onClick={() => {
                setInputText(prev => [...prev].filter(c => c !== " ").join(" "));
                onNotify("Espaçamento inserido entre as letras! 间隔");
              }}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-[10px] font-bold rounded-lg text-slate-600 transition-all cursor-pointer"
            >
              E s p a ç a d o
            </button>
            <button
              onClick={() => {
                setInputText(prev => [...prev].reverse().join(""));
                onNotify("Texto invertido com sucesso! 🔄");
              }}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-[10px] font-bold rounded-lg text-slate-600 transition-all cursor-pointer"
            >
              Inverter
            </button>
          </div>

          {/* Custom Prefix & Suffix Automatic Wrapper */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[10px] font-extrabold text-[#0F172A] uppercase tracking-widest font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
                Decoração Automática (Prefixo e Sufixo):
              </span>
              {(prefix || suffix) && (
                <button
                  onClick={() => {
                    setPrefix("");
                    setSuffix("");
                    onNotify("Decorações automáticas limpas! 🧹");
                  }}
                  className="text-[10px] font-bold text-red-500 hover:text-red-700 transition-colors uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  Limpar Ambas
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider font-sans block">Prefixo (Início do texto):</label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    placeholder="Ex: ꧁"
                    maxLength={15}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:ring-4 focus:ring-indigo-500/5 focus:border-[#4F46E5] focus:outline-none transition-all font-mono font-bold"
                  />
                  <div className="flex gap-1">
                    {["꧁", "⚔️", "⚡", "★"].map(sym => (
                      <button
                        key={sym}
                        onClick={() => {
                          setPrefix(sym + " ");
                          onNotify(`Prefixo definido como "${sym}"! ✨`);
                        }}
                        className="px-2 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer"
                      >
                        {sym}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider font-sans block">Sufixo (Fim do texto):</label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={suffix}
                    onChange={(e) => setSuffix(e.target.value)}
                    placeholder="Ex: ꧂"
                    maxLength={15}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:ring-4 focus:ring-indigo-500/5 focus:border-[#4F46E5] focus:outline-none transition-all font-mono font-bold"
                  />
                  <div className="flex gap-1">
                    {["꧂", "⚔️", "⚡", "★"].map(sym => (
                      <button
                        key={sym}
                        onClick={() => {
                          setSuffix(" " + sym);
                          onNotify(`Sufixo definido como "${sym}"! ✨`);
                        }}
                        className="px-2 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer"
                      >
                        {sym}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Network / Game Nick Character Limit Guide */}
          {inputText.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] font-sans font-bold text-slate-400">
              <span className="font-mono uppercase tracking-wider text-[9px]">Compatibilidade de Nicks/Bios:</span>
              <span className={`px-2 py-0.5 rounded-full font-sans transition-all ${inputText.length <= 150 ? "bg-emerald-50 text-emerald-600 border border-emerald-100/60" : "bg-red-50 text-red-500 border border-red-100/60"}`}>
                Insta Bio ({inputText.length}/150)
              </span>
              <span className={`px-2 py-0.5 rounded-full font-sans transition-all ${inputText.length <= 80 ? "bg-emerald-50 text-emerald-600 border border-emerald-100/60" : "bg-red-50 text-red-500 border border-red-100/60"}`}>
                TikTok ({inputText.length}/80)
              </span>
              <span className={`px-2 py-0.5 rounded-full font-sans transition-all ${inputText.length <= 12 ? "bg-emerald-50 text-emerald-600 border border-emerald-100/60" : "bg-amber-50 text-amber-600 border border-amber-100/60"}`}>
                Free Fire Nick ({inputText.length}/12)
              </span>
            </div>
          )}
        </div>

        {/* Suggestion presets row */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider font-mono mr-1">Sugeridos:</span>
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setInputText(preset.text);
                onNotify(`Texto alterado para preset: "${preset.label}" ✨`);
              }}
              className="px-3 py-1 bg-slate-50 hover:bg-indigo-50 hover:text-[#4F46E5] border border-slate-200/60 hover:border-indigo-200 text-xs text-slate-600 rounded-lg font-medium transition-all cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Quick Decorations / Symbols row */}
        <div className="flex flex-col gap-2.5 pt-1.5 border-t border-slate-100/50">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider font-mono mr-1">Enfeites Rápidos:</span>
            {quickDecorations.map((dec) => (
              <button
                key={dec.label}
                onClick={() => handleApplyDecoration(dec)}
                className="px-2.5 py-1 bg-indigo-50/10 hover:bg-indigo-50 hover:text-[#4F46E5] border border-slate-200/40 hover:border-indigo-200 text-xs text-slate-700 font-mono rounded-lg font-bold transition-all cursor-pointer"
                title="Clique para decorar o seu texto"
              >
                {dec.label}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 font-sans font-medium">
            💡 Dica: Clique nos enfeites acima para emoldurar ou complementar seu texto instantaneamente!
          </p>
        </div>

        {/* Aesthetic Symbols & Kaomojis Tabbed Board */}
        <div className="flex flex-col gap-3 pt-4 border-t border-slate-100/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[10.5px] font-bold text-[#0F172A] uppercase tracking-wider font-mono">
                Símbolos &amp; Kaomojis:
              </span>
              <span className="text-[9px] font-bold bg-indigo-50 text-[#4F46E5] border border-indigo-100/50 px-1.5 py-0.5 rounded-md animate-pulse">
                Clique para Inserir
              </span>
            </div>
            
            {/* Symbol categories selector */}
            <div className="flex flex-wrap gap-1">
              {[
                { id: "estrelas", label: "Estrelas ✦" },
                { id: "coracoes", label: "Corações ♥" },
                { id: "jogos", label: "Gamer ⚔️" },
                { id: "kaomoji", label: "Kaomojis ✿" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSymbolTab(tab.id)}
                  className={`px-2 py-1 text-[10px] font-extrabold rounded-md transition-all cursor-pointer ${
                    activeSymbolTab === tab.id
                      ? "bg-[#4F46E5] text-white"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-200/40 rounded-xl p-3 transition-all">
            <div className="flex flex-wrap gap-1.5">
              {(() => {
                const list =
                  activeSymbolTab === "estrelas"
                    ? ["★", "☆", "✦", "✧", "✨", "✵", "✸", "✪", "❂", "🪐", "⭐", "☄️", "✴️", "🌟"]
                    : activeSymbolTab === "coracoes"
                    ? ["❤", "💖", "❣", "💕", "♡", "♥", "ღ", "❦", "❧", "💌", "💝", "💟", "💘"]
                    : activeSymbolTab === "jogos"
                    ? ["⚔️", "🛡️", "👑", "☠", "☣️", "⚡", "🎯", "👾", "☯", "🚀", "🎮", "🔫", "🩸", "🧊"]
                    : ["(◕‿◕✿)", "(づ｡◕‿‿◕｡)づ", "(✿◠‿◠)", "(•‿•)", "¯\\_(ツ)_/¯", "(╯°□°）╯", "٩(◕‿◕)۶", "(≧◡≦)", "(o^▽^o)", "(´• ω •`)", "(*^ω^*)", "(^人^)", "(;´Д`)"];
                return list.map((sym) => (
                  <button
                    key={sym}
                    onClick={() => {
                      setInputText((prev) => prev + sym);
                      onNotify(`Símbolo "${sym}" adicionado ao seu texto! ✨`);
                    }}
                    className="px-2.5 py-1.5 bg-white border border-slate-200/60 hover:border-indigo-400 hover:text-[#4F46E5] text-xs font-mono font-bold rounded-lg transition-all shadow-xs cursor-pointer"
                  >
                    {sym}
                  </button>
                ));
              })()}
            </div>
          </div>
        </div>

        {/* Font Size Slider */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-slate-100/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Tamanho da Fonte:</span>
            <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg font-mono">{fontSize}px</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-64">
            <span className="text-xs text-slate-400 font-bold font-mono">A</span>
            <input
              type="range"
              min="14"
              max="36"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
            />
            <span className="text-lg text-slate-500 font-bold font-mono">A</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pt-6 border-t border-slate-100">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isFav = cat === "Favoritos";
              const count = isFav ? favorites.length : 0;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/10 hover:shadow-lg"
                      : "bg-slate-50 border border-slate-200/60 text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  }`}
                >
                  {isFav && <Heart className={`w-3.5 h-3.5 ${activeCategory === "Favoritos" ? "fill-white text-white" : "text-slate-400"}`} />}
                  <span>{cat}</span>
                  {isFav && count > 0 && (
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md leading-none ${activeCategory === "Favoritos" ? "bg-white/20 text-white" : "bg-indigo-50 text-[#4F46E5]"}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search Inputs */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrar fontes..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-[#4F46E5] focus:bg-white w-full sm:w-56 transition-all"
              />
            </div>
            <button
              onClick={handleReset}
              title="Redefinir Filtros"
              className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 transition-all cursor-pointer flex items-center justify-center shrink-0 hover:text-[#4F46E5]"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Favorites Bulk Actions Panel */}
      {activeCategory === "Favoritos" && favorites.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_4px_20px_rgba(239,68,68,0.02)]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-2xl shadow-xs border border-red-100">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            </div>
            <div>
              <p className="text-xs font-black text-[#0F172A] uppercase tracking-wider font-sans">Gerenciador de Fontes Favoritas</p>
              <p className="text-[11px] text-slate-500 font-medium font-sans">Você possui <span className="font-extrabold text-red-500">{favorites.length}</span> {favorites.length === 1 ? "estilo salvo" : "estilos salvos"} no seu painel.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                const allFavTexts = filteredStyles.map(s => s.result).join("\n");
                navigator.clipboard.writeText(allFavTexts);
                onNotify("Todas as fontes favoritas foram copiadas de uma vez! 📋❤️");
              }}
              className="px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Copy className="w-3.5 h-3.5" />
              Copiar Todas ({filteredStyles.length})
            </button>
            <button
              onClick={() => {
                setFavorites([]);
                localStorage.removeItem("ld_favorites");
                onNotify("Todas as fontes favoritas foram removidas! 🧹");
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm shadow-red-500/10"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Limpar Tudo
            </button>
          </div>
        </div>
      )}

      {/* Font Output Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStyles.length > 0 ? (
          filteredStyles.map((style) => {
            const isFavorite = favorites.includes(style.id);
            return (
              <div
                key={style.id}
                className="editorial-card p-6 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#4F46E5] bg-indigo-50/80 border border-indigo-100/60 px-2.5 py-0.5 rounded-lg">
                        {style.name}
                      </span>
                      <span className="text-[9.5px] text-slate-400 font-mono uppercase tracking-wider bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                        {style.category}
                      </span>
                    </div>

                    {/* Favorite Heart Button */}
                    <button
                      onClick={() => toggleFavorite(style.id, style.name)}
                      className="p-1.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-red-500 transition-all cursor-pointer"
                      title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                    </button>
                  </div>
                  
                  {/* Styled result paragraph controlled by slider size */}
                  <p 
                    style={{ fontSize: `${fontSize}px` }}
                    className="text-[#0F172A] select-all font-sans break-all py-3 leading-relaxed min-h-[4.5rem] font-medium transition-colors group-hover:text-indigo-950"
                  >
                    {style.result}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => handleCopy(style.result, style.id, style.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                      copiedId === style.id
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/10 scale-95"
                        : "bg-[#0F172A] hover:bg-[#4F46E5] text-white hover:shadow-md hover:shadow-indigo-500/10"
                    }`}
                  >
                    {copiedId === style.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        COPIADO!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        COPIAR FONTE
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-slate-200">
            {activeCategory === "Favoritos" ? (
              <div className="space-y-3">
                <Heart className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-slate-500 font-sans text-sm font-semibold">Nenhuma fonte salva nos favoritos ainda.</p>
                <p className="text-slate-400 font-sans text-xs max-w-md mx-auto leading-relaxed">
                  Para favoritar as melhores fontes e acessá-las rapidamente aqui, basta clicar no ícone de coração (<Heart className="w-3 h-3 inline-block" />) localizado no canto superior direito de cada card de fonte!
                </p>
                <button
                  onClick={() => setActiveCategory("Todos")}
                  className="mt-3 text-xs font-bold text-[#4F46E5] hover:text-indigo-700 hover:underline uppercase tracking-wider font-mono cursor-pointer"
                >
                  Ver Todos os Estilos
                </button>
              </div>
            ) : (
              <div>
                <p className="text-slate-400 font-sans text-sm font-medium">Nenhuma fonte estilizada corresponde aos filtros aplicados.</p>
                <button
                  onClick={handleReset}
                  className="mt-3 text-xs font-bold text-[#4F46E5] hover:text-indigo-700 transition-colors"
                >
                  Limpar busca e filtros
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Copy History Panel (Persists recently copied styling strings) */}
      {copyHistory.length > 0 && (
        <div className="bg-slate-50/50 rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-sans font-black text-sm text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-500" />
              Histórico de Cópias Recentes
            </h3>
            <button
              onClick={clearHistory}
              className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest font-mono flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Limpar Histórico
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {copyHistory.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  navigator.clipboard.writeText(item.text);
                  onNotify(`Re-copiado com sucesso! ⚡`);
                }}
                className="group p-3.5 bg-white border border-slate-200/80 hover:border-indigo-400/60 rounded-2xl cursor-pointer hover:shadow-xs transition-all relative flex flex-col justify-between h-24"
                title="Clique para copiar novamente"
              >
                <div className="space-y-1">
                  <span className="text-[8px] uppercase tracking-wider font-extrabold text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded">
                    {item.styleName}
                  </span>
                  <p className="text-xs text-[#0F172A] select-all font-medium truncate break-all pt-1">
                    {item.text}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[9px] text-slate-400 pt-2 border-t border-slate-100 font-mono mt-auto">
                  <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="text-indigo-600 font-bold group-hover:underline">COPIAR</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Bio & Nick Simulator Previewer */}
      <SocialPreviewer inputText={inputText} fontStyles={filteredStyles} />

      {/* SEO & Directory: Visual Directory of Isolated Modular Tools */}
      <div className="space-y-6 pt-10 border-t border-slate-200/80">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-100 bg-indigo-50/30 text-[10px] text-[#4F46E5] font-bold tracking-widest uppercase">
            Navegação Rápida
          </div>
          <h3 className="font-sans font-black text-xl text-[#0F172A] uppercase tracking-tight flex items-center gap-2 justify-center md:justify-start">
            <Sparkles className="w-5 h-5 text-[#4F46E5]" />
            Índice de Utilitários Independentes
          </h3>
          <p className="text-xs text-slate-500 font-medium font-sans max-w-2xl leading-relaxed">
            Cada ferramenta do Universo LetraDiferentes opera de forma 100% modular e isolada. Sinta-se à vontade para navegar e alternar entre os módulos com total segurança e performance instantânea.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {toolDirectory.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onNavigate && onNavigate(tool.id)}
              className="group text-left p-5 bg-white border border-slate-200/70 hover:border-[#4F46E5] rounded-3xl hover:shadow-[0_12px_24px_rgba(79,70,229,0.03)] transition-all duration-300 flex items-start gap-4 cursor-pointer focus:outline-none focus:ring-4 focus:ring-indigo-500/5"
            >
              <span className="text-2xl p-3 bg-slate-50 group-hover:bg-indigo-50/60 rounded-2xl transition-all duration-300 shrink-0 select-none">
                {tool.icon}
              </span>
              <div className="space-y-2">
                <h4 className="text-xs font-black text-[#0F172A] group-hover:text-[#4F46E5] transition-colors leading-tight uppercase tracking-wide">
                  {tool.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-medium group-hover:text-slate-500 transition-colors">
                  {tool.desc}
                </p>
                <div className="inline-flex items-center gap-1.5 text-[9.5px] text-[#4F46E5] font-mono font-extrabold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-4px] group-hover:translate-x-0">
                  <span>ABRIR FERRAMENTA</span>
                  <span>→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* SEO & Informational content guide */}
      <SeoContent />

      {/* FAQ Collapse Accordion Section */}
      <div className="space-y-6 pt-10 border-t border-slate-200/80">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-100 bg-indigo-50/30 text-[10px] text-[#4F46E5] font-bold tracking-widest uppercase">
            Dúvidas Frequentes
          </div>
          <h3 className="font-sans font-black text-xl text-[#0F172A] uppercase tracking-tight flex items-center gap-2 justify-center md:justify-start">
            <HelpCircle className="w-5 h-5 text-[#4F46E5]" />
            Guia de Uso &amp; Perguntas Frequentes
          </h3>
          <p className="text-xs text-slate-500 font-medium font-sans max-w-2xl leading-relaxed">
            Tem alguma dúvida sobre o funcionamento do nosso gerador de letras personalizadas? Confira abaixo as respostas para as principais perguntas dos nossos usuários.
          </p>
        </div>

        <div className="space-y-3 max-w-4xl">
          {[
            {
              q: "Como usar as letras diferentes no Instagram, WhatsApp ou TikTok?",
              a: "É extremamente simples! Basta digitar o texto que deseja no campo de entrada no topo da página, escolher o estilo de fonte que mais gostar na lista de resultados e clicar no botão 'COPIAR FONTE'. Depois, basta abrir o aplicativo de sua preferência (Instagram, Facebook, WhatsApp, Free Fire, etc.) e colar o texto no campo de biografia, legenda ou apelido."
            },
            {
              q: "Essas letras personalizadas funcionam em todos os celulares?",
              a: "Sim, a grande maioria dos estilos gerados utiliza caracteres Unicode especiais, que são suportados nativamente pelo Android, iOS (iPhone), Windows e macOS. Alguns dispositivos muito antigos ou sistemas desatualizados podem exibir pequenos quadrados em estilos de fontes extremamente complexas, mas as opções principais são compatíveis com 100% dos smartphones modernos."
            },
            {
              q: "O uso dessas fontes estilizadas é 100% gratuito?",
              a: "Com certeza! Todo o portal LetraDiferentes.org é gratuito, seguro e livre de anúncios invasivos ou pop-ups de spam. Você pode gerar, personalizar e copiar quantas combinações de fontes e símbolos desejar sem nenhum limite ou cadastro prévio."
            },
            {
              q: "As letras diferentes podem ser usadas como nick no Free Fire ou outros jogos?",
              a: "Sim! Nosso gerador de fontes e o módulo dedicado de 'Nicks Free Fire' são amplamente compatíveis com jogos populares como Free Fire, PUBG Mobile, Roblox, Brawl Stars e Fortnite. Lembre-se apenas de respeitar o limite total de caracteres permitido pelo próprio jogo ao criar seu apelido."
            }
          ].map((item, index) => {
            const isOpen = faqOpenIdx === index;
            return (
              <div 
                key={index} 
                className="bg-white border border-slate-200/70 hover:border-slate-300 rounded-2xl transition-all overflow-hidden"
              >
                <button
                  onClick={() => setFaqOpenIdx(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-sans font-bold text-sm text-[#0F172A] hover:text-[#4F46E5] transition-colors focus:outline-none cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ml-4 ${isOpen ? "rotate-180 text-[#4F46E5]" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-500 font-sans leading-relaxed font-medium border-t border-slate-50 animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
