import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Printer,
  BookOpen,
  RefreshCw,
  Trophy,
  HelpCircle,
  Layers,
  Sparkles,
  Award,
  Flame,
  CheckCircle2,
  XCircle,
  RotateCcw
} from "lucide-react";
import { LIBRAS_DICTIONARY } from "../utils/librasData";

interface LetrasLibrasProps {
  onNotify: (message: string) => void;
}

export default function LetrasLibras({ onNotify }: LetrasLibrasProps) {
  const [selectedLetter, setSelectedLetter] = useState<string>("A");
  const [spellerText, setSpellerText] = useState("LIBRAS");
  const [currentSpellIndex, setCurrentSpellIndex] = useState<number>(0);
  const [isPlayingSpell, setIsPlayingSpell] = useState<boolean>(false);
  const [spellSpeed, setSpellSpeed] = useState<number>(1500); // Milissegundos por letra

  // Quiz Game State
  const [quizLetter, setQuizLetter] = useState<string>("A");
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizStreak, setQuizStreak] = useState<number>(0);
  const [quizHighScore, setQuizHighScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("libras_quiz_highscore");
      return saved ? parseInt(saved) : 0;
    } catch {
      return 0;
    }
  });

  // Display Mode: "glossary" (traditional A-Z grid) or "flashcards" (flippable cards for active word / alphabet)
  const [displayMode, setDisplayMode] = useState<"glossary" | "flashcards">("glossary");
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Handle automatic slideshow play for sequential spell spelling
  useEffect(() => {
    let timer: any;
    if (isPlayingSpell && spellerText.length > 0) {
      timer = setInterval(() => {
        setCurrentSpellIndex((prevIndex) => {
          if (prevIndex >= spellerText.length - 1) {
            return 0; // Loop back
          }
          return prevIndex + 1;
        });
      }, spellSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlayingSpell, spellerText, spellSpeed]);

  // Generate a new question for the sign guessing quiz
  const generateNewQuestion = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    
    // Pick 3 other random letters
    const otherLetters = letters.filter(l => l !== randomLetter);
    const shuffledOthers = otherLetters.sort(() => 0.5 - Math.random());
    const options = [randomLetter, shuffledOthers[0], shuffledOthers[1], shuffledOthers[2]];
    
    // Shuffle the options
    const shuffledOptions = options.sort(() => 0.5 - Math.random());
    
    setQuizLetter(randomLetter);
    setQuizOptions(shuffledOptions);
    setQuizAnswered(false);
    setQuizSelectedOption(null);
  };

  // Initialize first quiz question
  useEffect(() => {
    generateNewQuestion();
  }, []);

  const handleSelectOption = (option: string) => {
    if (quizAnswered) return;
    setQuizSelectedOption(option);
    setQuizAnswered(true);
    if (option === quizLetter) {
      const nextScore = quizScore + 1;
      const nextStreak = quizStreak + 1;
      setQuizScore(nextScore);
      setQuizStreak(nextStreak);
      onNotify("Resposta correta! Ótimo trabalho! 🎉");
      if (nextScore > quizHighScore) {
        setQuizHighScore(nextScore);
        try {
          localStorage.setItem("libras_quiz_highscore", nextScore.toString());
        } catch (e) {}
      }
    } else {
      setQuizStreak(0);
      onNotify(`Ops, resposta incorreta! O sinal representa a letra ${quizLetter}. Continue aprendendo! 🤟`);
    }
  };

  const handleResetQuiz = () => {
    setQuizScore(0);
    setQuizStreak(0);
    generateNewQuestion();
    onNotify("Pontuação do quiz reiniciada!");
  };

  // Clean spell text input (only letters)
  const handleSpellTextChange = (text: string) => {
    const clean = text.toUpperCase().replace(/[^A-Z]/g, "");
    setSpellerText(clean);
    setCurrentSpellIndex(0);
  };

  const handlePrintLibras = () => {
    onNotify("Abrindo folha educativa de Libras para impressão... 🖨️");
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const toggleCardFlip = (cardKey: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardKey]: !prev[cardKey]
    }));
  };

  const currentSpelledLetter = spellerText[currentSpellIndex] || "A";

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div className="text-center md:text-left space-y-3.5 border-b border-slate-200/60 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/50 text-[11px] text-[#4F46E5] font-semibold tracking-wider uppercase">
          <BookOpen className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
          <span>Inclusão &amp; Aprendizado Interativo</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
          Alfabeto em <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-violet-600">Libras</span> Interativo
        </h2>
        <p className="text-xs md:text-sm text-slate-500 max-w-2xl leading-relaxed font-medium">
          Aprenda a Língua Brasileira de Sinais (Libras). Explore as 26 letras do alfabeto datilológico (soletrado), controle velocidades de soletração, desafie-se com o quiz interativo e use cartões didáticos flipáveis.
        </p>
      </div>

      {/* Speller Simulator (Text-to-Libras) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full pointer-events-none" />
        <div>
          <h3 className="font-display text-sm font-extrabold text-[#0F172A] uppercase tracking-wider border-b border-slate-100 pb-3 font-mono flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
            Soletrador Automático (Tradutor para Sinais)
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
            Digite um nome ou palavra abaixo para ver a representação sequencial em Libras de forma animada:
          </p>
        </div>

        {/* Input and Player controllers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Controls column */}
          <div className="md:col-span-1 space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-mono">Palavra ou Nome:</label>
              <input
                type="text"
                value={spellerText}
                onChange={(e) => handleSpellTextChange(e.target.value)}
                placeholder="Digite EX: AMOR..."
                maxLength={15}
                className="w-full bg-[#F8FAFC]/50 border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] font-bold tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/15 focus:border-[#4F46E5] text-sm"
              />
            </div>

            {/* Speed Control Slider */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-150 space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                <span>Velocidade de Soletração</span>
                <span className="text-indigo-600">{(spellSpeed / 1000).toFixed(1)}s / letra</span>
              </div>
              <input
                type="range"
                min="500"
                max="3000"
                step="250"
                value={spellSpeed}
                onChange={(e) => setSpellSpeed(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                <span>Rápido (0.5s)</span>
                <span>Lento (3s)</span>
              </div>
            </div>

            {/* Video Player Style Controls */}
            <div className="flex items-center justify-center gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
              <button
                onClick={() => {
                  setCurrentSpellIndex((prev) => Math.max(0, prev - 1));
                  setIsPlayingSpell(false);
                }}
                disabled={currentSpellIndex === 0}
                className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-40 transition-all cursor-pointer rounded-xl"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setIsPlayingSpell(!isPlayingSpell)}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0F172A] hover:bg-[#4F46E5] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                {isPlayingSpell ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-white" />
                    PAUSAR
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    SOLETRA
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setCurrentSpellIndex((prev) => Math.min(spellerText.length - 1, prev + 1));
                  setIsPlayingSpell(false);
                }}
                disabled={currentSpellIndex >= spellerText.length - 1}
                className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-40 transition-all cursor-pointer rounded-xl"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Index label indicator */}
            {spellerText.length > 0 && (
              <div className="text-center text-[11px] font-black text-slate-400 font-mono tracking-wider uppercase">
                Letra {currentSpellIndex + 1} de {spellerText.length} : {currentSpelledLetter}
              </div>
            )}
          </div>

          {/* Spell Animation Board */}
          <div className="md:col-span-2 bg-[#0F172A] border border-slate-800 rounded-3xl p-6 flex items-center justify-center relative min-h-[240px] text-white shadow-inner">
            
            <div className="flex flex-col items-center space-y-3.5">
              {/* Render dynamic hand signal SVG */}
              {LIBRAS_DICTIONARY[currentSpelledLetter] ? (
                <div className="w-28 h-28 bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center justify-center text-white transition-all duration-300 transform hover:scale-105">
                  {LIBRAS_DICTIONARY[currentSpelledLetter].svg}
                </div>
              ) : (
                <span className="text-slate-400 text-xs font-mono">Aguardando palavra...</span>
              )}

              {/* Show Spell highlight */}
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-widest text-[#4F46E5] font-extrabold font-mono">
                  Sinal da Letra:
                </span>
                <div className="text-4xl font-display font-black text-white mt-0.5 tracking-wider">
                  {currentSpelledLetter}
                </div>
              </div>
            </div>

            {/* Spill track highlights */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-1.5 flex-wrap">
              {spellerText.split("").map((char, index) => (
                <span
                  key={index}
                  onClick={() => {
                    setCurrentSpellIndex(index);
                    setIsPlayingSpell(false);
                  }}
                  className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                    currentSpellIndex === index ? "bg-[#4F46E5] scale-125 ring-2 ring-indigo-400" : "bg-slate-700 hover:bg-slate-600"
                  }`}
                  title={`Letra ${char}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NEW: Interactive Guessing Quiz Section */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white rounded-3xl p-6 md:p-8 border border-indigo-800 shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-800/60 pb-4">
          <div className="space-y-1">
            <h3 className="font-display text-lg font-black tracking-tight flex items-center gap-2 text-white">
              <Award className="w-5 h-5 text-indigo-400" />
              Desafio Libras: Qual é a Letra?
            </h3>
            <p className="text-xs text-indigo-200/80 font-medium">
              Teste seus conhecimentos adivinhando o caractere correto do alfabeto em Libras!
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-3 bg-indigo-950/80 border border-indigo-800/80 px-4 py-2 rounded-2xl shrink-0">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold">Máximo: {quizHighScore}</span>
            </div>
            <div className="h-4 w-[1px] bg-indigo-800" />
            <div className="flex items-center gap-1">
              <span className="text-xs font-mono font-black text-indigo-400">Pontos: {quizScore}</span>
            </div>
            <div className="h-4 w-[1px] bg-indigo-800" />
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              <span className="text-xs font-mono font-bold">{quizStreak}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* SVG representation to Guess */}
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-indigo-950/50 border border-indigo-800/40 rounded-2xl p-6 min-h-[200px] relative">
            <div className="w-24 h-24 text-white">
              {LIBRAS_DICTIONARY[quizLetter]?.svg}
            </div>
            <span className="text-[10px] font-mono tracking-widest text-indigo-400 font-extrabold uppercase mt-3">
              Adivinhe este Sinal
            </span>
          </div>

          {/* Options grid and Actions */}
          <div className="md:col-span-7 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {quizOptions.map((option) => {
                const isSelected = quizSelectedOption === option;
                const isCorrectOption = option === quizLetter;
                let btnStyle = "bg-indigo-950/50 hover:bg-indigo-900 border-indigo-800 text-white";
                
                if (quizAnswered) {
                  if (isCorrectOption) {
                    btnStyle = "bg-emerald-600 border-emerald-500 text-white font-black scale-[1.02] shadow-lg shadow-emerald-600/20";
                  } else if (isSelected) {
                    btnStyle = "bg-rose-600 border-rose-500 text-white font-bold opacity-90";
                  } else {
                    btnStyle = "bg-indigo-950/20 border-indigo-900/40 text-indigo-300 opacity-50 cursor-not-allowed";
                  }
                }

                return (
                  <button
                    key={option}
                    disabled={quizAnswered}
                    onClick={() => handleSelectOption(option)}
                    className={`p-4 rounded-xl border text-center transition-all duration-300 text-lg font-black font-mono tracking-wider cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span>{option}</span>
                      {quizAnswered && isCorrectOption && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                      {quizAnswered && isSelected && !isCorrectOption && <XCircle className="w-4 h-4 text-white shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback & Navigation */}
            {quizAnswered && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-indigo-950/40 p-4 rounded-2xl border border-indigo-800/40 animate-fade-in">
                <div className="text-xs font-semibold leading-relaxed text-indigo-100">
                  {quizSelectedOption === quizLetter ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      ✨ Excelente! Você acertou!
                    </span>
                  ) : (
                    <span>
                      Incorreto! A resposta correta era <strong className="text-indigo-400 font-mono text-sm">{quizLetter}</strong>.
                    </span>
                  )}
                  <p className="text-[11px] text-indigo-300/80 font-normal mt-0.5">
                    {LIBRAS_DICTIONARY[quizLetter]?.description}
                  </p>
                </div>

                <button
                  onClick={generateNewQuestion}
                  className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  PRÓXIMA LETRA
                </button>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleResetQuiz}
                className="text-[10px] text-indigo-300/60 hover:text-rose-400 font-mono font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                REINICIAR PLACAR DO QUIZ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Library of static A-Z / Study flashcards */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
          <div>
            <h3 className="font-display text-base font-black text-[#0F172A] flex items-center gap-2">
              <span className="p-1 bg-indigo-50 text-[#4F46E5] rounded-lg">📚</span>
              Glossário &amp; Cartões Didáticos de Libras
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
              Alterne o modo de estudo abaixo para explorar o glossário convencional ou testar sua memória com cartões didáticos flipáveis!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto">
            <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setDisplayMode("glossary")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  displayMode === "glossary"
                    ? "bg-[#0F172A] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Glossário A-Z
              </button>
              <button
                onClick={() => setDisplayMode("flashcards")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  displayMode === "flashcards"
                    ? "bg-[#0F172A] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Cartões de Estudo
              </button>
            </div>

            <button
              onClick={handlePrintLibras}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:border-[#4F46E5] rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-[#4F46E5] transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#4F46E5]" />
              IMPRIMIR
            </button>
          </div>
        </div>

        {displayMode === "glossary" ? (
          <>
            {/* Letters matrix */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2.5">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => {
                    setSelectedLetter(letter);
                    onNotify(`Visualizando instruções do sinal: Letra ${letter} 🤟`);
                  }}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-between transition-all duration-300 cursor-pointer ${
                    selectedLetter === letter
                      ? "bg-[#0F172A] text-white border-stone-950 scale-105 shadow-md shadow-slate-900/10"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <span className="text-xs font-black font-mono mb-1.5">{letter}</span>
                  <div className="w-9 h-9 rounded-xl p-1 flex items-center justify-center">
                    {LIBRAS_DICTIONARY[letter]?.svg || null}
                  </div>
                </button>
              ))}
            </div>

            {/* Detailed Info Card */}
            <div className="bg-slate-50/50 rounded-3xl border border-slate-200/60 p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              <div className="flex justify-center md:border-r border-slate-200/60 py-2 md:col-span-1">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.01)] flex flex-col items-center w-32">
                  <div className="w-16 h-16 text-indigo-950 flex items-center justify-center">
                    {LIBRAS_DICTIONARY[selectedLetter]?.svg || null}
                  </div>
                  <span className="text-sm font-black font-mono text-[#0F172A] mt-2.5">Letra {selectedLetter}</span>
                </div>
              </div>
              
              <div className="md:col-span-3 space-y-3">
                <h4 className="font-display text-base font-black text-[#0F172A] tracking-tight">
                  Instrução Corporal: Como sinalizar a Letra &quot;{selectedLetter}&quot; em Libras
                </h4>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                  {LIBRAS_DICTIONARY[selectedLetter]?.description || "Feche a mão e mantenha o polegar estendido lateralmente."}
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-[10px] font-bold text-slate-500 font-mono uppercase tracking-wider">
                  <span className="bg-white border border-slate-200/60 px-3 py-1 rounded-xl shadow-xs">
                    Orientação: {LIBRAS_DICTIONARY[selectedLetter]?.direction || "Estática"}
                  </span>
                  <span className="bg-white border border-slate-200/60 px-3 py-1 rounded-xl shadow-xs">
                    Classe: Alfabeto Datilológico
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Flashcard Flip Deck (Interactive Study Cards) */
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500">
                💡 Clique em qualquer cartão para virar e conferir a resposta!
              </span>
              <button
                onClick={() => setFlippedCards({})}
                className="text-[#4F46E5] hover:underline font-bold"
              >
                Desvirar todos
              </button>
            </div>

            {/* If there's an entered word, show study cards for that word! Otherwise show standard A-Z */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {(spellerText.length > 0 ? spellerText.split("") : ["A", "B", "C", "D", "E", "F"]).map((char, index) => {
                const cardKey = `${char}-${index}`;
                const isFlipped = !!flippedCards[cardKey];
                
                return (
                  <div
                    key={cardKey}
                    onClick={() => toggleCardFlip(cardKey)}
                    className="h-44 [perspective:1000px] cursor-pointer"
                  >
                    <div
                      className={`relative w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] ${
                        isFlipped ? "[transform:rotateY(180deg)]" : ""
                      }`}
                    >
                      {/* Front: Signal representation */}
                      <div className="absolute inset-0 w-full h-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center [backface-visibility:hidden] hover:border-indigo-400 transition-colors">
                        <div className="w-14 h-14 text-indigo-950 mb-2">
                          {LIBRAS_DICTIONARY[char]?.svg || null}
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                          Clique para Revelar
                        </span>
                      </div>

                      {/* Back: Plain Letter & Details */}
                      <div className="absolute inset-0 w-full h-full bg-[#0F172A] text-white border-2 border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-md">
                        <span className="text-4xl font-display font-black tracking-wider text-white">
                          {char}
                        </span>
                        <p className="text-[9px] text-indigo-200 mt-2 leading-tight line-clamp-3 px-1">
                          {LIBRAS_DICTIONARY[char]?.description || "Sinal representativo do alfabeto datilológico."}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* NOVO: Guia de Estudo e Otimização de Densidade (SEO Educativo) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
        <h3 className="font-display text-lg font-black text-[#0F172A] border-b border-slate-200 pb-3 flex items-center gap-2">
          <span>📚</span> Guia de Estudos: Dominando o Alfabeto em Libras e as Letras em Libras
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
          <div className="space-y-4">
            <div>
              <h4 className="font-black text-[#0F172A] text-sm mb-1">Por que aprender o Alfabeto em Libras?</h4>
              <p>
                Para quem está iniciando os estudos na Língua Brasileira de Sinais, compreender o <strong>alfabeto em libras</strong> é o primeiro marco importante. As <strong>letras em libras</strong> servem para soletrar nomes de pessoas, locais, termos científicos ou qualquer outra palavra que ainda não tenha um sinal próprio no dicionário oficial. Por isso, a prática diária de cada uma das <strong>letras em libras</strong> presentes no <strong>alfabeto em libras</strong> acelera imensamente o processo de inclusão e compreensão visual.
              </p>
            </div>

            <div>
              <h4 className="font-black text-[#0F172A] text-sm mb-1">Datilologia Prática: Treinando as Letras em Libras e o Alfabeto em Libras</h4>
              <p>
                O processo de soletração utilizando o <strong>alfabeto em libras</strong> é conhecido tecnicamente como datilologia. Quando você soletra uma palavra, você junta diferentes <strong>letras em libras</strong> de maneira sequencial. Nosso soletrador automático é perfeito para quem quer treinar a velocidade de recepção das <strong>letras em libras</strong>, permitindo ajustar o tempo de transição das imagens para que você consiga ler as <strong>letras em libras</strong> e dominar o <strong>alfabeto em libras</strong> sem hesitação.
              </p>
            </div>

            <div>
              <h4 className="font-black text-[#0F172A] text-sm mb-1">O Jogo de Quiz do Alfabeto em Libras e Memorização das Letras em Libras</h4>
              <p>
                Para testar se você realmente gravou todas as formas das <strong>letras em libras</strong>, desenvolvemos o quiz do <strong>alfabeto em libras</strong> logo acima. Nele, você visualiza um sinal gráfico representativo de uma das <strong>letras em libras</strong> e deve indicar qual caractere do <strong>alfabeto em libras</strong> corresponde àquela postura da mão. Esse método ativo de estudo fixa as <strong>letras em libras</strong> na memória de longo prazo, tornando a leitura do <strong>alfabeto em libras</strong> automática e natural.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-black text-[#0F172A] text-sm mb-1">Cartões de Estudo Flipáveis das Letras em Libras e do Alfabeto em Libras</h4>
              <p>
                Além do quiz, os flashcards ou cartões de estudo interativos de <strong>letras em libras</strong> e de <strong>alfabeto em libras</strong> são uma ferramenta fantástica. Você pode alternar a visualização para o modo de cartões e tentar adivinhar a letra por trás do sinal. Ao virar o cartão, você descobre a letra correspondente do <strong>alfabeto em libras</strong>. Esse exercício de adivinhação das <strong>letras em libras</strong> fortalece as sinapses cerebrais dedicadas ao reconhecimento do <strong>alfabeto em libras</strong> datilológico.
              </p>
            </div>

            <div>
              <h4 className="font-black text-[#0F172A] text-sm mb-1">Imprima sua Cartilha de Letras em Libras e Alfabeto em Libras</h4>
              <p>
                Nós também disponibilizamos uma função exclusiva para imprimir as <strong>letras em libras</strong> organizadas em uma cartilha de <strong>alfabeto em libras</strong> didática. Ter uma versão impressa das <strong>letras em libras</strong> em mãos é ótimo para salas de aula, oficinas educativas ou simplesmente para colar na parede e relembrar os sinais diariamente. Disseminar as <strong>letras em libras</strong> e ensinar o <strong>alfabeto em libras</strong> para crianças e adultos ajuda a construir uma sociedade mais inclusiva, onde as <strong>letras em libras</strong> e o <strong>alfabeto em libras</strong> são valorizados e conhecidos por todos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NOVO: Dicionário Detalhado do Alfabeto em Libras de A a Z */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
        <div>
          <h3 className="font-display text-base font-black text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-3">
            <span>🤟</span> Dicionário Detalhado: Alfabeto em Libras Completo
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
            Consulte a postura correta para cada uma das <strong>letras em libras</strong> para dominar o <strong>alfabeto em libras</strong> passo a passo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {alphabet.map((char) => (
            <div key={char} className="bg-slate-50/50 border border-slate-200 p-4 rounded-2xl flex items-start gap-3 hover:border-indigo-200 transition-colors">
              <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl p-1.5 shrink-0 flex items-center justify-center text-[#0F172A]">
                {LIBRAS_DICTIONARY[char]?.svg || null}
              </div>
              <div className="space-y-1">
                <span className="text-xs font-black text-[#0F172A] block">
                  Letra {char} no Alfabeto em Libras
                </span>
                <p className="text-[11px] text-slate-500 leading-normal font-medium">
                  {LIBRAS_DICTIONARY[char]?.description || "Posicione os dedos."} Para fazer as <strong>letras em libras</strong> perfeitamente, treine o formato da letra {char} no <strong>alfabeto em libras</strong>.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
