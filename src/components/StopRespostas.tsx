import React, { useState, useMemo, useEffect } from "react";
import { STOP_DATABASE } from "../data/wordLists";
import {
  Search,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  Shuffle,
  Timer,
  Play,
  Pause,
  PlusCircle,
  Trash2,
  AlertCircle,
  Award,
  Trophy,
  Plus
} from "lucide-react";

interface StopRespostasProps {
  onNotify: (message: string) => void;
}

export default function StopRespostas({ onNotify }: StopRespostasProps) {
  const [selectedLetter, setSelectedLetter] = useState<string>("A");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Custom user-authored words stored in local state + localStorage
  const [customAnswers, setCustomAnswers] = useState<Record<string, Record<string, string[]>>>(() => {
    try {
      const saved = localStorage.getItem("stop_custom_answers");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Custom word registry inputs
  const [newCustomWord, setNewCustomWord] = useState("");
  const [newCustomCat, setNewCustomCat] = useState("nomeFeminino");
  const [newCustomLetter, setNewCustomLetter] = useState("A");

  // Simulator State
  const [isSimulatorActive, setIsSimulatorActive] = useState(false);
  const [simLetter, setSimLetter] = useState("A");
  const [simCategories, setSimCategories] = useState<any[]>([]);
  const [simTimeLeft, setSimTimeLeft] = useState(60);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Human-friendly category naming mappings
  const categoryLabels = [
    { key: "nomeFeminino", label: "Nome Feminino", icon: "👧" },
    { key: "nomeMasculino", label: "Nome Masculino", icon: "👦" },
    { key: "animal", label: "Animal", icon: "🦁" },
    { key: "fruta", label: "Fruta", icon: "🍓" },
    { key: "objeto", label: "Objeto", icon: "🔑" },
    { key: "cor", label: "Cor", icon: "🎨" },
    { key: "profissao", label: "Profissão", icon: "💼" },
    { key: "marca", label: "Marca", icon: "🏷️" }
  ];

  // Tick the game simulator timer
  useEffect(() => {
    let interval: any = null;
    if (isSimulatorActive && simTimeLeft > 0) {
      interval = setInterval(() => {
        setSimTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsSimulatorActive(false);
            onNotify(`Tempo esgotado! STOP! Confira o gabarito para a Letra ${simLetter}. 🚨`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSimulatorActive, simTimeLeft, simLetter]);

  const handleStartSimulation = () => {
    const randomL = letters[Math.floor(Math.random() * letters.length)];
    setSimLetter(randomL);
    // Select 5 random categories
    const shuffled = [...categoryLabels].sort(() => 0.5 - Math.random()).slice(0, 5);
    setSimCategories(shuffled);
    setSimTimeLeft(60);
    setIsSimulatorActive(true);
    setSelectedLetter(randomL); // Auto select the rolled letter to aid player
    onNotify(`Desafio Iniciado! Letra Sorteada: "${randomL}". Escreva suas respostas! ⏱️`);
  };

  const handleStopEarly = () => {
    setIsSimulatorActive(false);
    onNotify(`STOP! Você terminou com ${simTimeLeft}s restantes. Confira o gabarito para a Letra ${simLetter}! 🏆`);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    onNotify(`Resposta "${text}" copiada! Adedanha! 🏆`);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Random letter trigger
  const handleRandomLetter = () => {
    const randomL = letters[Math.floor(Math.random() * letters.length)];
    setSelectedLetter(randomL);
    onNotify(`Letra sorteada: Letra ${randomL}! 🎲`);
  };

  // Add custom word to local dictionary
  const handleAddCustomWord = (e: React.FormEvent) => {
    e.preventDefault();
    const wordClean = newCustomWord.trim();
    if (!wordClean) return;

    // Validation: must begin with the chosen letter (accented letters ignored in initial check)
    const firstChar = wordClean.substring(0, 1).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (firstChar !== newCustomLetter) {
      onNotify(`A palavra deve começar com a letra escolhida: ${newCustomLetter}!`);
      return;
    }

    const updated = { ...customAnswers };
    if (!updated[newCustomLetter]) updated[newCustomLetter] = {};
    if (!updated[newCustomLetter][newCustomCat]) updated[newCustomLetter][newCustomCat] = [];

    if (updated[newCustomLetter][newCustomCat].includes(wordClean)) {
      onNotify("Essa palavra já existe no seu gabarito personalizado!");
      return;
    }

    updated[newCustomLetter][newCustomCat].push(wordClean);
    setCustomAnswers(updated);
    localStorage.setItem("stop_custom_answers", JSON.stringify(updated));
    setNewCustomWord("");
    onNotify(`Palavra "${wordClean}" cadastrada com sucesso para a Letra ${newCustomLetter}! 📝`);
  };

  const handleRemoveCustomWord = (letter: string, catKey: string, word: string) => {
    const updated = { ...customAnswers };
    if (updated[letter] && updated[letter][catKey]) {
      updated[letter][catKey] = updated[letter][catKey].filter((w) => w !== word);
      setCustomAnswers(updated);
      localStorage.setItem("stop_custom_answers", JSON.stringify(updated));
      onNotify(`Palavra "${word}" removida do gabarito personalizado.`);
    }
  };

  // Get complete list of answers for a given letter and category (defaults + user customized)
  const getCombinedAnswers = (letter: string, catKey: string) => {
    const defaultList = (STOP_DATABASE[letter] as any)?.[catKey] || [];
    const customList = customAnswers[letter]?.[catKey] || [];
    // Combine and preserve structure of defaults with custom items
    return {
      defaults: defaultList,
      customs: customList
    };
  };

  // Global search implementation
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase().trim();
    const results: Array<{ letter: string; category: typeof categoryLabels[0]; word: string; isCustom: boolean }> = [];

    letters.forEach((l) => {
      categoryLabels.forEach((cat) => {
        const defaultList = (STOP_DATABASE[l] as any)?.[cat.key] || [];
        const customList = customAnswers[l]?.[cat.key] || [];

        defaultList.forEach((word: string) => {
          if (word.toLowerCase().includes(query)) {
            results.push({ letter: l, category: cat, word, isCustom: false });
          }
        });

        customList.forEach((word: string) => {
          if (word.toLowerCase().includes(query)) {
            results.push({ letter: l, category: cat, word, isCustom: true });
          }
        });
      });
    });

    return results;
  }, [searchQuery, customAnswers]);

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div className="text-center md:text-left space-y-3.5 border-b border-slate-200/60 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/50 text-[11px] text-[#4F46E5] font-semibold tracking-wider uppercase">
          <BookOpen className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
          <span>Estratégia &amp; Alto Rendimento</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
          Gabarito para <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-violet-600">Stop &amp; Adedanha</span>
        </h1>
        <p className="text-xs md:text-sm text-slate-500 max-w-2xl leading-relaxed font-medium">
          Escreva as respostas mais raras e exclusivas! Consulte o dicionário definitivo de A a Z, teste sua agilidade no simulador com cronômetro e salve suas palavras secretas personalizadas.
        </p>
      </div>

      {/* NEW: Stop & Adedanha Game Simulator Module */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white rounded-3xl p-6 md:p-8 border border-indigo-800 shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-800/60 pb-4">
          <div className="space-y-1">
            <h3 className="font-display text-lg font-black tracking-tight flex items-center gap-2 text-white">
              <Timer className="w-5 h-5 text-indigo-400" />
              Treino Stop Contra o Relógio
            </h3>
            <p className="text-xs text-indigo-200/80 font-medium">
              Simule uma rodada aleatória, escreva rápido e confira as respostas de alta pontuação logo abaixo!
            </p>
          </div>

          {isSimulatorActive && (
            <div className="flex items-center gap-2.5 bg-indigo-950 border border-indigo-800 px-4 py-2 rounded-2xl shrink-0">
              <span className="text-xs text-indigo-300 font-bold font-mono uppercase">Tempo restante:</span>
              <span className="text-sm font-black font-mono text-pink-500 animate-pulse">{simTimeLeft}s</span>
            </div>
          )}
        </div>

        {!isSimulatorActive ? (
          <div className="flex flex-col items-center justify-center text-center py-6 space-y-4">
            <div className="p-4 bg-indigo-950/60 border border-indigo-800/50 rounded-2xl max-w-md">
              <p className="text-xs text-indigo-200 leading-relaxed font-medium">
                O simulador sorteará uma letra do alfabeto e escolherá 5 categorias aleatórias. Tente lembrar o máximo de respostas que puder antes do tempo acabar!
              </p>
            </div>
            <button
              onClick={handleStartSimulation}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white text-xs font-black rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <Play className="w-4 h-4 fill-white" />
              Sorteia &amp; Iniciar Rodada
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex items-center justify-center gap-4 bg-indigo-950/50 border border-indigo-800/40 p-6 rounded-3xl">
                <div className="w-20 h-20 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-display text-4xl font-black shadow-inner select-none">
                  {simLetter}
                </div>
                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-mono tracking-widest text-indigo-400 font-extrabold uppercase">Letra da Rodada</span>
                  <h4 className="text-base font-black text-white">Letra {simLetter}</h4>
                  <p className="text-xs text-indigo-300">Gabarito completo desbloqueado abaixo!</p>
                </div>
              </div>

              <div className="space-y-3 text-left">
                <span className="text-[10px] font-mono tracking-widest text-indigo-400 font-extrabold uppercase block">
                  Temas para Preencher:
                </span>
                <div className="flex flex-wrap gap-2">
                  {simCategories.map((cat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/80 border border-indigo-800 text-xs font-bold text-indigo-200"
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center border-t border-indigo-800/40 pt-4">
              <button
                onClick={handleStopEarly}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-black rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
              >
                <Pause className="w-3.5 h-3.5 fill-white" />
                PARAR! (Pedir STOP)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Global Real-Time Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar palavra no gabarito inteiro... (Ex: Embaúba, Puma, Rolex)"
              className="w-full bg-[#F8FAFC]/50 border border-[#E2E8F0] rounded-xl pl-11 pr-4 py-3 text-[#0F172A] font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/15 focus:border-[#4F46E5] text-sm"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-[#4F46E5] hover:underline shrink-0 cursor-pointer"
            >
              Limpar busca
            </button>
          )}
        </div>

        {/* Search Results Drawer */}
        {searchResults !== null && (
          <div className="mt-4 border-t border-slate-100 pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#0F172A] font-mono uppercase">
                Resultados encontrados: <strong className="text-[#4F46E5] font-black">{searchResults.length}</strong>
              </span>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
                {searchResults.map((res, idx) => {
                  const uniqueId = `search-${res.letter}-${res.category.key}-${idx}`;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleCopy(res.word, uniqueId)}
                      className="group cursor-pointer p-3 bg-slate-50 hover:bg-[#4F46E5] hover:text-white rounded-2xl border border-slate-150 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-slate-800 group-hover:text-white tracking-wide">
                          {res.word}
                        </span>
                        <span className="text-[9px] font-mono bg-indigo-50 group-hover:bg-indigo-950/40 text-indigo-600 group-hover:text-indigo-200 px-1.5 py-0.5 rounded-md font-bold shrink-0">
                          Letra {res.letter}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2.5 text-[10px] text-slate-400 group-hover:text-indigo-200 font-medium">
                        <span className="flex items-center gap-1">
                          <span>{res.category.icon}</span>
                          <span>{res.category.label}</span>
                        </span>
                        {res.isCustom && (
                          <span className="text-[8px] bg-amber-100 text-amber-800 px-1 rounded font-black">
                            Meu Gabarito
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-400 font-medium">
                Nenhuma palavra contendo &quot;{searchQuery}&quot; foi encontrada no banco de dados.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Interactive Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full pointer-events-none" />
        
        {/* Letter Tabs */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <label className="text-[11px] font-extrabold text-[#0F172A] uppercase tracking-widest font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full animate-ping" />
              Selecione a Letra para ver as Respostas:
            </label>
            <button
              onClick={handleRandomLetter}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 border border-slate-200 hover:border-[#4F46E5] rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-[#4F46E5] transition-all cursor-pointer font-sans uppercase tracking-wider"
            >
              <Shuffle className="w-3.5 h-3.5" />
              SORTEAR LETRA
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
            {letters.map((letter) => (
              <button
                key={letter}
                onClick={() => {
                  setSelectedLetter(letter);
                  onNotify(`Carregando respostas da Letra ${letter} 🏆`);
                }}
                className={`w-10 h-10 font-display font-black text-sm rounded-xl transition-all duration-300 border cursor-pointer flex items-center justify-center ${
                  selectedLetter === letter
                    ? "bg-[#4F46E5] text-white border-[#4F46E5] shadow-md shadow-indigo-500/15 scale-110"
                    : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category grids display of selected letter */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoryLabels.map((cat) => {
          const { defaults, customs } = getCombinedAnswers(selectedLetter, cat.key);
          const hasAny = defaults.length > 0 || customs.length > 0;

          return (
            <div
              key={cat.key}
              className="bg-white border border-slate-200/80 rounded-3xl p-5 flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-md transition-all duration-300 relative group overflow-hidden"
            >
              <div>
                <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                  <span className="text-xl p-1 bg-slate-50 rounded-lg">{cat.icon}</span>
                  <h4 className="font-display text-sm font-black text-[#0F172A] tracking-tight">
                    {cat.label}
                  </h4>
                </div>

                {/* List of high scoring items */}
                <div className="space-y-2">
                  {hasAny ? (
                    <>
                      {/* 1. Defaults */}
                      {defaults.map((item: string, idx: number) => {
                        const uniqueId = `default-${selectedLetter}-${cat.key}-${idx}`;
                        // Give first 2 items 'comum' and subsequent ones 'raro' to designate rarity points
                        const isRaro = idx >= 2;
                        
                        return (
                          <div
                            key={`def-${idx}`}
                            onClick={() => handleCopy(item, uniqueId)}
                            className="group/item cursor-pointer flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-[#4F46E5] hover:text-white transition-all duration-300 border border-slate-100/50 hover:border-[#4F46E5]/40 hover:shadow-sm"
                          >
                            <div className="flex flex-col text-left">
                              <span className="text-xs font-bold text-slate-700 group-hover/item:text-white font-sans transition-colors">
                                {item}
                              </span>
                              <span className={`text-[8px] font-mono font-bold mt-0.5 ${
                                isRaro ? "text-indigo-500 group-hover/item:text-indigo-200" : "text-emerald-600 group-hover/item:text-emerald-200"
                              }`}>
                                {isRaro ? "RARO (10 PTS)" : "COMUM (5 PTS)"}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 group-hover/item:text-white transition-all">
                              {copiedText === uniqueId ? (
                                <Check className="w-4 h-4 text-emerald-500 animate-bounce" />
                              ) : (
                                <Copy className="w-3.5 h-3.5 opacity-60 group-hover/item:opacity-100" />
                              )}
                            </span>
                          </div>
                        );
                      })}

                      {/* 2. Custom Answers */}
                      {customs.map((item: string, idx: number) => {
                        const uniqueId = `custom-${selectedLetter}-${cat.key}-${idx}`;
                        return (
                          <div
                            key={`cust-${idx}`}
                            className="group/item flex items-center justify-between p-3 rounded-2xl bg-amber-50/50 hover:bg-[#4F46E5] border border-amber-100 hover:border-[#4F46E5]/40 transition-all duration-300"
                          >
                            <div
                              onClick={() => handleCopy(item, uniqueId)}
                              className="flex-1 cursor-pointer flex flex-col text-left"
                            >
                              <span className="text-xs font-bold text-amber-950 group-hover/item:text-white font-sans transition-colors">
                                {item}
                              </span>
                              <span className="text-[8px] font-mono font-black text-amber-700 group-hover/item:text-indigo-200 mt-0.5">
                                EXCLUSIVO (10 PTS)
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 ml-2">
                              <button
                                onClick={() => handleCopy(item, uniqueId)}
                                className="text-slate-400 group-hover/item:text-white p-1"
                              >
                                {copiedText === uniqueId ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-500 animate-bounce" />
                                ) : (
                                  <Copy className="w-3 h-3 opacity-60 group-hover/item:opacity-100" />
                                )}
                              </button>
                              <button
                                onClick={() => handleRemoveCustomWord(selectedLetter, cat.key, item)}
                                title="Excluir palavra personalizada"
                                className="text-rose-400 hover:text-rose-600 group-hover/item:text-rose-200 p-1 cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <span className="text-slate-400 text-xs font-sans font-medium">Sem respostas disponíveis.</span>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono italic font-semibold">
                Letra {selectedLetter} • Jogo Stop
              </div>
            </div>
          );
        })}
      </div>

      {/* NEW: Custom Word Addition Drawer/Panel */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.01)] relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-full pointer-events-none" />
        
        <div className="border-b border-slate-100 pb-4 mb-6">
          <h3 className="font-display text-base font-black text-[#0F172A] flex items-center gap-2">
            <span>📝</span> Cadastrar Palavras Secretas no seu Gabarito
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
            Seus amigos usam respostas previsíveis? Adicione suas próprias palavras secretas para surpreender nas rodadas! Elas serão mescladas com o dicionário padrão e salvas de forma segura no seu navegador.
          </p>
        </div>

        <form onSubmit={handleAddCustomWord} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-3 space-y-1.5">
            <label htmlFor="custom-letter" className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-mono cursor-pointer">Letra do Alfabeto</label>
            <select
              id="custom-letter"
              aria-label="Letra do Alfabeto"
              value={newCustomLetter}
              onChange={(e) => setNewCustomLetter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/15"
            >
              {letters.map((l) => (
                <option key={l} value={l}>
                  Letra {l}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-4 space-y-1.5">
            <label htmlFor="custom-category" className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-mono cursor-pointer">Categoria / Tema</label>
            <select
              id="custom-category"
              aria-label="Categoria / Tema"
              value={newCustomCat}
              onChange={(e) => setNewCustomCat(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/15"
            >
              {categoryLabels.map((cat) => (
                <option key={cat.key} value={cat.key}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3 space-y-1.5">
            <label htmlFor="custom-word" className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-mono cursor-pointer">Palavra (Deve iniciar com {newCustomLetter})</label>
            <input
              id="custom-word"
              aria-label={`Palavra iniciada com ${newCustomLetter}`}
              type="text"
              value={newCustomWord}
              onChange={(e) => setNewCustomWord(e.target.value)}
              placeholder={`Ex: palavra com ${newCustomLetter}`}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/15"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-black rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <Plus className="w-4 h-4" />
              CADASTRAR
            </button>
          </div>
        </form>
      </div>

      {/* Popular SEO search questions card */}
      <div className="bg-slate-50/50 rounded-2xl border border-slate-200/70 p-6 space-y-2 font-medium leading-relaxed text-xs text-slate-500">
        <h4 className="font-display text-sm font-black text-[#0F172A] flex items-center gap-1.5">
          <span>💡</span> Curiosidade de Jogo: Como pontuar 100 pontos?
        </h4>
        <p className="max-w-3xl">
          No jogo do Stop / Adedanha, se você escrever uma resposta que nenhum outro jogador escreveu, você garante 
          <strong> 10 pontos</strong>. Mas se você escrever uma palavra rara e exclusiva que NINGUÉM mais conseguiu lembrar, sua rodada pode disparar! 
          Por isso, catalogamos palavras raras como <em>Embaúba</em> (Fruta com E) ou <em>Morsa</em> (Animal com M) para turbinar suas notas.
        </p>
      </div>

      {/* NOVO: Gabarito de Referência de Alto Rendimento (SEO) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)] text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
        <div>
          <h3 className="font-display text-base font-black text-[#0F172A] border-b border-slate-100 pb-3 flex items-center gap-2">
            <span>🔍</span> Guia Temático Completo: Dominando os Temas Difíceis de Stop
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
            Abaixo, apresentamos uma análise detalhada sobre três dos temas mais procurados por jogadores profissionais: <strong>nomes femininos que terminam com a letra o</strong>, <strong>fruta com a letra s</strong>, e <strong>animal com a letra f</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coluna 1: Nomes Femininos */}
          <div className="space-y-4">
            <h4 className="font-black text-[#0F172A] text-xs uppercase tracking-wider bg-slate-100 p-2.5 rounded-xl border border-slate-200 flex items-center gap-1.5">
              <span>🚺</span> Nomes Femininos
            </h4>
            <ul className="space-y-2 text-[11px] md:text-xs">
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                O uso de <strong>nomes femininos que terminam com a letra o</strong> é uma jogada de mestre.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Consuelo é um exemplo clássico de <strong>nomes femininos que terminam com a letra o</strong>.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Socorro é outro dos <strong>nomes femininos que terminam com a letra o</strong> mais aceitos.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Amparo se destaca entre os <strong>nomes femininos que terminam com a letra o</strong> de origem espanhola.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Conceição entra na lista de <strong>nomes femininos que terminam com a letra o</strong> no Nordeste.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Cleo é uma opção moderna de <strong>nomes femininos que terminam com a letra o</strong> curtos.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Solange inspira variações como Sol, que integra os <strong>nomes femininos que terminam com a letra o</strong>.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Margarido pode ser adaptado, mas prefira <strong>nomes femininos que terminam com a letra o</strong> oficiais.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Memorizar esses <strong>nomes femininos que terminam com a letra o</strong> evita que você zere a rodada.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                A lista de <strong>nomes femininos que terminam com a letra o</strong> garante vantagem de tempo.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Surpreenda os adversários com <strong>nomes femininos que terminam com a letra o</strong> raros.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Muitos jogadores desconhecem a existência de <strong>nomes femininos que terminam com a letra o</strong>.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Pesquise e salve novos <strong>nomes femininos que terminam com a letra o</strong> no seu gabarito.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Utilizar <strong>nomes femininos que terminam com a letra o</strong> raros rende 10 pontos limpos.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Sempre tenha em mente <strong>nomes femininos que terminam com a letra o</strong> espanhóis.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Amigos vão questionar seus <strong>nomes femininos que terminam com a letra o</strong>, mas eles são válidos!
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                O dicionário oficial aceita esses <strong>nomes femininos que terminam com a letra o</strong>.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Estude diariamente a lista de <strong>nomes femininos que terminam com a letra o</strong> para fixar na memória.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Nossos usuários sugerem excelentes <strong>nomes femininos que terminam com a letra o</strong>.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                A vitória no Stop exige saber <strong>nomes femininos que terminam com a letra o</strong> raros.
              </li>
            </ul>
          </div>

          {/* Coluna 2: Fruta com a Letra S */}
          <div className="space-y-4">
            <h4 className="font-black text-[#0F172A] text-xs uppercase tracking-wider bg-slate-100 p-2.5 rounded-xl border border-slate-200 flex items-center gap-1.5">
              <span>🍓</span> Frutas Estratégicas
            </h4>
            <ul className="space-y-2 text-[11px] md:text-xs">
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Lembrar de uma <strong>fruta com a letra s</strong> é fundamental para pontuar em botânica.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Seriguela é a mais conhecida <strong>fruta com a letra s</strong> no Brasil.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Sapoti se destaca como uma deliciosa <strong>fruta com a letra s</strong> tropical.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Sete-capotes é uma rara <strong>fruta com a letra s</strong> nativa.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Semente-de-cacau é aceita como <strong>fruta com a letra s</strong> em certas regiões.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Ter em mente uma <strong>fruta com a letra s</strong> incomum garante que você ganhe 10 pontos.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Evite repetir a mesma <strong>fruta com a letra s</strong> que seus concorrentes costumam usar.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                A diversidade de <strong>fruta com a letra s</strong> na língua portuguesa é excelente.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Pesquise receitas com cada <strong>fruta com a letra s</strong> para fixar o nome.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Se o tema for difícil, uma <strong>fruta com a letra s</strong> simples salvará sua rodada.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Cadastre novas opções de <strong>fruta com a letra s</strong> no seu painel customizado.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Nossa enciclopédia de stop lista toda <strong>fruta com a letra s</strong> catalogada.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Garanta sua pontuação com a <strong>fruta com a letra s</strong> ideal para cada letra sorteada.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                O segredo dos profissionais é conhecer a <strong>fruta com a letra s</strong> perfeita.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Escreva rápido para finalizar a rodada logo após preencher a <strong>fruta com a letra s</strong>.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                A grafia correta da <strong>fruta com a letra s</strong> evita discussões de mesa.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                A seriguela é a melhor <strong>fruta com a letra s</strong> para respostas instantâneas.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Não perca a chance de marcar 10 pontos usando uma <strong>fruta com a letra s</strong> rara.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Aprenda a pronúncia de cada <strong>fruta com a letra s</strong> da nossa base.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Comemore a vitória ao preencher uma <strong>fruta com a letra s</strong> que ninguém mais pensou.
              </li>
            </ul>
          </div>

          {/* Coluna 3: Animal com a Letra F */}
          <div className="space-y-4">
            <h4 className="font-black text-[#0F172A] text-xs uppercase tracking-wider bg-slate-100 p-2.5 rounded-xl border border-slate-200 flex items-center gap-1.5">
              <span>🦁</span> Animais com F
            </h4>
            <ul className="space-y-2 text-[11px] md:text-xs">
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Encontrar um <strong>animal com a letra f</strong> é uma tarefa prazerosa e divertida.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Foca é o exemplo de <strong>animal com a letra f</strong> mais comum usado por iniciantes.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Falcão é um poderoso <strong>animal com a letra f</strong> que voa alto.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Furão se destaca como um ágil e curioso <strong>animal com a letra f</strong> de estimação.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Faisão é um colorido e belo <strong>animal com a letra f</strong> terrestre.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Fragata é uma ave marinha incrível e um ótimo <strong>animal com a letra f</strong> para pontuar.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Evite empatar com outros jogadores escolhendo um <strong>animal com a letra f</strong> exótico.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                O dicionário de zoologia lista cada <strong>animal com a letra f</strong> existente.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Treine sua velocidade de escrita digitando seu <strong>animal com a letra f</strong> favorito.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Nosso simulador ajuda você a lembrar de um <strong>animal com a letra f</strong> sob pressão.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Seja o mais rápido ao cadastrar um novo <strong>animal com a letra f</strong> na plataforma.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                A variedade de espécies garante mais de um <strong>animal com a letra f</strong> por partida.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Lembre seus colegas da importância de conhecer um <strong>animal com a letra f</strong> diferente.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Foca e furão são excelentes, mas busque outro <strong>animal com a letra f</strong> para isolar a liderança.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                No Stop profissional, saber um <strong>animal com a letra f</strong> raro é essencial.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Marque 10 pontos garantidos preenchendo o <strong>animal com a letra f</strong> mais incomum da mesa.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Estude as aves marinhas para encontrar mais de um <strong>animal com a letra f</strong> útil.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                O habitat do furão o torna um excelente <strong>animal com a letra f</strong> para focar.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Amplie suas pontuações aprendendo sobre cada <strong>animal com a letra f</strong> selvagem.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                Sua rodada de adedanha ficará completa com um <strong>animal com a letra f</strong> imbatível!
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
