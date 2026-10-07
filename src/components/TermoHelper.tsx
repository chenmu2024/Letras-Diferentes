import React, { useState, useMemo } from "react";
import { PORTUGUESE_5_LETTER_WORDS_CLEAN } from "../data/wordLists";
import { HelpCircle, RefreshCw, Sparkles, Check, CheckSquare } from "lucide-react";

interface TermoHelperProps {
  onNotify: (message: string) => void;
}

export default function TermoHelper({ onNotify }: TermoHelperProps) {
  // 5 slots for exact green positions
  const [greenSlots, setGreenSlots] = useState<string[]>(["", "", "", "", ""]);
  // String for general yellow misplaced letters
  const [yellowLetters, setYellowLetters] = useState<string>("");
  // 5 slots for yellow misplaced letters (letters that are in the word but NOT in this exact position)
  const [yellowSlots, setYellowSlots] = useState<string[]>(["", "", "", "", ""]);
  // String for excluded gray letters
  const [grayLetters, setGrayLetters] = useState<string>("");
  // Sorting strategy: "score" (best mathematical suggestions) or "alpha" (alphabetical)
  const [sortBy, setSortBy] = useState<"score" | "alpha">("score");

  const handleGreenChange = (val: string, index: number) => {
    const char = val.toUpperCase().replace(/[^A-Z]/g, "").substring(0, 1);
    const newSlots = [...greenSlots];
    newSlots[index] = char;
    setGreenSlots(newSlots);

    // Auto-focus next input slot if filled
    if (char && index < 4) {
      const nextInput = document.getElementById(`green-slot-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleYellowSlotChange = (val: string, index: number) => {
    const chars = val.toUpperCase().replace(/[^A-Z]/g, "");
    const newSlots = [...yellowSlots];
    newSlots[index] = chars;
    setYellowSlots(newSlots);
  };

  const handleReset = () => {
    setGreenSlots(["", "", "", "", ""]);
    setYellowLetters("");
    setYellowSlots(["", "", "", "", ""]);
    setGrayLetters("");
    onNotify("Filtros do Termo-Helper redefinidos! 🔄");
  };

  const handleKeyToggle = (letter: string) => {
    const upperLetter = letter.toUpperCase();
    const isGray = grayLetters.includes(upperLetter);
    const isGreen = greenSlots.includes(upperLetter);
    const isYellow = yellowLetters.includes(upperLetter) || yellowSlots.some(slot => slot.includes(upperLetter));

    if (isGreen || isYellow) {
      onNotify(`A letra ${upperLetter} já está marcada como correta ou deslocada.`);
      return;
    }

    if (isGray) {
      setGrayLetters(prev => prev.replace(upperLetter, ""));
    } else {
      setGrayLetters(prev => prev + upperLetter);
    }
  };

  // Perform dynamic, robust Wordle-filter logic!
  const matchedWordsWithScores = useMemo(() => {
    const green = greenSlots.map((char) => char.toLowerCase());
    const yellowFromString = yellowLetters.toLowerCase().replace(/[^a-z]/g, "").split("");
    const yellowFromSlots = yellowSlots.flatMap(slot => slot.toLowerCase().split("")).filter(Boolean);
    const allYellowLetters = Array.from(new Set([...yellowFromString, ...yellowFromSlots]));
    const gray = grayLetters.toLowerCase().replace(/[^a-z]/g, "").split("").filter(Boolean);

    // 1. Filter Portuguese 5-letter dictionary
    const filtered = PORTUGUESE_5_LETTER_WORDS_CLEAN.filter((word) => {
      // Green check
      for (let i = 0; i < 5; i++) {
        if (green[i] && word[i] !== green[i]) {
          return false;
        }
      }

      // Yellow check (must exist in word)
      for (const char of allYellowLetters) {
        if (!word.includes(char)) {
          return false;
        }
      }

      // Yellow specific exclusion check (cannot be in this specific slot)
      for (let i = 0; i < 5; i++) {
        if (yellowSlots[i]) {
          const charsAtPosition = yellowSlots[i].toLowerCase().split("");
          for (const char of charsAtPosition) {
            if (word[i] === char) {
              return false;
            }
          }
        }
      }

      // Gray check (cannot exist unless exception occurs for multiple letters)
      for (const char of gray) {
        if (word.includes(char)) {
          if (green.includes(char) || allYellowLetters.includes(char)) {
            continue;
          }
          return false;
        }
      }

      return true;
    });

    // 2. Count letter frequencies of candidate words
    const letterCounts: Record<string, number> = {};
    filtered.forEach((word) => {
      const uniqueChars = Array.from(new Set(word.split("")));
      uniqueChars.forEach((char) => {
        letterCounts[char] = (letterCounts[char] || 0) + 1;
      });
    });

    // 3. Score each candidate word based on the sum of frequencies of its unique letters
    const scored = filtered.map((word) => {
      const uniqueChars = Array.from(new Set(word.split("")));
      const score = uniqueChars.reduce((sum, char) => sum + (letterCounts[char] || 0), 0);
      return { word, score };
    });

    // 4. Sort according to selection
    if (sortBy === "score") {
      return scored.sort((a, b) => b.score - a.score);
    } else {
      return scored.sort((a, b) => a.word.localeCompare(b.word));
    }
  }, [greenSlots, yellowLetters, yellowSlots, grayLetters, sortBy]);

  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"]
  ];

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div className="text-center md:text-left space-y-3.5 border-b border-slate-200/60 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/50 text-[11px] text-[#4F46E5] font-semibold tracking-wider uppercase">
          <HelpCircle className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
          <span>Assistente de Jogo de Palavras</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
          Helper para <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-violet-600">Termo</span> &amp; Letreco
        </h1>
        <p className="text-xs md:text-sm text-slate-500 max-w-2xl leading-relaxed font-medium">
          Está travado no Termo, Letreco ou Wordle em português? Filtre instantaneamente as palavras possíveis usando regras de posição, exclusions específicas e estatísticas dinâmicas de probabilidade de letras.
        </p>
      </div>

      {/* Main Interactive Filter Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input parameters panel */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 md:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full pointer-events-none" />
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-display text-sm font-extrabold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
              Filtro de Letras
            </h3>
            <button
              onClick={handleReset}
              title="Redefinir Filtros"
              className="text-slate-400 hover:text-[#4F46E5] hover:bg-slate-50 transition-all p-2 rounded-xl border border-slate-150 cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold font-mono uppercase tracking-wider">Limpar</span>
            </button>
          </div>

          {/* Green slots */}
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-emerald-800 flex items-center gap-1 uppercase tracking-widest font-mono">
              🟢 Letras Verdes (Posição Correta):
            </label>
            <p className="text-[10px] text-slate-500 font-sans font-medium">Digite a letra exatamente na posição em que ela aparece:</p>
            <div className="flex gap-2 justify-between">
              {greenSlots.map((slot, idx) => (
                <input
                  key={idx}
                  id={`green-slot-${idx}`}
                  type="text"
                  value={slot}
                  onChange={(e) => handleGreenChange(e.target.value, idx)}
                  placeholder={`${idx + 1}`}
                  className="w-11 h-11 bg-emerald-50/50 text-emerald-950 font-sans font-extrabold text-center text-lg rounded-xl border border-emerald-200/40 focus:outline-none focus:ring-4 focus:ring-emerald-700/10 focus:border-emerald-600 transition-all uppercase placeholder-emerald-400"
                />
              ))}
            </div>
          </div>

          {/* Yellow slots (specific index exclusions) */}
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-amber-700 flex items-center gap-1 uppercase tracking-widest font-mono">
              🟡 Letras Amarelas por Posição (Exclusão):
            </label>
            <p className="text-[10px] text-slate-500 font-sans font-medium">Insira letras que pertencem à palavra, mas NÃO a esta posição:</p>
            <div className="flex gap-2 justify-between">
              {yellowSlots.map((slot, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={slot}
                  onChange={(e) => handleYellowSlotChange(e.target.value, idx)}
                  placeholder={`${idx + 1}`}
                  title={`Letras que NÃO estão na posição ${idx + 1}`}
                  className="w-11 h-11 bg-amber-50/30 text-amber-950 font-sans font-extrabold text-center text-xs rounded-xl border border-amber-200/40 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all uppercase placeholder-amber-400/60"
                />
              ))}
            </div>
          </div>

          {/* General Yellow letters input */}
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-amber-800 flex items-center gap-1 uppercase tracking-widest font-mono">
              🟡 Outras Letras Amarelas (Geral):
            </label>
            <p className="text-[10px] text-slate-500 font-sans font-medium">Letras que existem na palavra, mas você não sabe a posição de jeito nenhum:</p>
            <input
              type="text"
              value={yellowLetters}
              onChange={(e) => setYellowLetters(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))}
              placeholder="Ex: E, T"
              className="w-full bg-amber-50/50 text-amber-950 font-sans font-bold tracking-widest px-4 py-3 rounded-2xl border border-amber-200/30 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600 text-sm uppercase placeholder-amber-400"
            />
          </div>

          {/* Gray letters input */}
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-slate-600 flex items-center gap-1 uppercase tracking-widest font-mono">
              ⚫ Letras Cinzas (Inexistentes):
            </label>
            <p className="text-[10px] text-slate-500 font-sans font-medium">Letras descartadas (não existem na palavra secreta):</p>
            <input
              type="text"
              value={grayLetters}
              onChange={(e) => setGrayLetters(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))}
              placeholder="Ex: O, S, P"
              className="w-full bg-slate-50/50 text-slate-800 font-sans font-bold tracking-widest px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-[#4F46E5] text-sm uppercase placeholder-slate-400"
            />
          </div>

          {/* Interactive Keyboard Helper */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest font-mono block">
              ⌨️ Painel de Teclado Rápido:
            </label>
            <p className="text-[10px] text-slate-400 font-sans font-medium mb-2">
              Toque nas letras do teclado abaixo para marcar rapidamente como <span className="text-slate-600 font-black">Cinza (Inexistente)</span> ou limpar seu estado:
            </p>
            <div className="flex flex-col gap-1.5 bg-slate-50 p-2.5 rounded-2xl border border-slate-150">
              {keyboardRows.map((row, rowIdx) => (
                <div key={rowIdx} className="flex justify-center gap-1">
                  {row.map((letter) => {
                    const isGreen = greenSlots.includes(letter);
                    const isYellow = yellowLetters.includes(letter) || yellowSlots.some(s => s.includes(letter));
                    const isGray = grayLetters.includes(letter);
                    
                    let keyClass = "bg-white text-slate-700 border-slate-200 hover:bg-slate-100";
                    if (isGreen) {
                      keyClass = "bg-emerald-600 text-white border-emerald-500";
                    } else if (isYellow) {
                      keyClass = "bg-amber-500 text-white border-amber-400";
                    } else if (isGray) {
                      keyClass = "bg-slate-600 text-white border-slate-500 opacity-60";
                    }

                    return (
                      <button
                        key={letter}
                        onClick={() => handleKeyToggle(letter)}
                        className={`w-6.5 h-8.5 text-[11px] font-black rounded-lg border flex items-center justify-center transition-all cursor-pointer ${keyClass}`}
                      >
                        {letter}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* List of possible candidates output */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[500px]">
          
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-[#0F172A] font-mono uppercase">
                Palavras possíveis: <strong className="text-[#4F46E5] text-sm font-black font-mono">{matchedWordsWithScores.length}</strong>
              </span>
              
              <div className="flex items-center gap-2">
                <label htmlFor="termo-sort" className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider cursor-pointer">Ordenação:</label>
                <select
                  id="termo-sort"
                  aria-label="Ordenação das palavras possíveis"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "score" | "alpha")}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-[11px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/15"
                >
                  <option value="score">Melhores Palpites (Frequência)</option>
                  <option value="alpha">Ordem Alfabética</option>
                </select>
              </div>
            </div>

            {/* List candidate list cards */}
            {matchedWordsWithScores.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[440px] overflow-y-auto pr-1 scrollbar-thin">
                {matchedWordsWithScores.map(({ word, score }) => (
                  <div
                    key={word}
                    onClick={() => {
                      navigator.clipboard.writeText(word);
                      onNotify(`Palavra "${word.toUpperCase()}" copiada! 🎮`);
                    }}
                    className="group cursor-pointer p-3.5 bg-slate-50 hover:bg-[#4F46E5] hover:text-white rounded-2xl border border-slate-200/70 hover:border-[#4F46E5]/40 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-indigo-500/10 scale-100 hover:scale-[1.02]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-base font-black tracking-widest text-[#0F172A] group-hover:text-white">
                        {word.toUpperCase()}
                      </span>
                      {sortBy === "score" && score > 0 && (
                        <span className="text-[9px] font-mono bg-indigo-50 group-hover:bg-indigo-950/40 text-indigo-600 group-hover:text-indigo-200 px-1.5 py-0.5 rounded-md font-bold shrink-0">
                          S: {score}
                        </span>
                      )}
                    </div>
                    
                    {sortBy === "score" && (
                      <div className="w-full bg-slate-200/60 group-hover:bg-indigo-900/40 h-1 rounded-full mt-3.5 overflow-hidden">
                        <div 
                          className="bg-[#4F46E5] group-hover:bg-white h-full transition-all duration-500" 
                          style={{ width: `${Math.min(100, Math.max(15, (score / (matchedWordsWithScores[0]?.score || 1)) * 100))}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-500 font-sans text-xs font-semibold">Nenhuma palavra de 5 letras corresponde aos seus filtros atuais.</p>
                <button
                  onClick={handleReset}
                  className="mt-3 text-xs font-bold text-[#4F46E5] hover:underline font-mono cursor-pointer uppercase tracking-wider"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 pt-5 text-xs text-slate-400 leading-relaxed flex items-center gap-2 font-medium">
            <Sparkles className="w-4 h-4 text-[#4F46E5] shrink-0 animate-pulse" />
            <span>
              <strong>Dica de Mestre:</strong> Nossas sugestões são ordenadas matematicamente usando frequências de letras dinâmicas da lista filtrada. Escolha palavras no topo para eliminar o maior número possível de opções restantes em um único palpite!
            </span>
          </div>
        </div>
      </div>

      {/* NOVO: Guia Completo de Estratégias para Palavras com 5 Letras (Otimização de Densidade SEO) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)] text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
        <h3 className="font-display text-lg font-black text-[#0F172A] border-b border-slate-200 pb-3 flex items-center gap-2">
          <span>💡</span> Guia Estratégico: Como Decifrar qualquer Palavra com 5 Letras no Termo e Letreco
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-black text-[#0F172A] text-sm mb-1">A importância de filtrar palavras com 5 letras</h4>
              <p>
                Os jogos de adivinhação de palavras, como o Termo, Letreco e o Wordle original, desafiam os jogadores a descobrirem uma <strong>palavra com 5 letras</strong> em apenas seis tentativas. A tarefa de adivinhar uma <strong>palavra com 5 letras</strong> sem ajuda pode ser extremamente complexa devido à vasta quantidade de <strong>palavras com 5 letras</strong> existentes na língua portuguesa. É por isso que compreender a estrutura de uma <strong>palavra com 5 letras</strong> e usar um filtro dinâmico de <strong>palavras com 5 letras</strong> é vital para garantir o sucesso em cada rodada.
              </p>
            </div>

            <div>
              <h4 className="font-black text-[#0F172A] text-sm mb-1">Estatísticas e probabilidades na escolha de palavras com 5 letras</h4>
              <p>
                Ao tentar encontrar uma <strong>palavra com 5 letras</strong> secreta, nem todas as letras têm o mesmo peso. Na língua portuguesa, certas vogais (A, E, O) e consoantes (S, R, N, T) aparecem com muito mais frequência em qualquer <strong>palavra com 5 letras</strong> comum. Portanto, o melhor primeiro palpite para adivinhar sua <strong>palavra com 5 letras</strong> deve ser composto por letras de alta frequência. Evite repetir letras na primeira tentativa de descobrir a <strong>palavra com 5 letras</strong>, pois o objetivo inicial é varrer o maior número de letras possível e filtrar a lista de <strong>palavras com 5 letras</strong> candidatas.
              </p>
            </div>

            <div>
              <h4 className="font-black text-[#0F172A] text-sm mb-1">Dicas para analisar as letras amarelas em uma palavra com 5 letras</h4>
              <p>
                Quando o jogo indica uma letra amarela, significa que aquela letra está presente na <strong>palavra com 5 letras</strong>, mas na posição errada. Registrar essa letra no nosso painel ajuda a afunilar instantaneamente o universo de <strong>palavras com 5 letras</strong> válidas. Se você souber que a letra está presente, o algoritmo de busca examina todas as <strong>palavras com 5 letras</strong> que contêm a letra, descartando qualquer <strong>palavra com 5 letras</strong> que não a possua, facilitando muito o caminho até a vitória.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-black text-[#0F172A] text-sm mb-1">Evitando armadilhas ao buscar uma palavra com 5 letras</h4>
              <p>
                Uma das maiores armadilhas ao tentar adivinhar uma <strong>palavra com 5 letras</strong> é focar em combinações raras antes de eliminar as comuns. Por exemplo, tentar uma <strong>palavra com 5 letras</strong> contendo letras como X, Z, Y ou W muito cedo pode desperdiçar palpites valiosos. Em vez disso, busque uma <strong>palavra com 5 letras</strong> que contenha combinações silábicas comuns. Nosso Termo-Helper ordena as <strong>palavras com 5 letras</strong> sugeridas usando pontuações de frequência de letras, recomendando primeiro a <strong>palavra com 5 letras</strong> que tem maior potencial de revelar novas pistas sobre a resposta correta.
              </p>
            </div>

            <div>
              <h4 className="font-black text-[#0F172A] text-sm mb-1">Dominando o Letreco e o Termo com nossa lista de palavras com 5 letras</h4>
              <p>
                Quer você esteja jogando Letreco, Termo ou Wordle, ter acesso a um banco de dados completo de <strong>palavras com 5 letras</strong> em português limpas de acentuação confusa faz toda a diferença. O nosso gerador ajuda a analisar cenários onde múltiplas <strong>palavras com 5 letras</strong> compartilham quase todas as mesmas letras (como &quot;MARTA&quot;, &quot;CARTA&quot;, &quot;PARTA&quot;). Nesses casos, selecionar uma <strong>palavra com 5 letras</strong> de teste que contenha as consoantes iniciais variantes pode economizar várias tentativas. Pratique e use nosso assistente para encontrar a <strong>palavra com 5 letras</strong> exata que garantirá o seu recorde!
              </p>
            </div>

            <div>
              <h4 className="font-black text-[#0F172A] text-sm mb-1">Como nosso gerador de palavras com 5 letras funciona</h4>
              <p>
                A tecnologia por trás do nosso buscador de <strong>palavras com 5 letras</strong> analisa em tempo real o seu feedback. Sempre que você insere filtros de letras verdes, amarelas ou cinzas, recalculamos quais <strong>palavras com 5 letras</strong> ainda podem ser a resposta certa. Com esse processo, encontrar a sua <strong>palavra com 5 letras</strong> do dia torna-se um exercício lógico estimulante, perfeito para expandir o seu vocabulário e garantir vitórias fáceis em todos os jogos de <strong>palavras com 5 letras</strong> do mercado brasileiro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
