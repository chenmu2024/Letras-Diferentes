import React, { useState, useMemo } from "react";
import { 
  Printer, 
  Layout, 
  Type, 
  Edit3, 
  Grid, 
  ChevronLeft, 
  ChevronRight, 
  Type as CaseIcon, 
  Palette, 
  BookOpen, 
  Sparkles,
  HelpCircle,
  Hash,
  Heart
} from "lucide-react";

// Inject moldes-specific Google Fonts dynamically
if (typeof document !== "undefined") {
  const linkId = "moldes-google-fonts";
  if (!document.getElementById(linkId)) {
    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700;900&family=Great+Vibes&display=swap";
    link.media = "print";
    link.onload = function() {
      (this as any).media = "all";
    };
    document.head.appendChild(link);
  }
}

interface MoldesLetrasProps {
  onNotify: (message: string) => void;
}

type MoldStyle = "outline" | "tracing" | "bubble" | "cursive";
type PaperSize = "grande" | "medio" | "pequeno";
type CategoryType = "uppercase" | "lowercase" | "numbers" | "symbols";

interface ColorOption {
  id: string;
  name: string;
  hex: string;
  bgClass: string;
}

export default function MoldesLetras({ onNotify }: MoldesLetrasProps) {
  // Mode selection: Single letter vs custom word/text
  const [mode, setMode] = useState<"single" | "word">("single");
  const [textInput, setTextInput] = useState<string>("MATEUS");
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);

  // Character sets and selectors
  const [selectedLetter, setSelectedLetter] = useState<string>("A");
  const [activeCategory, setActiveCategory] = useState<CategoryType>("uppercase");

  // Customization states
  const [moldStyle, setMoldStyle] = useState<MoldStyle>("outline");
  const [paperSize, setPaperSize] = useState<PaperSize>("grande");
  const [showGuideLine, setShowGuideLine] = useState<boolean>(true);
  const [showLinedPaper, setShowLinedPaper] = useState<boolean>(false);
  const [selectedColorId, setSelectedColorId] = useState<string>("black");

  // Character sets
  const alphabetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const alphabetLower = "abcdefghijklmnopqrstuvwxyz".split("");
  const numbersSet = "0123456789".split("");
  const symbolsSet = "? ! @ # * ♥ ★ ✿ ✦ ✖ ✚ ☘ ☁ ⚡".split(" ");

  // Color options
  const colorOptions: ColorOption[] = [
    { id: "black", name: "Preto Standard", hex: "#000000", bgClass: "bg-black" },
    { id: "slate", name: "Cinza Escolar", hex: "#64748b", bgClass: "bg-slate-500" },
    { id: "blue", name: "Azul Real", hex: "#1d4ed8", bgClass: "bg-blue-600" },
    { id: "red", name: "Vermelho", hex: "#dc2626", bgClass: "bg-red-600" },
    { id: "pink", name: "Rosa Vibrante", hex: "#db2777", bgClass: "bg-pink-600" },
    { id: "green", name: "Verde Floresta", hex: "#15803d", bgClass: "bg-green-700" }
  ];

  const activeColorHex = useMemo(() => {
    return colorOptions.find((c) => c.id === selectedColorId)?.hex || "#000000";
  }, [selectedColorId]);

  // Compute the current set of letters based on the mode
  const charactersToRender = useMemo(() => {
    if (mode === "single") {
      return [selectedLetter];
    } else {
      // Filter out non-printable whitespace and maintain order
      const chars = textInput
        .split("")
        .filter((c) => c.trim() !== "");
      return chars.length > 0 ? chars : ["A"];
    }
  }, [mode, selectedLetter, textInput]);

  // The active letter in the web preview container
  const activePreviewChar = useMemo(() => {
    if (mode === "single") {
      return selectedLetter;
    } else {
      const idx = Math.min(activeWordIndex, charactersToRender.length - 1);
      const safeIdx = Math.max(0, idx);
      return charactersToRender[safeIdx] || " ";
    }
  }, [mode, selectedLetter, activeWordIndex, charactersToRender]);

  const handlePrint = () => {
    onNotify("Preparando os moldes para impressão em PDF de alta resolução... 🖨️");
    setTimeout(() => {
      window.print();
    }, 600);
  };

  // Font details for SVG text rendering
  const getFontDetails = (style: MoldStyle) => {
    switch (style) {
      case "tracing":
        return {
          fontFamily: "'Fredoka', sans-serif",
          fontWeight: "600",
          fillColor: "none",
          strokeWidth: "2.5",
          strokeDasharray: "7,7"
        };
      case "bubble":
        return {
          fontFamily: "'Fredoka', sans-serif",
          fontWeight: "900",
          fillColor: "#fafafa",
          strokeWidth: "12",
          strokeDasharray: "none"
        };
      case "cursive":
        return {
          fontFamily: "'Great Vibes', cursive",
          fontWeight: "normal",
          fillColor: "none",
          strokeWidth: "4.5",
          strokeDasharray: "none"
        };
      default: // outline
        return {
          fontFamily: "'Fredoka', sans-serif",
          fontWeight: "700",
          fillColor: "none",
          strokeWidth: "7",
          strokeDasharray: "none"
        };
    }
  };

  const fontConfig = getFontDetails(moldStyle);

  // Helper to handle text typing in word mode
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    // Limit to 30 characters to prevent crashes
    if (rawVal.length <= 30) {
      setTextInput(rawVal);
      setActiveWordIndex(0); // reset page preview index
    }
  };

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div className="text-center md:text-left space-y-3.5 border-b border-slate-200/60 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/50 text-[11px] text-[#4F46E5] font-semibold tracking-wider uppercase">
          <Layout className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
          <span>Moldes de Impressão &amp; Atividades Pedagógicas</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
          Molde de Letras para Imprimir: Baixe seu Molde Letras Grátis
        </h2>
        <p className="text-xs md:text-sm text-slate-500 max-w-2xl leading-relaxed font-semibold">
          Precisa de um excelente <strong>molde de letras</strong> de alta qualidade? Nosso gerador permite criar qualquer <strong>molde de letras para imprimir</strong> em formato PDF. Seja um <strong>molde letras</strong> grande para artesanato em EVA, feltro ou cartazes, ou um <strong>molde de letras</strong> pontilhado para atividades escolares de caligrafia infantil, aqui você configura tudo em segundos. Crie agora seu próprio <strong>molde letras</strong> personalizado e facilite seus trabalhos manuais e pedagógicos.
        </p>
      </div>

      {/* Main Layout Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Settings Box */}
        <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-3xl p-6 md:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
          
          {/* Mode Selector Option tabs */}
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-slate-400 block font-mono uppercase tracking-widest">
              Modo de Geração:
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/40">
              <button
                onClick={() => setMode("single")}
                className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mode === "single"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Letra Individual
              </button>
              <button
                onClick={() => setMode("word")}
                className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mode === "word"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Palavra Inteira
              </button>
            </div>
          </div>

          {/* Letter / Character Selector (For Single Mode) */}
          {mode === "single" ? (
            <div className="space-y-2.5 animate-fade-in">
              <label className="text-[11px] font-extrabold text-slate-400 block font-mono uppercase tracking-widest">
                Selecione o Caractere:
              </label>

              {/* Character set categories tab */}
              <div className="flex gap-1 border-b border-slate-100 pb-1.5 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setActiveCategory("uppercase")}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-lg whitespace-nowrap transition-all ${
                    activeCategory === "uppercase" ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  ABC
                </button>
                <button
                  onClick={() => setActiveCategory("lowercase")}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-lg whitespace-nowrap transition-all ${
                    activeCategory === "lowercase" ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  abc
                </button>
                <button
                  onClick={() => setActiveCategory("numbers")}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-lg whitespace-nowrap transition-all ${
                    activeCategory === "numbers" ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  0-9
                </button>
                <button
                  onClick={() => setActiveCategory("symbols")}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-lg whitespace-nowrap transition-all ${
                    activeCategory === "symbols" ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Símbolos
                </button>
              </div>

              {/* The dynamic grid view */}
              <div className="grid grid-cols-6 gap-1.5 max-h-40 overflow-y-auto p-2 border border-slate-200/80 rounded-2xl bg-slate-50/50 scrollbar-thin">
                {activeCategory === "uppercase" &&
                  alphabetUpper.map((letter) => (
                    <button
                      key={letter}
                      onClick={() => setSelectedLetter(letter)}
                      className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        selectedLetter === letter
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-105"
                          : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-150"
                      }`}
                    >
                      {letter}
                    </button>
                  ))}
                {activeCategory === "lowercase" &&
                  alphabetLower.map((letter) => (
                    <button
                      key={letter}
                      onClick={() => setSelectedLetter(letter)}
                      className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        selectedLetter === letter
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-105"
                          : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-150"
                      }`}
                    >
                      {letter}
                    </button>
                  ))}
                {activeCategory === "numbers" &&
                  numbersSet.map((letter) => (
                    <button
                      key={letter}
                      onClick={() => setSelectedLetter(letter)}
                      className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        selectedLetter === letter
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-105"
                          : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-150"
                      }`}
                    >
                      {letter}
                    </button>
                  ))}
                {activeCategory === "symbols" &&
                  symbolsSet.map((letter) => (
                    <button
                      key={letter}
                      onClick={() => setSelectedLetter(letter)}
                      className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        selectedLetter === letter
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-105"
                          : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-150"
                      }`}
                    >
                      {letter}
                    </button>
                  ))}
              </div>
            </div>
          ) : (
            // Word / Text Input (For Word Mode)
            <div className="space-y-2.5 animate-fade-in">
              <label className="text-[11px] font-extrabold text-slate-400 block font-mono uppercase tracking-widest">
                Digite seu Nome ou Palavra:
              </label>
              <input
                type="text"
                value={textInput}
                onChange={handleTextChange}
                placeholder="Ex: MATEUS, SALA, AMOR"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold tracking-wider placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 uppercase"
              />
              <p className="text-[10px] text-slate-400 font-medium">
                *O gerador imprimirá uma página A4 exclusiva para cada letra da palavra!
              </p>
            </div>
          )}

          {/* Style picker */}
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-slate-400 block font-mono uppercase tracking-widest">Estilo de Molde:</label>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => setMoldStyle("outline")}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-left rounded-xl border transition-all duration-300 cursor-pointer ${
                  moldStyle === "outline" ? "bg-slate-900 text-white border-slate-900 shadow-sm" : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <Type className="w-4 h-4 shrink-0" />
                </div>
                <div>
                  <div className="font-extrabold text-xs">Contorno Escolar Regular</div>
                  <p className="text-[9.5px] opacity-75 mt-0.5">Letras limpas e grossas para recorte de EVA/feltro.</p>
                </div>
              </button>

              <button
                onClick={() => setMoldStyle("tracing")}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-left rounded-xl border transition-all duration-300 cursor-pointer ${
                  moldStyle === "tracing" ? "bg-slate-900 text-white border-slate-900 shadow-sm" : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <Edit3 className="w-4 h-4 shrink-0" />
                </div>
                <div>
                  <div className="font-extrabold text-xs">Tracejado Pontilhado (Caligrafia)</div>
                  <p className="text-[9.5px] opacity-75 mt-0.5">Guia pontilhado com seta para treino de escrita infantil.</p>
                </div>
              </button>

              <button
                onClick={() => setMoldStyle("bubble")}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-left rounded-xl border transition-all duration-300 cursor-pointer ${
                  moldStyle === "bubble" ? "bg-slate-900 text-white border-slate-900 shadow-sm" : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <Grid className="w-4 h-4 shrink-0" />
                </div>
                <div>
                  <div className="font-extrabold text-xs">Letra Bolha (Cartoon)</div>
                  <p className="text-[9.5px] opacity-75 mt-0.5">Estilo gordinho ideal para pintura ou cartazes.</p>
                </div>
              </button>

              <button
                onClick={() => setMoldStyle("cursive")}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-left rounded-xl border transition-all duration-300 cursor-pointer ${
                  moldStyle === "cursive" ? "bg-slate-900 text-white border-slate-900 shadow-sm" : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <Type className="w-4 h-4 shrink-0 font-serif italic" />
                </div>
                <div>
                  <div className="font-extrabold text-xs">Cursiva Cênica (Elegante)</div>
                  <p className="text-[9.5px] opacity-75 mt-0.5">Letras de mão delicadas para eventos ou decoração.</p>
                </div>
              </button>
            </div>
          </div>

          {/* Color pickers */}
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-slate-400 block font-mono uppercase tracking-widest flex items-center gap-1">
              <Palette className="w-3 h-3 text-indigo-500" />
              Cor do Contorno:
            </label>
            <div className="flex gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColorId(color.id)}
                  title={color.name}
                  className={`w-7 h-7 rounded-full ${color.bgClass} flex items-center justify-center border-2 transition-all cursor-pointer ${
                    selectedColorId === color.id
                      ? "border-indigo-600 scale-110 ring-2 ring-indigo-150"
                      : "border-transparent hover:scale-105"
                  }`}
                >
                  {selectedColorId === color.id && (
                    <span className="block w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sheet Sizing options */}
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-slate-400 block font-mono uppercase tracking-widest">Tamanho da Letra na Folha:</label>
            <div className="grid grid-cols-3 gap-2">
              {["grande", "medio", "pequeno"].map((size) => (
                <button
                   key={size}
                   onClick={() => setPaperSize(size as any)}
                   className={`py-2 rounded-xl text-xs font-bold capitalize border transition-all duration-300 cursor-pointer ${
                     paperSize === size
                       ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                       : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                   }`}
                >
                  {size === "grande" ? "A4 Cheio" : size === "medio" ? "Médio" : "Pequeno"}
                </button>
              ))}
            </div>
          </div>

          {/* Checkboxes parameters */}
          <div className="space-y-2.5 pt-4 border-t border-slate-100">
            <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showGuideLine}
                onChange={(e) => setShowGuideLine(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 accent-indigo-600 cursor-pointer"
              />
              Linha guia de margem (corte)
            </label>

            <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showLinedPaper}
                onChange={(e) => setShowLinedPaper(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 accent-indigo-600 cursor-pointer"
              />
              Pautas horizontais de caderno
            </label>
          </div>

          {/* Print Trigger Button */}
          <button
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-[11px] uppercase tracking-widest transition-all duration-300 shadow-md shadow-indigo-500/15 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            IMPRIMIR MOLDES EM PDF
          </button>
        </div>

        {/* Printable/Print-Ready Preview Canvas */}
        <div className="lg:col-span-2 bg-slate-100/40 border border-slate-200/80 rounded-3xl p-5 md:p-7 flex flex-col items-center justify-center overflow-x-auto min-h-[480px]">
          
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Pré-visualização do Papel A4
            </span>

            {/* Word Mode Pagination Indicator */}
            {mode === "word" && charactersToRender.length > 1 && (
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                <button
                  disabled={activeWordIndex === 0}
                  onClick={() => setActiveWordIndex((p) => Math.max(0, p - 1))}
                  className="p-1 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                  title="Letra Anterior"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                </button>
                <span className="text-xs font-black text-slate-800 font-sans">
                  Página {activeWordIndex + 1} de {charactersToRender.length} ({charactersToRender[activeWordIndex]})
                </span>
                <button
                  disabled={activeWordIndex >= charactersToRender.length - 1}
                  onClick={() => setActiveWordIndex((p) => Math.min(charactersToRender.length - 1, p + 1))}
                  className="p-1 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                  title="Próxima Letra"
                >
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            )}
          </div>

          {/* Interactive Screen Preview Container representing standard A4 Portrait */}
          <div
            className="bg-white text-black p-8 md:p-12 shadow-[0_12px_45px_rgba(0,0,0,0.04)] flex flex-col justify-between items-center relative select-none border border-slate-200 rounded-2xl w-full max-w-[420px]"
            style={{
              aspectRatio: "1/1.414", // Standard A4 Ratio
            }}
          >
            {/* Dashed Margin Guidelines */}
            {showGuideLine && (
              <div className="absolute inset-4 border border-dashed border-slate-300 rounded pointer-events-none" />
            )}

            {/* Educational worksheet style header */}
            <div className="w-full border-b-2 border-slate-800 pb-2.5 flex justify-between items-end mb-4">
              <div>
                <h4 className="font-sans text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  {moldStyle === "tracing" ? "Atividade Prática Escolar" : "Molde de Letra para Trabalho Manual"}
                </h4>
                <div className="text-[9px] text-slate-400 font-mono mt-0.5">
                  Visualização da Letra: <strong>{activePreviewChar}</strong>
                </div>
              </div>
              <div className="text-right text-[8px] text-slate-400 font-mono">
                letradiferentes.org
              </div>
            </div>

            {/* Vector letter rendering inside SVG for perfect centering */}
            <div className="flex-1 w-full flex items-center justify-center relative">
              <svg 
                width="350"
                height="350"
                className="w-full h-full max-h-[280px] md:max-h-[320px]" 
                viewBox="0 0 350 350" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Horizontal Handwriting Guidelines in background */}
                {showLinedPaper && (
                  <g stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3">
                    <line x1="10" y1="90" x2="340" y2="90" stroke="#fecdd3" strokeDasharray="none" /> {/* Pink top guideline */}
                    <line x1="10" y1="150" x2="340" y2="150" /> {/* dashed middle line */}
                    <line x1="10" y1="210" x2="340" y2="210" /> {/* dashed secondary middle line */}
                    <line x1="10" y1="270" x2="340" y2="270" stroke="#fecdd3" strokeDasharray="none" /> {/* Pink bottom guideline */}
                  </g>
                )}

                {/* SVG centered text */}
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={fontConfig.fillColor}
                  stroke={activeColorHex}
                  strokeWidth={fontConfig.strokeWidth}
                  strokeDasharray={fontConfig.strokeDasharray}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  style={{
                    fontFamily: fontConfig.fontFamily,
                    fontSize: paperSize === "grande" ? "240px" : paperSize === "medio" ? "150px" : "90px",
                    fontWeight: fontConfig.fontWeight,
                    transition: "all 0.3s"
                  }}
                >
                  {activePreviewChar}
                </text>

                {/* Tracing guide directions */}
                {moldStyle === "tracing" && activePreviewChar.trim() !== "" && (
                  <g transform="translate(110, 50)" className="opacity-70">
                    <text x="0" y="0" fill="#94a3b8" fontSize="10" fontFamily="monospace">✏️ Inicie aqui</text>
                  </g>
                )}
              </svg>
            </div>

            {/* Educational guide footer */}
            <div className="w-full text-center border-t border-slate-200 pt-3 text-[8px] text-slate-400 leading-normal font-sans">
              <span>Para salvar como PDF: clique em <strong>Imprimir</strong>, selecione a impressora como <strong>&quot;Salvar como PDF&quot;</strong> e imprima.</span>
            </div>
          </div>

          {/* Quick horizontal preview carousel for word letters */}
          {mode === "word" && charactersToRender.length > 1 && (
            <div className="w-full max-w-[420px] mt-4 flex items-center gap-1 overflow-x-auto py-1 no-scrollbar bg-slate-50 border border-slate-200/50 p-2 rounded-2xl">
              {charactersToRender.map((char, index) => (
                <button
                  key={index}
                  onClick={() => setActiveWordIndex(index)}
                  className={`w-9 h-9 shrink-0 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    activeWordIndex === index
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 scale-105"
                      : "bg-white text-slate-600 border border-slate-150 hover:bg-slate-100"
                  }`}
                >
                  {char}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hidden Print-Only Container (Purely for multi-page paper output on Window Print) */}
      <div id="print-area" className="hidden print:block">
        {charactersToRender.map((char, index) => (
          <div
            key={index}
            className="bg-white text-black p-16 flex flex-col justify-between items-center relative select-none border border-slate-300"
            style={{
              width: "210mm",
              height: "297mm",
              pageBreakAfter: index === charactersToRender.length - 1 ? "avoid" : "always",
              breakAfter: index === charactersToRender.length - 1 ? "avoid" : "page",
              boxSizing: "border-box"
            }}
          >
            {/* Dashed Margin Guidelines */}
            {showGuideLine && (
              <div className="absolute inset-8 border border-dashed border-slate-300 rounded pointer-events-none" />
            )}

            {/* School Worksheet Header */}
            <div className="w-full border-b-2 border-slate-800 pb-3 flex justify-between items-end">
              <div>
                <h4 className="font-sans text-xs uppercase font-extrabold text-slate-500 tracking-wider">
                  {moldStyle === "tracing" ? "Atividade de Caligrafia / Coordenação" : "Moldes de Letras para Imprimir"}
                </h4>
                <div className="text-[10px] text-slate-400 font-mono mt-1">
                  Atividade Prática de Recorte e Escrita da Letra: <strong>{char}</strong>
                </div>
              </div>
              <div className="text-right text-[9px] text-slate-400 font-mono">
                letradiferentes.org
              </div>
            </div>

            {/* Mold vector rendering inside SVG */}
            <div className="flex-1 w-full flex items-center justify-center">
              <svg 
                width="400"
                height="400"
                className="w-full h-[210mm] max-h-[85%]" 
                viewBox="0 0 400 400" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Lined notebook writing lines */}
                {showLinedPaper && (
                  <g stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4">
                    <line x1="10" y1="100" x2="390" y2="100" stroke="#fecdd3" strokeDasharray="none" />
                    <line x1="10" y1="160" x2="390" y2="160" />
                    <line x1="10" y1="220" x2="390" y2="220" />
                    <line x1="10" y1="280" x2="390" y2="280" stroke="#fecdd3" strokeDasharray="none" />
                  </g>
                )}

                {/* SVG text rendering for print */}
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={fontConfig.fillColor}
                  stroke={activeColorHex}
                  strokeWidth={fontConfig.strokeWidth}
                  strokeDasharray={fontConfig.strokeDasharray}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  style={{
                    fontFamily: fontConfig.fontFamily,
                    fontSize: paperSize === "grande" ? "280px" : paperSize === "medio" ? "180px" : "110px",
                    fontWeight: fontConfig.fontWeight
                  }}
                >
                  {char}
                </text>

                {/* Tracing instructions for school training */}
                {moldStyle === "tracing" && char.trim() !== "" && (
                  <g transform="translate(130, 60)">
                    <text x="0" y="0" fill="#94a3b8" fontSize="10" fontFamily="monospace">✏️ Inicie aqui</text>
                  </g>
                )}
              </svg>
            </div>

            {/* Educational guide footer */}
            <div className="w-full text-center border-t border-slate-200 pt-4 text-[10px] text-slate-500 font-sans">
              <span>Gerado gratuitamente em <strong>letradiferentes.org</strong> • Folha de Molde de Letras A4 Cheio</span>
            </div>
          </div>
        ))}
      </div>

      {/* Manual de Uso e Guia de Otimização SEO com alta densidade de palavras-chave */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="font-display text-lg md:text-xl font-black text-[#0F172A] flex items-center gap-2 uppercase tracking-tight">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </span>
            Guia Completo de Molde de Letras e Molde Letras para Imprimir
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Tudo o que você precisa saber para criar, baixar e utilizar seu molde de letras favorito gratuitamente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coluna 1: Como usar */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Aplicações do Molde de Letras e Molde Letras
            </h4>
            <div className="space-y-3 text-xs text-slate-500 font-semibold leading-relaxed">
              <p>
                O <strong>molde de letras</strong> é um recurso pedagógico indispensável na educação infantil. Com um bom <strong>molde de letras para imprimir</strong>, os educadores conseguem preparar cartazes, painéis de sala de aula e murais com facilidade. Além disso, o <strong>molde letras</strong> em tamanho gigante serve perfeitamente de base para recortes de tecidos, feltro e EVA de forma prática.
              </p>
              <p>
                Se você trabalha com decoração de festas, um <strong>molde letras cursivas</strong> traz elegância e personalização para faixas, nomes de aniversariantes e sinalização de casamentos. Nosso gerador automatiza todo esse processo: você digita a palavra desejada e o sistema gera o <strong>molde de letras</strong> exato que você precisa em folhas A4 individuais prontas para serem impressas ou salvas em formato digital.
              </p>
              <p>
                Para quem está ensinando caligrafia infantil, o estilo de <strong>molde de letras tracejado</strong> (pontilhado) é ideal. Ele guia o traçado correto da escrita escolar, combinando a diversão de pintar com o treino motor essencial. O <strong>molde letras de mão</strong> ou cursiva também melhora a destreza manual e a concentração dos estudantes durante o processo de alfabetização.
              </p>
            </div>
          </div>

          {/* Coluna 2: Dicas de Materiais */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-emerald-500" />
              Melhores Materiais para seu Molde Letras
            </h4>
            <div className="space-y-3 text-xs text-slate-500 font-semibold leading-relaxed">
              <p>
                Depois de escolher o seu <strong>molde de letras</strong> em nosso painel, você pode imprimi-lo em diferentes tipos de papéis para facilitar a transferência para outros suportes. Se você vai fazer um <strong>molde letras</strong> para feltro ou EVA, sugerimos imprimir em papel de maior gramatura (como papel cartão ou papel opalina 180g), criando assim um <strong>molde de letras</strong> resistente que pode ser reutilizado diversas vezes.
              </p>
              <p>
                Caso queira usar o <strong>molde letras</strong> diretamente para pintura ou preenchimento de colagens das crianças na escola, o papel sulfite convencional de 75g atende perfeitamente. Lembre-se de que você pode mudar a cor do contorno do seu <strong>molde de letras</strong> nas opções de configuração do gerador para economizar tinta preta da impressora ou para combinar com a paleta de cores do seu projeto de artesanato.
              </p>
              <p>
                Muitas pessoas buscam <strong>molde letras bolha</strong> para criar cartazes chamativos em feiras de ciências ou trabalhos escolares. Com a nossa ferramenta, você seleciona o estilo bolha e recebe na hora um <strong>molde de letras 3D / cartoon</strong> de contorno suave e largo, ideal para ser colorido com giz de cera, guache, lantejoulas ou canetinhas coloridas.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion-like structure (all open, good for layout & SEO reading density) */}
        <div className="border-t border-slate-150 pt-6 space-y-5">
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-tight">
            <HelpCircle className="w-4 h-4 text-indigo-500" />
            Dúvidas Frequentes sobre Molde de Letras e Molde Letras para Imprimir
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-slate-500 font-semibold leading-relaxed">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-1.5">
              <span className="text-[#0F172A] font-black text-xs block flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-indigo-500" />
                1. O gerador de molde de letras é 100% gratuito?
              </span>
              <p>
                Sim! Você pode criar qualquer <strong>molde de letras</strong>, numerais ou palavras personalizadas sem pagar absolutamente nada. A nossa ferramenta de <strong>molde letras</strong> gera arquivos perfeitamente adaptados para impressão A4 de alta qualidade sem limites de uso diário.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-1.5">
              <span className="text-[#0F172A] font-black text-xs block flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-indigo-500" />
                2. Como salvar o molde letras em formato PDF?
              </span>
              <p>
                É extremamente simples! Basta ajustar o estilo de <strong>molde de letras</strong> desejado (tamanho, cor, pautas, bordas) e clicar no botão azul &quot;Imprimir Moldes em PDF&quot;. Na janela que se abrir, altere o destino da sua impressora para &quot;Salvar como PDF&quot; e guarde o seu arquivo de <strong>molde letras</strong> direto no seu celular ou computador.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-1.5">
              <span className="text-[#0F172A] font-black text-xs block flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-indigo-500" />
                3. Consigo fazer um molde de letras gigante em folha A4 cheia?
              </span>
              <p>
                Com certeza! A configuração padrão de tamanho de folha para o <strong>molde letras</strong> é &quot;A4 Cheio&quot;, projetada especificamente para aproveitar ao máximo a área útil imprimível da folha. Isso garante que o seu <strong>molde de letras</strong> fique com o maior tamanho físico possível, facilitando o recorte para decoração.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-1.5">
              <span className="text-[#0F172A] font-black text-xs block flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-indigo-500" />
                4. O gerador permite criar molde letras com palavras completas?
              </span>
              <p>
                Sim, este é um dos grandes diferenciais do nosso gerador de <strong>molde de letras</strong>! Ao alternar para o modo &quot;Palavra Inteira&quot;, você digita um nome completo e nossa ferramenta gera automaticamente uma sequência ordenada de páginas de <strong>molde letras</strong> prontas para imprimir. Cada letra é colocada em uma página dedicada para preservar o tamanho grande.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-1.5">
              <span className="text-[#0F172A] font-black text-xs block flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-indigo-500" />
                5. Qual o melhor molde de letras para ensinar crianças na escola?
              </span>
              <p>
                Para crianças in fase de alfabetização inicial, o melhor estilo é o <strong>molde de letras tracejado pontilhado</strong>. Você também pode ativar a opção de &quot;Pautas horizontais de caderno&quot; para simular uma folha de caligrafia real, proporcionando um <strong>molde letras</strong> didático que treina a coordenação motora e a simetria de forma lúdica.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-1.5">
              <span className="text-[#0F172A] font-black text-xs block flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-indigo-500" />
                6. Posso usar os moldes de letras para trabalhos em EVA e Feltro?
              </span>
              <p>
                Sim, artesãos profissionais adoram nossa ferramenta de <strong>molde letras</strong> para agilizar a criação de peças decorativas. Escolha a opção de estilo &quot;Contorno Escolar Regular&quot; para obter traços limpos e espessos que servem perfeitamente de guia físico na hora de transferir e recortar seu <strong>molde de letras</strong> no EVA ou tecido feltro de sua preferência.
              </p>
            </div>
          </div>
        </div>

        {/* Final callout to improve density further */}
        <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-extrabold text-[#0F172A] flex items-center gap-1">
              <Heart className="w-4 h-4 text-pink-500 animate-pulse" />
              Crie agora mesmo o seu molde de letras!
            </span>
            <p className="text-slate-500 font-semibold leading-relaxed">
              Não perca mais tempo desenhando contornos manuais complicados. Utilize o nosso configurador interativo no topo desta página, gere o seu próprio arquivo de <strong>molde de letras</strong> e de <strong>molde letras para imprimir</strong> com poucos cliques e leve mais diversão para a sala de aula ou para o seu ateliê de costura e artesanato!
            </p>
          </div>
        </div>

        {/* Internal Links/Credits */}
        <div className="text-[11px] text-slate-400 font-medium pt-4 border-t border-slate-100">
          <span>Aproveite para complementar sua aula exibindo também o nosso <a href="#libras" className="text-[#4F46E5] hover:underline font-bold transition-all">Alfabeto em Libras Interativo</a> com cartões e correspondências de sinais em PDF para impressão.</span>
        </div>
      </div>
    </div>
  );
}
