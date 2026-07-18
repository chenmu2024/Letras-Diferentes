import React, { useState } from "react";
import { InkStyle, TATTOO_FONTS } from "../utils/tattooFonts";
import { Download, Copy, Check, Eye, PenTool, Sparkles, Sliders, Info, HelpCircle, ShieldAlert, Plus, Trash2, Heart, RotateCcw, FlipHorizontal } from "lucide-react";

// Helper function to build a dynamic SVG path for text bending/curving
const getCurvePathD = (w: number, h: number, curveVal: number) => {
  if (curveVal === 0) {
    return `M 50,${h / 2} L ${w - 50},${h / 2}`;
  }
  const startX = 50;
  const endX = w - 50;
  const centerY = h / 2;
  const startY = centerY - curveVal / 3;
  const endY = centerY - curveVal / 3;
  const controlY = centerY + curveVal;
  return `M ${startX},${startY} Q ${w / 2},${controlY} ${endX},${endY}`;
};

interface LetrasTatuagemProps {
  onNotify: (message: string) => void;
}

export default function LetrasTatuagem({ onNotify }: LetrasTatuagemProps) {
  const [inputText, setInputText] = useState("Resiliência");
  const [selectedFont, setSelectedFont] = useState(TATTOO_FONTS[0]);
  const [fontSize, setFontSize] = useState<number>(36);
  const [bgColor, setBgColor] = useState<string>("bg-[#161210]"); // Dark wood/leather
  const [textColor, setTextColor] = useState<string>("#f5ebe0"); // Parchment/ink
  const [inkOpacity, setInkOpacity] = useState<number>(0.95);
  const [copied, setCopied] = useState(false);
  
  // Custom interactive settings
  const [selectedDecoration, setSelectedDecoration] = useState<number>(0);
  const [letterSpacing, setLetterSpacing] = useState<string>("tracking-wide");
  const [placement, setPlacement] = useState<"canvas" | "forearm" | "collarbone" | "wrist" | "ribs">("canvas");

  // NEW highly interactive controls
  const [tiltAngle, setTiltAngle] = useState<number>(0);
  const [inkBlur, setInkBlur] = useState<number>(0);

  // EXTREMELY REQUISITE PROFESSIONAL UPGRADES
  const [sidebarTab, setSidebarTab] = useState<"text" | "style" | "decal">("text");
  const [inkStyle, setInkStyle] = useState<"solid" | "graywash" | "fineline" | "bold">("solid");
  const [curvature, setCurvature] = useState<number>(0);
  const [isMirrored, setIsMirrored] = useState<boolean>(false);

  // Saved sketches locally (localStorage)
  const [savedSketches, setSavedSketches] = useState<Array<{
    id: string;
    text: string;
    fontId: string;
    decorationIdx: number;
    letterSpacing: string;
    fontSize: number;
    bgColor: string;
    textColor: string;
    tiltAngle: number;
    inkBlur: number;
    inkOpacity: number;
    inkStyle?: "solid" | "graywash" | "fineline" | "bold";
    curvature?: number;
    isMirrored?: boolean;
  }>>(() => {
    try {
      const saved = localStorage.getItem("letras_tatuagem_saved_drafts_v2");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const backgroundPresets = [
    { name: "Couro Escuro 🪵", value: "bg-[#161210]", text: "#f5ebe0" },
    { name: "Pele Clara 🪶", value: "bg-[#eed1bd]", text: "#1a120b" },
    { name: "Pele Morena 🏺", value: "bg-[#d39e82]", text: "#0c0500" },
    { name: "Papel Antigo 📜", value: "bg-[#f4ebd0]", text: "#1b1a17" },
    { name: "Preto Absoluto 🖤", value: "bg-black", text: "#ffffff" }
  ];

  const popularPhrases = [
    { text: "Resiliência", label: "Resiliência" },
    { text: "Carpe Diem", label: "Carpe Diem" },
    { text: "Amor Fati", label: "Amor Fati" },
    { text: "Memento Mori", label: "Memento Mori" },
    { text: "Seja Luz", label: "Seja Luz" },
    { text: "Blessed", label: "Blessed" },
    { text: "Gratidão", label: "Gratidão" },
    { text: "Fé", label: "Fé" },
    { text: "Stay Strong", label: "Stay Strong" },
    { text: "Tudo Passa", label: "Tudo Passa" }
  ];

  const decorations = [
    { name: "Nenhum", left: "", right: "" },
    { name: "Asas 🪽", left: "🪽 ", right: " 🪽" },
    { name: "Moldura ꧁꧂", left: "꧁ ", right: " ꧂" },
    { name: "Estrelas ✦", left: "✦ ", right: " ✦" },
    { name: "Pena 🪶", left: "🪶 ", right: " 🪶" },
    { name: "Espadas ⚔️", left: "⚔️ ", right: " ⚔️" },
    { name: "Flores 💮", left: "💮 ", right: " 💮" },
    { name: "Infinito ∞", left: "∞ ", right: " ∞" }
  ];

  const activeDecoration = decorations[selectedDecoration] || decorations[0];
  const finalDecoratedText = `${activeDecoration.left}${inputText}${activeDecoration.right}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(finalDecoratedText);
    setCopied(true);
    onNotify("Esboço de Tatuagem copiado com sucesso! 🖋️");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveSketch = () => {
    if (savedSketches.length >= 8) {
      onNotify("Limite máximo de 8 esboços atingido! Exclua algum rascunho antigo para salvar. ⚠️");
      return;
    }
    const newSketch = {
      id: Math.random().toString(36).substr(2, 9),
      text: inputText,
      fontId: selectedFont.id,
      decorationIdx: selectedDecoration,
      letterSpacing,
      fontSize,
      bgColor,
      textColor,
      tiltAngle,
      inkBlur,
      inkOpacity,
      inkStyle,
      curvature,
      isMirrored
    };
    const updated = [newSketch, ...savedSketches];
    setSavedSketches(updated);
    localStorage.setItem("letras_tatuagem_saved_drafts_v2", JSON.stringify(updated));
    onNotify("Design de Tatuagem salvo na sua galeria local! 💾");
  };

  const handleLoadSketch = (sketch: typeof savedSketches[0]) => {
    setInputText(sketch.text);
    const font = TATTOO_FONTS.find(f => f.id === sketch.fontId) || TATTOO_FONTS[0];
    setSelectedFont(font);
    setSelectedDecoration(sketch.decorationIdx);
    setLetterSpacing(sketch.letterSpacing);
    setFontSize(sketch.fontSize);
    setBgColor(sketch.bgColor);
    setTextColor(sketch.textColor);
    setTiltAngle(sketch.tiltAngle ?? 0);
    setInkBlur(sketch.inkBlur ?? 0);
    setInkOpacity(sketch.inkOpacity ?? 0.95);
    setInkStyle(sketch.inkStyle ?? "solid");
    setCurvature(sketch.curvature ?? 0);
    setIsMirrored(sketch.isMirrored ?? false);
    onNotify("Esboço carregado com sucesso! 🖋️");
  };

  const handleDeleteSketch = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedSketches.filter(s => s.id !== id);
    setSavedSketches(updated);
    localStorage.setItem("letras_tatuagem_saved_drafts_v2", JSON.stringify(updated));
    onNotify("Esboço excluído da galeria! 🗑️");
  };

  const handleDownloadSVG = () => {
    const trackingValue = 
      letterSpacing === "tracking-tighter" ? "-0.05em" :
      letterSpacing === "tracking-tight" ? "-0.02em" :
      letterSpacing === "tracking-normal" ? "0" :
      letterSpacing === "tracking-wide" ? "0.05em" : "0.15em";

    // Curve path definition
    const pathD = getCurvePathD(800, 400, curvature);

    // Ink style attributes for output SVG
    let fillAttr = textColor;
    let strokeAttr = "none";
    let strokeWidthAttr = "0";

    let defsGrad = "";
    if (inkStyle === "graywash") {
      fillAttr = "url(#graywashGradDl)";
      defsGrad = `
        <linearGradient id="graywashGradDl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${textColor}" />
          <stop offset="100%" stop-color="${textColor}" stop-opacity="0.2" />
        </linearGradient>
      `;
    } else if (inkStyle === "fineline") {
      fillAttr = "none";
      strokeAttr = textColor;
      strokeWidthAttr = "1.5";
    } else if (inkStyle === "bold") {
      fillAttr = textColor;
      strokeAttr = textColor;
      strokeWidthAttr = "3.5";
    }

    const blurFilterDef = inkBlur > 0 ? `
      <filter id="inkBlurDl">
        <feGaussianBlur stdDeviation="${inkBlur}" />
      </filter>
    ` : "";

    const filterAttr = inkBlur > 0 ? 'filter="url(#inkBlurDl)"' : "";

    // Mirror transform for stencil
    const transformContent = isMirrored 
      ? `transform="translate(400, 200) scale(-1, 1) translate(-400, -200) rotate(${tiltAngle} 400 200)"`
      : `transform="rotate(${tiltAngle} 400 200)"`;

    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
        <defs>
          ${defsGrad}
          ${blurFilterDef}
        </defs>
        <rect width="100%" height="100%" fill="${bgColor.startsWith("bg-[#") ? bgColor.replace("bg-[", "").replace("]", "") : "#161210"}" />
        <g ${filterAttr} ${transformContent}>
          <path id="tattooCurvePathDl" d="${pathD}" fill="none" stroke="transparent" />
          <text 
            dominant-baseline="middle" 
            text-anchor="middle" 
            font-family="${selectedFont.fontFamily}" 
            font-size="${fontSize * 1.5}px" 
            opacity="${inkOpacity}"
            letter-spacing="${trackingValue}"
            font-style="${selectedFont.fontStyle || "normal"}"
            font-weight="${selectedFont.fontWeight || "normal"}"
            fill="${fillAttr}"
            stroke="${strokeAttr}"
            stroke-width="${strokeWidthAttr}"
          >
            <textPath href="#tattooCurvePathDl" startOffset="50%">
              ${finalDecoratedText}
            </textPath>
          </text>
        </g>
      </svg>
    `;
    const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `letras-tatuagem-${inputText.toLowerCase().replace(/\s+/g, "-")}${isMirrored ? "-stencil-mirrored" : ""}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onNotify("Decalque em SVG baixado! Ótimo para impressão em papel hectográfico. 🎉");
  };

  // Safe inline-style building for the dynamic text simulation
  const getSimulatedTextStyle = (isAnatomy: boolean) => {
    const baseScale = isAnatomy ? 0.75 : 1.0;
    return {
      fontFamily: selectedFont.fontFamily,
      fontSize: `${fontSize * baseScale}px`,
      color: textColor,
      opacity: inkOpacity,
      fontStyle: selectedFont.fontStyle || "normal",
      fontWeight: selectedFont.fontWeight || "normal",
      filter: inkBlur > 0 ? `blur(${inkBlur}px)` : undefined,
      transform: `rotate(${tiltAngle}deg) ${isAnatomy && placement === "forearm" ? "rotate(-90deg)" : ""}`,
      textShadow: bgColor.includes("bg-[#eed1bd]") || bgColor.includes("bg-[#d39e82]")
        ? "1px 1px 2px rgba(26, 18, 11, 0.15)"
        : "0 2px 4px rgba(0,0,0,0.45)",
      transition: "all 0.3s ease-out"
    };
  };

  // High-fidelity SVG live preview renderer
  const renderTattooSVG = (isAnatomy = false, currentPlacement = "canvas") => {
    const trackingValue = 
      letterSpacing === "tracking-tighter" ? "-0.05em" :
      letterSpacing === "tracking-tight" ? "-0.02em" :
      letterSpacing === "tracking-normal" ? "0" :
      letterSpacing === "tracking-wide" ? "0.05em" : "0.15em";

    // Adjust scale for anatomy simulator
    const baseScale = isAnatomy ? 0.6 : 1.0;
    const finalFontSize = fontSize * baseScale * 1.35;

    // Build the dynamic curved path inside viewBox (800 x 400)
    const pathD = getCurvePathD(800, 400, curvature);

    // Determine fill and stroke attributes based on inkStyle
    let fillAttr = textColor;
    let strokeAttr = "none";
    let strokeWidthAttr = "0";

    if (inkStyle === "graywash") {
      fillAttr = "url(#graywashGradPreview)";
    } else if (inkStyle === "fineline") {
      fillAttr = "none";
      strokeAttr = textColor;
      strokeWidthAttr = "1.5";
    } else if (inkStyle === "bold") {
      fillAttr = textColor;
      strokeAttr = textColor;
      strokeWidthAttr = "3.5";
    }

    // Rotations specific to placement in anatomy simulator
    let placementRotate = tiltAngle;
    if (isAnatomy && currentPlacement === "forearm") {
      placementRotate = -90 + tiltAngle;
    }

    const textStyle: React.CSSProperties = {};
    if (isAnatomy && currentPlacement === "ribs") {
      textStyle.writingMode = "vertical-rl";
      textStyle.textOrientation = "mixed";
    }

    const filterStyle = inkBlur > 0 ? { filter: `blur(${inkBlur}px)` } : {};

    return (
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full transition-all duration-300 max-h-full"
        style={{
          transform: isMirrored ? "scaleX(-1)" : "none",
          ...filterStyle
        }}
      >
        <defs>
          <linearGradient id="graywashGradPreview" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={textColor} />
            <stop offset="100%" stopColor={textColor} stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Group for positioning and tilting */}
        <g transform={`rotate(${placementRotate} 400 200)`}>
          {/* Base path for the text to follow */}
          <path id={`tattooCurvePathPreview-${currentPlacement}`} d={pathD} fill="none" stroke="transparent" />

          {/* Text following path */}
          <text
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily={selectedFont.fontFamily}
            fontSize={`${finalFontSize}px`}
            fontStyle={selectedFont.fontStyle || "normal"}
            fontWeight={selectedFont.fontWeight || "normal"}
            letterSpacing={trackingValue}
            opacity={inkOpacity}
            fill={fillAttr}
            stroke={strokeAttr}
            strokeWidth={strokeWidthAttr}
            style={textStyle}
          >
            {isAnatomy && currentPlacement === "ribs" ? (
              <tspan x="400" y="200">
                {finalDecoratedText || "Sua Tatuagem"}
              </tspan>
            ) : (
              <textPath href={`#tattooCurvePathPreview-${currentPlacement}`} startOffset="50%">
                {finalDecoratedText || "Sua Tatuagem"}
              </textPath>
            )}
          </text>
        </g>
      </svg>
    );
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Editorial Header */}
      <div className="text-center md:text-left space-y-3.5 border-b border-slate-200/65 pb-8 relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-full pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-100 bg-amber-50/50 text-[10px] text-amber-800 font-bold tracking-widest uppercase font-mono">
          <PenTool className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
          <span>Estúdio de Caligrafia &amp; Arte Corporal Oficial</span>
        </div>
        <h2 className="font-sans font-black text-3xl md:text-4xl lg:text-5xl text-[#0F172A] tracking-tight leading-tight uppercase">
          Letras para <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-indigo-600">Tatuagem</span> &amp; Caligrafia
        </h2>
        <p className="text-xs md:text-sm text-slate-500 max-w-3xl leading-relaxed font-semibold font-sans">
          Planeje sua próxima tatuagem escrita com perfeição estética no maior portal de fontes e tipografias do Brasil! 
          Aqui você pode testar, customizar e gerar decalques finos de caligrafia cursiva elegante, letras góticas ancestrais, 
          letras chicanas tradicionais ou minimalistas em tempo real, além de simular a aplicação no corpo e baixar em vetor de alta definição (SVG).
        </p>
      </div>

      {/* Popular Phrases Quick Click row */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4.5 space-y-2.5 shadow-[0_4px_20px_rgb(0,0,0,0.01)]">
        <span className="text-[10px] font-extrabold text-[#0F172A] uppercase tracking-widest font-mono block">
          💡 Clique para Testar Frases Populares de Tatuagem:
        </span>
        <div className="flex flex-wrap gap-2">
          {popularPhrases.map((phrase) => (
            <button
              key={phrase.text}
              onClick={() => {
                setInputText(phrase.text);
                onNotify(`Frase alterada para "${phrase.text}"!`);
              }}
              className="px-3 py-1.5 bg-slate-50 hover:bg-amber-500/10 border border-slate-200 hover:border-amber-400 text-slate-700 hover:text-amber-950 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              {phrase.label}
            </button>
          ))}
        </div>
      </div>

      {/* Control Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Settings column */}
        <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-3xl p-6 md:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between min-h-[580px]">
          
          <div className="space-y-5">
            {/* Tabbed Navigation inside Sidebar for dense control flow */}
            <div className="flex border-b border-slate-100 pb-2 mb-4 gap-1">
              {[
                { id: "text", label: "1. Texto & Fontes" },
                { id: "style", label: "2. Estilo & Curva" },
                { id: "decal", label: "3. Pele & Decal" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSidebarTab(tab.id as any)}
                  className={`flex-1 pb-2 text-center text-xs font-bold transition-all border-b-2 cursor-pointer ${
                    sidebarTab === tab.id
                      ? "border-amber-500 text-amber-600 font-extrabold"
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: TEXT AND FONTS */}
            {sidebarTab === "text" && (
              <div className="space-y-4 animate-fade-in">
                {/* User Input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-[#0F172A] uppercase tracking-widest font-mono block">
                    Sua Frase ou Nome:
                  </label>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    maxLength={40}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 py-2.5 text-[#0F172A] text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-600 focus:bg-white transition-all font-sans font-extrabold"
                  />
                </div>

                {/* Decorative Ornaments Selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-[#0F172A] uppercase tracking-widest font-mono block">
                    Ornamentos e Enfeites:
                  </label>
                  <div className="grid grid-cols-2 gap-1">
                    {decorations.map((dec, idx) => (
                      <button
                        key={dec.name}
                        onClick={() => {
                          setSelectedDecoration(idx);
                          onNotify(`Enfeite "${dec.name}" aplicado!`);
                        }}
                        className={`px-2.5 py-2 border rounded-xl text-left text-xs font-bold transition-all truncate cursor-pointer ${
                          selectedDecoration === idx
                            ? "bg-amber-50/60 border-amber-500 text-amber-900"
                            : "bg-slate-50/50 border-slate-200 hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        {dec.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Typography Selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-[#0F172A] uppercase tracking-widest font-mono block">
                    Escolha o Estilo de Letra:
                  </label>
                  <div className="grid grid-cols-1 gap-1 max-h-52 overflow-y-auto pr-1 scrollbar-thin">
                    {TATTOO_FONTS.map((font) => (
                      <button
                        key={font.id}
                        onClick={() => setSelectedFont(font)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs transition-all duration-300 border cursor-pointer ${
                          selectedFont.id === font.id
                            ? "border-amber-500 bg-amber-50/40 text-amber-950 font-bold shadow-xs"
                            : "border-slate-100 hover:border-slate-300 text-slate-600 bg-slate-50/50 hover:bg-white"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold">{font.name}</span>
                          <span className={`text-[8px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full ${selectedFont.id === font.id ? "bg-amber-500 text-white font-bold" : "bg-slate-100 text-slate-400"}`}>
                            {font.category}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: INK STYLE & CURVATURE */}
            {sidebarTab === "style" && (
              <div className="space-y-4 animate-fade-in">
                {/* Ink Style Selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-[#0F172A] uppercase tracking-widest font-mono block">
                    Tipo e Estilo de Tinta:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: "solid", name: "Solid Ink Black 🖤", desc: "Tinta sólida de alto contraste" },
                      { id: "graywash", name: "Graywash Grad 🔘", desc: "Sombreado clássico degradê" },
                      { id: "fineline", name: "Fine-Line 🖊️", desc: "Contorno fino decalque" },
                      { id: "bold", name: "Bold Outline ✒️", desc: "Bordas reforçadas de impacto" }
                    ].map((style) => (
                      <button
                        key={style.id}
                        onClick={() => {
                          setInkStyle(style.id as any);
                          onNotify(`Estilo de tinta alterado para ${style.name}!`);
                        }}
                        className={`p-2 border rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between h-14 ${
                          inkStyle === style.id
                            ? "bg-amber-50/60 border-amber-500 text-amber-900"
                            : "bg-slate-50/50 border-slate-200 hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        <span className="text-xs font-bold leading-tight">{style.name}</span>
                        <span className="text-[8.5px] text-slate-400 font-medium truncate w-full leading-none">{style.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text bending/curvature slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-[#0F172A] font-mono uppercase tracking-widest">
                    <span className="font-extrabold">Curvatura do Texto (Arco):</span>
                    <span className="font-black text-amber-600">
                      {curvature === 0 ? "Reto" : curvature > 0 ? `Sorrindo (${curvature})` : `Arco (${curvature})`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-80"
                    max="80"
                    value={curvature}
                    onChange={(e) => setCurvature(parseInt(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <span className="text-[8.5px] font-semibold text-slate-400 block leading-tight">
                    Curva a escrita ao longo de um arco invisível, ideal para ajustar a clavículas ou peito.
                  </span>
                </div>

                {/* Font Size Adjust */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-[#0F172A] font-mono uppercase tracking-widest">
                    <span className="font-extrabold">Escala da Arte:</span>
                    <span className="font-black text-amber-600">{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="72"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                {/* Letter Spacing (Tracking) */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-[#0F172A] uppercase tracking-widest font-mono block">
                    Espaçamento entre Letras (Tracking):
                  </label>
                  <div className="flex gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
                    {[
                      { id: "tracking-tighter", label: "Estrito" },
                      { id: "tracking-tight", label: "Fino" },
                      { id: "tracking-normal", label: "Padrão" },
                      { id: "tracking-wide", label: "Largo" },
                      { id: "tracking-widest", label: "Longo" }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setLetterSpacing(item.id)}
                        className={`flex-1 text-[9px] font-extrabold py-1.5 rounded-lg transition-all text-center cursor-pointer ${
                          letterSpacing === item.id
                            ? "bg-amber-500 text-white font-bold shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Angle / Tilt Adjuster */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-[#0F172A] font-mono uppercase tracking-widest">
                    <span className="font-extrabold">Angulação da Escrita:</span>
                    <span className="font-black text-amber-600">{tiltAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    value={tiltAngle}
                    onChange={(e) => setTiltAngle(parseInt(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: CANVAS & DECALS */}
            {sidebarTab === "decal" && (
              <div className="space-y-4 animate-fade-in">
                {/* Mirror Mode (stencil decal) Toggle */}
                <div className="space-y-1.5 bg-amber-500/5 border border-amber-500/20 rounded-2xl p-3 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <FlipHorizontal className="w-4 h-4 text-amber-600" />
                      <span className="text-[10px] font-extrabold text-amber-950 uppercase tracking-wider font-mono">
                        Modo Espelho (Decalque):
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setIsMirrored(!isMirrored);
                        onNotify(!isMirrored ? "Modo espelho ativado para decalque! 🪞" : "Modo espelho desativado!");
                      }}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isMirrored ? "bg-amber-500" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          isMirrored ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-[8.5px] text-slate-500 font-semibold leading-relaxed mt-1">
                    Ative para inverter o desenho horizontalmente. Ideal para imprimir o stencil decalque que será colado diretamente sobre a pele do cliente.
                  </p>
                </div>

                {/* Background Canvas Selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-[#0F172A] block font-mono uppercase tracking-widest">
                    Cor do Fundo e Pele:
                  </label>
                  <div className="flex flex-wrap gap-1">
                    {backgroundPresets.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => {
                          setBgColor(preset.value);
                          setTextColor(preset.text);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all duration-300 cursor-pointer ${
                          bgColor === preset.value
                            ? "border-amber-500 bg-amber-50/50 text-amber-950 font-extrabold"
                            : "border-slate-200/80 hover:bg-slate-50 text-slate-600 bg-white"
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ink Opacity */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-[#0F172A] font-mono uppercase tracking-widest">
                    <span className="font-extrabold">Opacidade da Tinta:</span>
                    <span className="font-black text-amber-600">{Math.round(inkOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="1.0"
                    step="0.05"
                    value={inkOpacity}
                    onChange={(e) => setInkOpacity(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                {/* Organic Ink Blur / Aging Simulation */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-[#0F172A] font-mono uppercase tracking-widest">
                    <span className="font-extrabold">Cicatrização / Sombra (Blur):</span>
                    <span className="font-black text-amber-600">{inkBlur}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2.5"
                    step="0.1"
                    value={inkBlur}
                    onChange={(e) => setInkBlur(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <span className="text-[8.5px] font-semibold text-slate-400 block leading-tight">
                    Simula o espalhamento orgânico natural da tinta sob a derme após cicatrizada.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Save Draft Action */}
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={handleSaveSketch}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-2xl transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <Plus className="w-4 h-4" />
              Salvar Esboço na Galeria
            </button>
          </div>
        </div>

        {/* Right Preview column & Live Body Placement Simulator */}
        <div className="lg:col-span-2 flex flex-col justify-between bg-slate-950 rounded-3xl border border-slate-900 overflow-hidden shadow-xl min-h-[520px]">
          
          {/* Canvas Header & Simulator tabs */}
          <div className="bg-slate-900 px-5 py-3.5 border-b border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-mono font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span>Estúdio Virtual de Caligrafia</span>
            </div>
            
            {/* Visualizer Placement select */}
            <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {[
                { id: "canvas", label: "Tela 2D 🖥️" },
                { id: "forearm", label: "Antebraço 💪" },
                { id: "collarbone", label: "Clavícula 🦴" },
                { id: "wrist", label: "Pulso 🖐️" },
                { id: "ribs", label: "Costelas ⚡" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setPlacement(item.id as any);
                    onNotify(`Simulação corporal: ${item.label}`);
                  }}
                  className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg transition-all cursor-pointer ${
                    placement === item.id
                      ? "bg-amber-500 text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive drawing area */}
          <div className={`flex-1 flex items-center justify-center p-6 md:p-10 min-h-[380px] transition-all duration-500 relative ${bgColor}`}>
            {/* Subtle organic skin-pores texture/grain overlay for realism */}
            {(bgColor.includes("eed1bd") || bgColor.includes("d39e82") || bgColor.includes("f4ebd0") || bgColor.includes("161210")) && (
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: `radial-gradient(rgba(0,0,0,0.15) 1px, transparent 0), radial-gradient(rgba(255,255,255,0.1) 1px, transparent 0)`,
                  backgroundSize: "4px 4px",
                  backgroundPosition: "0 0, 2px 2px"
                }}
              />
            )}

            {placement === "canvas" ? (
              <div className="w-full max-w-2xl aspect-[800/400] flex items-center justify-center p-2 relative">
                {renderTattooSVG(false, "canvas")}
              </div>
            ) : (
              /* Virtual Anatomy simulator */
              <div className="w-full max-w-md relative flex flex-col items-center justify-center h-full">
                {/* Background human placement frame graphic */}
                <div className="absolute inset-0 border border-amber-500/10 rounded-2xl flex items-center justify-center bg-radial from-slate-950/20 to-transparent pointer-events-none" />
                
                {placement === "forearm" && (
                  <div className="w-48 h-72 bg-[#eed1bd]/15 border-x border-dashed border-[#d39e82]/40 rounded-full flex flex-col justify-center items-center p-4 relative overflow-hidden">
                    <span className="text-[9px] font-mono tracking-widest text-slate-500/70 absolute top-4 uppercase">Simulação do Antebraço</span>
                    <div className="w-full h-1 bg-[#1a120b]/5 my-auto" />
                    <div className="w-full h-full absolute inset-0 flex items-center justify-center">
                      {renderTattooSVG(true, "forearm")}
                    </div>
                    <div className="w-full h-1 bg-[#1a120b]/5 my-auto" />
                  </div>
                )}

                {placement === "collarbone" && (
                  <div className="w-full h-40 bg-[#eed1bd]/10 border-b-2 border-dashed border-[#d39e82]/30 rounded-3xl flex flex-col justify-center items-center p-4 relative overflow-hidden">
                    <span className="text-[9px] font-mono tracking-widest text-slate-500/70 absolute top-4 uppercase">Aplicação na Clavícula</span>
                    {/* Simulated collarbone lines */}
                    <div className="w-3/4 flex justify-between px-4 absolute top-12 opacity-30">
                      <div className="w-24 h-1.5 bg-[#d39e82] rounded-full transform -rotate-3" />
                      <div className="w-24 h-1.5 bg-[#d39e82] rounded-full transform rotate-3" />
                    </div>
                    <div className="w-full h-full absolute inset-0 mt-4 flex items-center justify-center">
                      {renderTattooSVG(true, "collarbone")}
                    </div>
                  </div>
                )}

                {placement === "wrist" && (
                  <div className="w-36 h-60 bg-[#eed1bd]/15 border-2 border-dashed border-[#d39e82]/40 rounded-3xl flex flex-col justify-center items-center p-4 relative overflow-hidden">
                    <span className="text-[9px] font-mono tracking-widest text-slate-500/70 absolute top-4 uppercase">Região do Pulso</span>
                    <div className="w-full h-full absolute inset-0 flex items-center justify-center">
                      {renderTattooSVG(true, "wrist")}
                    </div>
                    {/* Simulated hand line */}
                    <div className="w-20 h-0.5 bg-[#d39e82]/40 absolute bottom-12" />
                  </div>
                )}

                {placement === "ribs" && (
                  <div className="w-56 h-72 bg-[#eed1bd]/12 border-l border-dashed border-[#d39e82]/30 rounded-3xl flex flex-col justify-center p-8 relative overflow-hidden">
                    <span className="text-[9px] font-mono tracking-widest text-slate-500/70 absolute top-4 left-4 uppercase">Região das Costelas</span>
                    {/* Rib cage line guides */}
                    <div className="space-y-6 opacity-20 absolute left-4 w-12">
                      <div className="h-0.5 bg-[#d39e82] w-full" />
                      <div className="h-0.5 bg-[#d39e82] w-full" />
                      <div className="h-0.5 bg-[#d39e82] w-full" />
                    </div>
                    <div className="w-full h-full absolute inset-0 flex items-center justify-center">
                      {renderTattooSVG(true, "ribs")}
                    </div>
                  </div>
                )}
                
                <span className="text-[9px] text-slate-400 mt-4 bg-slate-900 border border-slate-800 rounded px-2 py-0.5 z-10">
                  Arraste os sliders para alterar escala, angulação, curvatura e cicatrização da simulação
                </span>
              </div>
            )}
          </div>

          {/* Description of font style */}
          <div className="bg-slate-900 p-5 border-t border-slate-800/85 flex flex-col md:flex-row md:items-center justify-between gap-5 text-xs">
            <div className="text-slate-400 font-sans max-w-md">
              <strong className="text-amber-500 uppercase tracking-wide text-[10px] font-mono block mb-1">
                Fonte selecionada: {selectedFont.name} ({selectedFont.category})
              </strong>{" "}
              <span className="text-slate-300 leading-relaxed font-medium">{selectedFont.description}</span>
            </div>
            <div className="flex gap-2.5 shrink-0">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all duration-300 text-xs font-bold cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-amber-500" />}
                Copiar Texto
              </button>
              <button
                onClick={handleDownloadSVG}
                className="flex items-center gap-1.5 px-4.5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl transition-all duration-300 text-xs cursor-pointer shadow-lg shadow-amber-500/5"
              >
                <Download className="w-3.5 h-3.5" />
                Baixar SVG
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Drafts / Gallery shelf (Localstorage) */}
      {savedSketches.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <h4 className="text-xs font-bold font-mono uppercase text-slate-200 tracking-wider">
                Sua Galeria Local de Esboços ({savedSketches.length}/8)
              </h4>
            </div>
            <span className="text-[9px] text-slate-500 font-semibold uppercase">
              Salvo automaticamente no navegador
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {savedSketches.map((sketch) => {
              const font = TATTOO_FONTS.find(f => f.id === sketch.fontId) || TATTOO_FONTS[0];
              return (
                <div
                  key={sketch.id}
                  onClick={() => handleLoadSketch(sketch)}
                  className="bg-slate-950 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-3.5 cursor-pointer group transition-all relative flex flex-col justify-between space-y-4 shadow-sm"
                >
                  <button
                    onClick={(e) => handleDeleteSketch(sketch.id, e)}
                    className="absolute top-2.5 right-2.5 p-1 text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                    title="Excluir esboço"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="space-y-1">
                    <span className="text-[8.5px] font-mono tracking-wider text-slate-500 uppercase block">
                      {font.name}
                    </span>
                    <p
                      style={{
                        fontFamily: font.fontFamily,
                        color: sketch.textColor ?? "#f5ebe0",
                        opacity: sketch.inkOpacity ?? 0.95,
                        filter: sketch.inkBlur > 0 ? `blur(${sketch.inkBlur * 0.5}px)` : undefined,
                        transform: `rotate(${(sketch.tiltAngle ?? 0) * 0.4}deg)`
                      }}
                      className="text-xs font-semibold truncate select-none leading-none pt-1"
                    >
                      {sketch.text}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[8px] text-slate-500 border-t border-slate-800/50 pt-2 font-mono">
                    <span>Tam: {sketch.fontSize}px</span>
                    <span className="text-amber-500 font-bold group-hover:underline">Carregar</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Font Category Breakdown Tables */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-100 bg-indigo-50/50 text-[9px] text-[#4F46E5] font-bold tracking-widest uppercase">
            Guia de Letras para Tatuagem
          </div>
          <h4 className="font-sans font-black text-slate-950 text-base uppercase tracking-tight flex items-center gap-2">
            <Info className="w-5 h-5 text-indigo-500" />
            Classificação das Letras para Tatuagem Escrita e Caligrafia Corporal
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            Cada estilo de caligrafia corporal transmite uma sensação diferente. Conheça as principais famílias de <strong>letras para tatuagem</strong> 
            e descubra onde cada tipo de <strong>letras para tatuagem</strong> costuma ficar melhor localizado no seu corpo:
          </p>
        </div>

        <div className="overflow-x-auto border border-slate-100 rounded-2xl">
          <table className="w-full border-collapse text-left text-xs text-slate-500 font-sans">
            <thead className="bg-slate-50 text-slate-800 font-bold uppercase text-[9.5px] border-b border-slate-100 font-mono tracking-wider">
              <tr>
                <th className="px-5 py-3">Estilo de Letras para Tatuagem</th>
                <th className="px-5 py-3">Características Visuais</th>
                <th className="px-5 py-3">Locais Mais Recomendados</th>
                <th className="px-5 py-3">Compatibilidade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr>
                <td className="px-5 py-3.5 text-slate-900 font-black">1. Letras para Tatuagem Cursivas Finas</td>
                <td className="px-5 py-3.5">Letras leves, contínuas e extremamente elegantes. Oferecem fluidez e delicadeza.</td>
                <td className="px-5 py-3.5">Costelas, clavícula, pulso e antebraço interno.</td>
                <td className="px-5 py-3.5"><span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-[9px] font-bold">Excelente</span></td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 text-slate-900 font-black">2. Letras para Tatuagem Góticas Medievais</td>
                <td className="px-5 py-3.5">Letras angulares, densas com detalhes ornamentais agressivos e medievais.</td>
                <td className="px-5 py-3.5">Peito, costas completas, panturrilha e pescoço.</td>
                <td className="px-5 py-3.5"><span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-[9px] font-bold">Excelente</span></td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 text-slate-900 font-black">3. Letras para Tatuagem Chicanas</td>
                <td className="px-5 py-3.5">Curvas dramáticas, laços ornamentais longos inspirados na street-art da Califórnia.</td>
                <td className="px-5 py-3.5">Abdomem, ombros e antebraço completo.</td>
                <td className="px-5 py-3.5"><span className="bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full text-[9px] font-bold">Média</span></td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 text-slate-900 font-black">4. Letras para Tatuagem Minimalistas Serif</td>
                <td className="px-5 py-3.5">Letras clássicas limpas com serifa fina, remetendo a livros de poesia e jornais antigos.</td>
                <td className="px-5 py-3.5">Atrás da orelha, tornozelo e dedos da mão.</td>
                <td className="px-5 py-3.5"><span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-[9px] font-bold">Excelente</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Professional Tattooist Advice (Dicas de Estúdio) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-amber-50/20 border border-amber-200/50 rounded-3xl p-6 md:p-8 space-y-4">
          <h4 className="font-sans font-black text-amber-950 text-sm uppercase tracking-wider flex items-center gap-2">
            ✒️ Dicas do Especialista: Tamanho Ideal de Letras para Tatuagem
          </h4>
          <div className="text-xs text-slate-600 space-y-3 font-sans leading-relaxed font-semibold">
            <p>
              Muitas pessoas cometem o erro de escolher <strong>letras para tatuagem</strong> extremamente pequenas para frases longas. 
              Ao longo dos anos, as células da pele se renovam e os pigmentos de tinta preta tendem a se expandir levemente 
              sob a epiderme (conhecido como efeito de espalhamento).
            </p>
            <p>
              <strong>Recomendação de ouro:</strong> Garanta que as <strong>letras para tatuagem</strong> tenham pelo menos 0.5 cm a 1 cm de altura, 
              e mantenha um espaçamento visível entre caracteres. Nosso slider de <strong>espaçamento de letras para tatuagem</strong> acima ajuda 
              você a planejar essa folga ideal de forma científica.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 md:p-8 space-y-4">
          <h4 className="font-sans font-black text-slate-950 text-sm uppercase tracking-wider flex items-center gap-2">
            🛡️ Direitos Autorais e Uso Seguro de Letras para Tatuagem
          </h4>
          <div className="text-xs text-slate-600 space-y-3 font-sans leading-relaxed font-semibold">
            <p>
              Ao levar um desenho impresso ao seu tatuador, preste sempre atenção na licença do arquivo da tipografia. 
              Todas as fontes de <strong>letras para tatuagem</strong> carregadas no gerador de <strong>letras para tatuagem</strong> da <strong>LetraDiferentes</strong> 🛡️
              são de código aberto ou licenciadas pelo Google Fonts, garantindo que você e seu estúdio usem a caligrafia de forma 
              100% legal e segura.
            </p>
            <p>
              Utilizando o botão <strong>Baixar SVG</strong>, você baixa o design do seu nome ou frase composto com as <strong>letras para tatuagem</strong> ideais já transformadas em curvas de vetor. 
              O tatuador poderá abrir o arquivo no Illustrator, CorelDraw ou Photoshop e ajustar milimetricamente no tamanho ideal do papel decalque de <strong>letras para tatuagem</strong> 
              sem perder nada de qualidade ou pixelar.
            </p>
          </div>
        </div>
      </div>

      {/* SEO & Educational Guide Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
        <h3 className="font-sans font-black text-[#0F172A] text-sm uppercase tracking-wider flex items-center gap-1.5">
          <HelpCircle className="w-4.5 h-4.5 text-[#4F46E5]" />
          Perguntas Frequentes sobre Letras para Tatuagem (FAQ)
        </h3>
        
        <div className="divide-y divide-slate-100 text-xs font-sans leading-relaxed text-slate-500 font-semibold space-y-3">
          <div className="pt-3 space-y-1">
            <span className="text-[#0F172A] font-black block">Como transferir as letras para tatuagem do nosso gerador de letras para tatuagem diretamente para a pele?</span>
            <p>
              O método mais simples e preciso é usar o nosso gerador de <strong>letras para tatuagem</strong>, digitar sua frase, 
              escolher a tipografia que mais combina e clicar em <strong>Baixar SVG</strong>. Envie este arquivo de vetor ao seu 
              tatuador. Ele irá imprimir as suas <strong>letras para tatuagem</strong> em um papel hectográfico especial, aplicar o gel transfer na sua pele e colar o papel, 
              deixando o traçado exato de suas <strong>letras para tatuagem</strong> pronto para seguir com a agulha de tinta no estúdio.
            </p>
          </div>

          <div className="pt-3 space-y-1">
            <span className="text-[#0F172A] font-black block">Como escolher as melhores letras para tatuagem masculina e letras para tatuagem feminina?</span>
            <p>
              Não existem regras absolutas, mas quem procura por <strong>letras para tatuagem</strong> masculina costuma optar bastante por estilos fortes de <strong>letras para tatuagem</strong> 
              como o Gótico Imperial e as <strong>letras para tatuagem</strong> cursivas Chicanas mais robustas. Já quem procura por <strong>letras para tatuagem</strong> feminina tem grande preferência por fontes de 
              <strong> letras para tatuagem</strong> cursivas finas, delicadas e micro-letras com serifa poética clássica.
            </p>
          </div>

          <div className="pt-3 space-y-1">
            <span className="text-[#0F172A] font-black block">Posso testar outras cores além de preto para visualizar as letras para tatuagem?</span>
            <p>
              Sim! No painel de controle lateral você pode alterar as cores de visualização do canvas de pele para testar as <strong>letras para tatuagem</strong> em peles claras, 
              morenas e até fundos escuros de couro para melhor visibilidade do contraste da caligrafia de suas <strong>letras para tatuagem</strong>. O arquivo de vetor SVG gerado com suas <strong>letras para tatuagem</strong> 
              pode ser alterado para qualquer cor de tinta do estúdio, inclusive branca, azul ou vermelha.
            </p>
          </div>
        </div>
      </div>

      {/* Manual Completo de Letras para Tatuagem */}
      <div className="bg-amber-50/10 rounded-3xl border border-amber-200/40 p-6 md:p-8 space-y-6 text-xs text-slate-600 font-sans leading-relaxed font-semibold">
        <h3 className="font-sans font-black text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
          <PenTool className="w-4 h-4 text-amber-500" />
          Manual Completo e Dicas de Estudo sobre Letras para Tatuagem
        </h3>
        <p>
          Se você está planejando sua próxima caligrafia na pele, as <strong>letras para tatuagem</strong> são o ponto de partida ideal para criar um design expressivo, legível e harmonioso. Nosso gerador de <strong>letras para tatuagem</strong> online ajuda você a visualizar centenas de combinações tipográficas diferentes de forma rápida, interativa e totalmente gratuita.
        </p>
        <p>
          Muitas pessoas passam meses escolhendo a frase ideal, mas se esquecem de que as <strong>letras para tatuagem</strong> são as reais responsáveis por dar o tom emocional e artístico à mensagem. Um estilo de <strong>letras para tatuagem</strong> cursivo transmite sentimentos de delicadeza, amor, fluidez e proximidade, enquanto um estilo de <strong>letras para tatuagem</strong> gótico, medieval ou em caixa alta traz força, impacto, ancestralidade e tradicionalismo marcantes.
        </p>
        <p>
          Ao escolher suas <strong>letras para tatuagem</strong> masculinas ou <strong>letras para tatuagem</strong> femininas, nosso estúdio virtual oferece recursos altamente profissionais, como o ajuste fino de curvatura em arco e a rotação/angulação da escrita. Esses controles garantem que as <strong>letras para tatuagem</strong> selecionadas sigam as linhas anatômicas naturais do seu corpo, facilitando muito o trabalho do tatuador profissional na hora de confeccionar e aplicar o decalque impresso com as <strong>letras para tatuagem</strong>.
        </p>
        <p>
          Outro aspecto essencial é planejar a cicatrização da escrita na pele a médio e longo prazo. Com o nosso slider de envelhecimento e cicatrização (blur), você simula a expansão natural das <strong>letras para tatuagem</strong> sob a epiderme com o passar dos anos, escolhendo o espaçamento (tracking) correto entre as <strong>letras para tatuagem</strong> para que os traços da caligrafia não borrem nem fiquem ilegíveis no futuro. O espaçamento perfeito para <strong>letras para tatuagem</strong> varia conforme o tamanho da arte e o local do corpo, sendo que áreas com pele mais fina exigem <strong>letras para tatuagem</strong> mais legíveis e separadas.
        </p>
        <p>
          Por fim, quando estiver totalmente satisfeito com as <strong>letras para tatuagem</strong> geradas no painel, você pode baixar a arte finalizada diretamente em formato SVG de alta definição ou copiar o texto estilizado. Usar arquivos vetoriais para suas <strong>letras para tatuagem</strong> garante que a impressão em papel stencil mantenha a precisão milimétrica de todas as linhas e curvas das <strong>letras para tatuagem</strong> escolhidas no nosso site, proporcionando o melhor resultado final na sua pele.
        </p>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/60 space-y-2 mt-4">
          <span className="font-mono text-[9px] uppercase tracking-widest text-amber-600 block font-black">
            Termos de busca de letras para tatuagem populares associados:
          </span>
          <p className="text-[10px] text-slate-400 font-medium">
            letras para tatuagem feminina, letras para tatuagem masculina, letras para tatuagem cursiva, fontes de letras para tatuagem, gerador de letras para tatuagem, caligrafia para tatuagem, letras para tatuagem escrita, letras para tatuagem de nomes, letras para tatuagem gótica, moldes de letras para tatuagem, letras para tatuagem delicada, ideias de letras para tatuagem.
          </p>
        </div>
      </div>
    </div>
  );
}
