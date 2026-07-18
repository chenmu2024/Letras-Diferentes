import React, { useState, useEffect, useRef } from "react";
import { 
  Download, 
  Sparkles, 
  Palette, 
  Info, 
  Plus, 
  Trash2, 
  Heart, 
  RotateCcw, 
  Sliders, 
  Layers, 
  Copy, 
  Check, 
  BookOpen, 
  HelpCircle, 
  ShieldAlert,
  ArrowRight,
  Sparkle,
  Crown,
  Brush,
  Eraser,
  Type
} from "lucide-react";

interface LetrasGrafiteProps {
  onNotify: (message: string) => void;
}

interface GraffitiStyle {
  id: "bubble" | "wildstyle" | "handstyle" | "acid";
  name: string;
  fontFamily: string;
  description: string;
  defaultLetterSpacing: string;
  defaultCase: "upper" | "lower" | "mixed";
  defaultDrips: boolean;
  prefix: string;
  suffix: string;
}

export default function LetrasGrafite({ onNotify }: LetrasGrafiteProps) {
  // Input Tag state
  const [tagText, setTagText] = useState("VANDAL");
  const [selectedStyle, setSelectedStyle] = useState<"bubble" | "wildstyle" | "handstyle" | "acid">("bubble");
  
  // Custom interactive paint controls
  const [primaryColor, setPrimaryColor] = useState("#fbbf24"); // Inner fill color
  const [strokeColor, setStrokeColor] = useState("#dc2626"); // Outer outline color
  const [strokeWidth, setStrokeWidth] = useState<number>(8); // Thickness of outline
  const [fontSize, setFontSize] = useState<number>(72); // Main text scale
  const [slantAngle, setSlantAngle] = useState<number>(10); // Skew X angle (-25 to 25)
  const [showShadow, setShowShadow] = useState(true);
  const [shadowOffset, setShadowOffset] = useState<number>(10); // 3D projection offset
  const [showDrips, setShowDrips] = useState(true);
  const [dripLength, setDripLength] = useState<number>(35); // Drips height
  const [oversprayRadius, setOversprayRadius] = useState<number>(90); // Spray mist radius (0 to 150)
  const [oversprayOpacity, setOversprayOpacity] = useState<number>(0.6); // Spray mist opacity

  // Wall background preset
  const [wallPreset, setWallPreset] = useState<"brick" | "concrete" | "subway" | "garage" | "neon">("brick");
  
  // New Creative Controls State
  const [secondaryColor, setSecondaryColor] = useState("#ec4899"); // Secondary fill color (for gradient)
  const [fillType, setFillType] = useState<"solid" | "gradient" | "chrome">("gradient");
  const [letterSpacing, setLetterSpacing] = useState<number>(2); // letter spacing in pixels (-8 to 20)
  const [letterBounce, setLetterBounce] = useState<number>(6); // staggered height bounce
  const [letterRotation, setLetterRotation] = useState<number>(4); // alternating rotation slant
  const [sidebarTab, setSidebarTab] = useState<"style" | "effects" | "decals">("style");
  
  // Custom Street-Art Stickers / Decals
  const [hasCrown, setHasCrown] = useState(false);
  const [hasHalo, setHasHalo] = useState(false);
  const [hasUnderline, setHasUnderline] = useState(true);
  const [hasStars, setHasStars] = useState(false);

  // Manual Spray Painting Canvas Mode State
  const [canvasDrawingMode, setCanvasDrawingMode] = useState(false);
  const [brushColor, setBrushColor] = useState("#fbbf24");
  const [brushWidth, setBrushWidth] = useState<number>(20);
  const [brushOpacity, setBrushOpacity] = useState<number>(0.6);

  // Canvas Refs & states
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawnAnything, setHasDrawnAnything] = useState(false);

  // Sound play throttling refs and audio contexts
  const lastSoundPlayRef = useRef<number>(0);

  // Play synthetic white-noise spray hiss sound using browser Web Audio API
  const playSpraySound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const bufferSize = ctx.sampleRate * 0.15; // Short spray burst (150ms)
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      // Fill the buffer with random white noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      
      // Pass-band filter to replicate the high-frequency hiss of a pressure nozzle
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 2100; // hiss tone
      filter.Q.value = 1.1;
      
      const gainNode = ctx.createGain();
      // Scale volume gently based on paint nozzle radius
      const targetVolume = 0.05 * (brushWidth / 25);
      gainNode.gain.setValueAtTime(targetVolume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
      
      source.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      source.start();
    } catch (e) {
      // Fail silently if browser frames block audio context
    }
  };

  const playThrottledSpraySound = () => {
    const now = Date.now();
    if (now - lastSoundPlayRef.current > 110) { // Every 110ms of drawing
      playSpraySound();
      lastSoundPlayRef.current = now;
    }
  };

  // Interactive A-Z catalog states
  const [catalogStyle, setCatalogStyle] = useState<"bubble" | "handstyle" | "acid" | "stencil">("bubble");
  const [selectedAlphabetLetter, setSelectedAlphabetLetter] = useState<string>("G");
  
  const [copied, setCopied] = useState(false);

  // Sync canvas size on mount and resize
  const syncCanvasSize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    
    // We only resize if dimensions changed to avoid clearing the canvas unnecessarily
    const prevW = canvas.width;
    const prevH = canvas.height;
    
    if (prevW !== rect.width || prevH !== rect.height) {
      // Save canvas content to redraw after resizing
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = prevW;
      tempCanvas.height = prevH;
      const tempCtx = tempCanvas.getContext("2d");
      if (tempCtx && prevW > 0 && prevH > 0) {
        tempCtx.drawImage(canvas, 0, 0);
      }
      
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      const ctx = canvas.getContext("2d");
      if (ctx && prevW > 0 && prevH > 0) {
        ctx.drawImage(tempCanvas, 0, 0, rect.width, rect.height);
      }
    }
  };

  useEffect(() => {
    syncCanvasSize();
    
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        syncCanvasSize();
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const getMousePos = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const drawSpray = (x: number, y: number, ctx: CanvasRenderingContext2D) => {
    const radius = brushWidth;
    const density = Math.round(radius * 1.5);
    ctx.fillStyle = brushColor;
    ctx.globalAlpha = brushOpacity;
    
    for (let i = 0; i < density; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 1.5) * radius; 
      const dotX = x + Math.cos(angle) * r;
      const dotY = y + Math.sin(angle) * r;
      
      const size = Math.random() * 2 + 0.5;
      ctx.fillRect(dotX, dotY, size, size);
    }
    
    // Play synthetic aerosol spray sound
    playThrottledSpraySound();
  };

  const handleStartDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasDrawingMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawnAnything(true);

    const pos = getMousePos(e, canvas);
    drawSpray(pos.x, pos.y, ctx);
  };

  const handleDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasDrawingMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getMousePos(e, canvas);
    drawSpray(pos.x, pos.y, ctx);
  };

  const handleStopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawnAnything(false);
    onNotify("Mural de desenho manual limpo! 🧹");
  };

  // Local drafted tags gallery (saved in localStorage)
  const [savedTags, setSavedTags] = useState<Array<{
    id: string;
    text: string;
    style: "bubble" | "wildstyle" | "handstyle" | "acid";
    primaryColor: string;
    strokeColor: string;
    strokeWidth: number;
    fontSize: number;
    slantAngle: number;
    showShadow: boolean;
    shadowOffset: number;
    showDrips: boolean;
    dripLength: number;
    oversprayRadius: number;
    oversprayOpacity: number;
    wallPreset: "brick" | "concrete" | "subway" | "garage" | "neon";
    createdAt: string;
  }>>(() => {
    try {
      const saved = localStorage.getItem("letras_grafite_saved_drafts_v3");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const graffitiStyles: GraffitiStyle[] = [
    {
      id: "bubble",
      name: "Bomba Bubble 🎈",
      fontFamily: "'Bangers', sans-serif",
      description: "Estilo Bombing clássico de letras em grafite! Letras infladas, arredondadas e volumosas com sensação de balão virtual.",
      defaultLetterSpacing: "tracking-wide",
      defaultCase: "upper",
      defaultDrips: true,
      prefix: "",
      suffix: ""
    },
    {
      id: "wildstyle",
      name: "Wildstyle Angular ⚡",
      fontFamily: "'Wallpoet', sans-serif",
      description: "Estilo de letras em grafite pontiagudo e futurista. Letras em grafite interligadas com ângulos agressivos e setas decorativas.",
      defaultLetterSpacing: "tracking-tighter",
      defaultCase: "upper",
      defaultDrips: false,
      prefix: "⇛ ",
      suffix: " ⇚"
    },
    {
      id: "handstyle",
      name: "Street Tag Handstyle 🖋️",
      fontFamily: "'Sedgwick Ave Display', cursive",
      description: "O handstyle de letras em grafite clássico dos canetões posca e bicos skinny cap. Visual de letras em grafite fluidas.",
      defaultLetterSpacing: "tracking-normal",
      defaultCase: "mixed",
      defaultDrips: true,
      prefix: "★ ",
      suffix: " ★"
    },
    {
      id: "acid",
      name: "Vandal Acid Melt 🧪",
      fontFamily: "'Creepster', system-ui",
      description: "Estilo derretido e líquido de letras em grafite psicodélico. Desenhe letras em grafite com visual de tinta escorrendo.",
      defaultLetterSpacing: "tracking-widest",
      defaultCase: "upper",
      defaultDrips: true,
      prefix: "☠ ",
      suffix: " ☠"
    }
  ];

  const activeStyleInfo = graffitiStyles.find(s => s.id === selectedStyle) || graffitiStyles[0];

  const colorPresets = [
    { primary: "#fbbf24", stroke: "#dc2626", name: "Hellfire 🔥" },
    { primary: "#22c55e", stroke: "#065f46", name: "Toxic Acid 🧪" },
    { primary: "#ec4899", stroke: "#310015", name: "Neon Pink 💖" },
    { primary: "#a855f7", stroke: "#1e1b4b", name: "Acid Purple 👾" },
    { primary: "#3b82f6", stroke: "#1e3a8a", name: "Deep Ocean 🚇" },
    { primary: "#f97316", stroke: "#292524", name: "Classic Orange 🧱" },
    { primary: "#06b6d4", stroke: "#155e75", name: "Cyan Mist 💨" },
    { primary: "#ffffff", stroke: "#171717", name: "Chrome Black ⛓️" }
  ];

  const wallPresetsList = [
    { id: "brick", name: "Tijolo Clássico 🧱" },
    { id: "concrete", name: "Muro Concreto 🪨" },
    { id: "subway", name: "Vagão de Metrô 🚇" },
    { id: "garage", name: "Portão de Garagem 🚪" },
    { id: "neon", name: "Midnight Neon 🖤" }
  ];

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Handler to filter input text based on style requirements
  const handleTextChange = (text: string) => {
    let clean = text;
    if (selectedStyle !== "handstyle") {
      clean = text.toUpperCase();
    }
    // Allow spaces and letters/numbers
    clean = clean.replace(/[^A-Za-z0-9\s]/g, "");
    setTagText(clean);
  };

  // Preset reset
  const handleReset = () => {
    setPrimaryColor("#fbbf24");
    setSecondaryColor("#ec4899");
    setFillType("gradient");
    setStrokeColor("#dc2626");
    setStrokeWidth(8);
    setFontSize(72);
    setSlantAngle(10);
    setShowShadow(true);
    setShadowOffset(10);
    setShowDrips(true);
    setDripLength(35);
    setOversprayRadius(90);
    setOversprayOpacity(0.6);
    setWallPreset("brick");
    setLetterSpacing(2);
    setLetterBounce(6);
    setLetterRotation(4);
    setHasCrown(false);
    setHasHalo(false);
    setHasUnderline(true);
    setHasStars(false);
    setCanvasDrawingMode(false);
    
    // Clear canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHasDrawnAnything(false);

    onNotify("Configurações do Estúdio reiniciadas para o padrão! 🎨");
  };

  // Generate complete final tag incorporating style-specific decorations
  const finalTagDecorated = `${activeStyleInfo.prefix}${tagText}${activeStyleInfo.suffix}`;

  // Copy plain text graffiti string
  const handleCopy = () => {
    navigator.clipboard.writeText(finalTagDecorated);
    setCopied(true);
    onNotify("Tag de Grafite copiada para a área de transferência! 🚀");
    setTimeout(() => setCopied(false), 2000);
  };

  // Local storage management: Save Tag Draft
  const handleSaveTag = () => {
    if (!tagText.trim()) {
      onNotify("Por favor, digite alguma frase ou apelido antes de salvar! ⚠️");
      return;
    }
    if (savedTags.length >= 8) {
      onNotify("Sua galeria local está cheia (máx 8 designs). Exclua algum design para liberar espaço! ⚠️");
      return;
    }
    const newTag = {
      id: Math.random().toString(36).substr(2, 9),
      text: tagText,
      style: selectedStyle,
      primaryColor,
      secondaryColor,
      fillType,
      strokeColor,
      strokeWidth,
      fontSize,
      slantAngle,
      showShadow,
      shadowOffset,
      showDrips,
      dripLength,
      oversprayRadius,
      oversprayOpacity,
      wallPreset,
      letterSpacing,
      letterBounce,
      letterRotation,
      hasCrown,
      hasHalo,
      hasUnderline,
      hasStars,
      createdAt: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newTag, ...savedTags];
    setSavedTags(updated as any);
    localStorage.setItem("letras_grafite_saved_drafts_v3", JSON.stringify(updated));
    onNotify(`Tag "${tagText}" salva com sucesso na sua galeria local! 💾`);
  };

  const handleLoadTag = (tag: any) => {
    setTagText(tag.text);
    setSelectedStyle(tag.style);
    setPrimaryColor(tag.primaryColor);
    setSecondaryColor(tag.secondaryColor ?? "#ec4899");
    setFillType(tag.fillType ?? "gradient");
    setStrokeColor(tag.strokeColor);
    setStrokeWidth(tag.strokeWidth ?? 8);
    setFontSize(tag.fontSize ?? 72);
    setSlantAngle(tag.slantAngle ?? 10);
    setShowShadow(tag.showShadow ?? true);
    setShadowOffset(tag.shadowOffset ?? 10);
    setShowDrips(tag.showDrips ?? true);
    setDripLength(tag.dripLength ?? 35);
    setOversprayRadius(tag.oversprayRadius ?? 90);
    setOversprayOpacity(tag.oversprayOpacity ?? 0.6);
    setWallPreset(tag.wallPreset ?? "brick");
    setLetterSpacing(tag.letterSpacing ?? 2);
    setLetterBounce(tag.letterBounce ?? 6);
    setLetterRotation(tag.letterRotation ?? 4);
    setHasCrown(tag.hasCrown ?? false);
    setHasHalo(tag.hasHalo ?? false);
    setHasUnderline(tag.hasUnderline ?? true);
    setHasStars(tag.hasStars ?? false);
    onNotify(`Tag "${tag.text}" carregada de volta para a tela de pintura! 🎨`);
  };

  const handleDeleteTag = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedTags.filter(t => t.id !== id);
    setSavedTags(updated);
    localStorage.setItem("letras_grafite_saved_drafts_v3", JSON.stringify(updated));
    onNotify("Design removido da galeria local. 🗑️");
  };

  // Render SVG alphabet based on active catalog selection
  const renderAlphabetSVG = (letter: string, customStyle?: typeof catalogStyle) => {
    const styleToRender = customStyle || catalogStyle;
    
    let font = "Impact, sans-serif";
    let isItalic = "normal";
    let fontW = "900";
    let letterOffset = "0";

    if (styleToRender === "bubble") {
      font = "'Bangers', sans-serif";
    } else if (styleToRender === "handstyle") {
      font = "'Sedgwick Ave Display', cursive";
    } else if (styleToRender === "acid") {
      font = "'Creepster', system-ui";
    } else if (styleToRender === "stencil") {
      font = "'Wallpoet', sans-serif";
      fontW = "bold";
    }

    return (
      <svg className="w-11 h-11 inline-block drop-shadow-md overflow-visible" viewBox="0 0 100 100">
        <defs>
          <radialGradient id={`glow-${letter}-${styleToRender}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Spray Glow */}
        <circle cx="50" cy="50" r="35" fill={`url(#glow-${letter}-${styleToRender})`} opacity="0.3" />
        
        {/* Underlay / 3D Shadow block */}
        <text
          x="53"
          y="72"
          fontSize="65"
          fontFamily={font}
          fontWeight={fontW}
          fontStyle={isItalic}
          fill="#1c1917"
          textAnchor="middle"
          letterSpacing={letterOffset}
        >
          {letter}
        </text>

        {/* Outline thickness */}
        <text
          x="50"
          y="69"
          fontSize="65"
          fontFamily={font}
          fontWeight={fontW}
          fontStyle={isItalic}
          fill="#dc2626"
          stroke="#1e1b4b"
          strokeWidth="10"
          textAnchor="middle"
          letterSpacing={letterOffset}
        >
          {letter}
        </text>

        {/* Main core fill */}
        <text
          x="50"
          y="69"
          fontSize="65"
          fontFamily={font}
          fontWeight={fontW}
          fontStyle={isItalic}
          fill="#fbbf24"
          textAnchor="middle"
          letterSpacing={letterOffset}
        >
          {letter}
        </text>

        {/* Gloss highlight bubble shine */}
        {styleToRender === "bubble" && (
          <text
            x="48"
            y="66"
            fontSize="65"
            fontFamily={font}
            fontWeight={fontW}
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            textAnchor="middle"
            opacity="0.85"
          >
            {letter}
          </text>
        )}
      </svg>
    );
  };

  const handleDownloadSVG = () => {
    // Generate brick grid string or other backgrounds for SVG vector output
    let backgroundSvg = `<rect width="100%" height="100%" fill="#1c1917" />`;
    if (wallPreset === "brick") {
      backgroundSvg = `
        <rect width="100%" height="100%" fill="#292524" />
        <g stroke="#1c1917" stroke-width="2.5" opacity="0.4">
          <line x1="0" y1="50" x2="800" y2="50" />
          <line x1="0" y1="100" x2="800" y2="100" />
          <line x1="0" y1="150" x2="800" y2="150" />
          <line x1="0" y1="200" x2="800" y2="200" />
          <line x1="0" y1="250" x2="800" y2="250" />
          <!-- Vertical offset lines -->
          <line x1="100" y1="0" x2="100" y2="50" /><line x1="300" y1="0" x2="300" y2="50" /><line x1="500" y1="0" x2="500" y2="50" /><line x1="700" y1="0" x2="700" y2="50" />
          <line x1="50" y1="50" x2="50" y2="100" /><line x1="250" y1="50" x2="250" y2="100" /><line x1="450" y1="50" x2="450" y2="100" /><line x1="650" y1="50" x2="650" y2="100" />
          <line x1="150" y1="100" x2="150" y2="150" /><line x1="350" y1="100" x2="350" y2="150" /><line x1="550" y1="100" x2="550" y2="150" /><line x1="750" y1="100" x2="750" y2="150" />
          <line x1="80" y1="150" x2="80" y2="200" /><line x1="280" y1="150" x2="280" y2="200" /><line x1="480" y1="150" x2="480" y2="200" /><line x1="680" y1="150" x2="680" y2="200" />
        </g>
      `;
    } else if (wallPreset === "concrete") {
      backgroundSvg = `<rect width="100%" height="100%" fill="#44403c" /><rect width="100%" height="100%" fill="#000" opacity="0.1" />`;
    } else if (wallPreset === "subway") {
      backgroundSvg = `
        <rect width="100%" height="100%" fill="#334155" />
        <g stroke="#1e293b" stroke-width="2">
          <line x1="200" y1="0" x2="200" y2="300" />
          <line x1="400" y1="0" x2="400" y2="300" />
          <line x1="600" y1="0" x2="600" y2="300" />
          <!-- Rivets dots -->
          <circle cx="195" cy="40" r="3" fill="#0f172a" /><circle cx="205" cy="40" r="3" fill="#0f172a" />
          <circle cx="195" cy="150" r="3" fill="#0f172a" /><circle cx="205" cy="150" r="3" fill="#0f172a" />
          <circle cx="195" cy="260" r="3" fill="#0f172a" /><circle cx="205" cy="260" r="3" fill="#0f172a" />
        </g>
      `;
    } else if (wallPreset === "garage") {
      backgroundSvg = `
        <rect width="100%" height="100%" fill="#64748b" />
        <g stroke="#334155" stroke-width="1.5">
          <line x1="80" y1="0" x2="80" y2="300" />
          <line x1="160" y1="0" x2="160" y2="300" />
          <line x1="240" y1="0" x2="240" y2="300" />
          <line x1="320" y1="0" x2="320" y2="300" />
          <line x1="400" y1="0" x2="400" y2="300" />
          <line x1="480" y1="0" x2="480" y2="300" />
          <line x1="560" y1="0" x2="560" y2="300" />
          <line x1="640" y1="0" x2="640" y2="300" />
          <line x1="720" y1="0" x2="720" y2="300" />
        </g>
      `;
    } else if (wallPreset === "neon") {
      backgroundSvg = `<rect width="100%" height="100%" fill="#09050e" />`;
    }

    const letters = (finalTagDecorated || "TAG").split("");
    const totalLetters = letters.length;
    // Estimated layout width
    const letterWidth = fontSize * 0.85;
    const totalWidth = totalLetters * (letterWidth + letterSpacing);
    const startX = 400 - totalWidth / 2 + (letterWidth / 2);

    let textElements = "";
    letters.forEach((char, index) => {
      const charX = startX + index * (letterWidth + letterSpacing);
      const bounceOffset = index % 2 === 0 ? letterBounce : -letterBounce;
      const rotationOffset = index % 2 === 0 ? letterRotation : -letterRotation;
      
      const fillVal = fillType === "solid" ? primaryColor : fillType === "gradient" ? "url(#textGrad)" : "url(#chromeGrad)";
      
      textElements += `
        <g transform="translate(${charX} ${150 + bounceOffset}) rotate(${rotationOffset})">
          <!-- 3D Shadow layer -->
          ${showShadow ? `
            <text 
              x="0" 
              y="0" 
              dominant-baseline="middle" 
              text-anchor="middle" 
              font-family="${activeStyleInfo.fontFamily}" 
              font-size="${fontSize * 1.3}px" 
              font-weight="900"
              fill="${strokeColor}" 
              opacity="0.9"
              transform="translate(${shadowOffset} ${shadowOffset})"
            >
              ${char}
            </text>
          ` : ""}
          
          <!-- Outer Outline block border -->
          <text 
            x="0" 
            y="0" 
            dominant-baseline="middle" 
            text-anchor="middle" 
            font-family="${activeStyleInfo.fontFamily}" 
            font-size="${fontSize * 1.3}px" 
            font-weight="900"
            fill="${strokeColor}" 
            stroke="${strokeColor}" 
            stroke-width="${strokeWidth * 1.8}"
          >
            ${char}
          </text>
          
          <!-- Main Core Colored Inner Text -->
          <text 
            x="0" 
            y="0" 
            dominant-baseline="middle" 
            text-anchor="middle" 
            font-family="${activeStyleInfo.fontFamily}" 
            font-size="${fontSize * 1.3}px" 
            font-weight="900"
            fill="${fillVal}"
          >
            ${char}
          </text>
        </g>
      `;
    });

    // Decals SVG layer
    let decalsSvg = "";
    if (hasHalo) {
      decalsSvg += `
        <ellipse cx="400" cy="${150 - fontSize * 0.7}" rx="${fontSize * 1.2}" ry="${fontSize * 0.2}" fill="none" stroke="#fbbf24" stroke-width="4" transform="rotate(-6 400 ${150 - fontSize * 0.7})" opacity="0.8" />
      `;
    }
    if (hasCrown) {
      const crownY = 150 - fontSize * 0.8;
      decalsSvg += `
        <path d="M ${startX - 15} ${crownY} L ${startX - 30} ${crownY - 25} L ${startX - 10} ${crownY - 10} L ${startX + 5} ${crownY - 30} L ${startX + 20} ${crownY - 10} L ${startX + 40} ${crownY - 25} L ${startX + 25} ${crownY} Z" fill="#fbbf24" stroke="#1c1917" stroke-width="2" transform="rotate(-12 ${startX} ${crownY})" />
      `;
    }
    if (hasUnderline) {
      const lineY = 150 + fontSize * 0.75;
      decalsSvg += `
        <path d="M ${startX - 30} ${lineY} Q 400 ${lineY + 15}, ${startX + totalWidth + 10} ${lineY}" fill="none" stroke="${strokeColor}" stroke-width="8" stroke-linecap="round" />
        <path d="M ${startX - 30} ${lineY} Q 400 ${lineY + 15}, ${startX + totalWidth + 10} ${lineY}" fill="none" stroke="${primaryColor}" stroke-width="4" stroke-linecap="round" />
      `;
    }
    if (hasStars) {
      const starLeftX = startX - 45;
      const starRightX = startX + totalWidth + 25;
      decalsSvg += `
        <!-- Left Star -->
        <g transform="translate(${starLeftX}, 130) scale(0.6)">
          <polygon points="25,1 32,15 47,18 36,28 39,43 25,36 11,43 14,28 3,18 18,15" fill="#fbbf24" />
        </g>
        <!-- Right Star -->
        <g transform="translate(${starRightX}, 140) scale(0.6)">
          <polygon points="25,1 32,15 47,18 36,28 39,43 25,36 11,43 14,28 3,18 18,15" fill="#fbbf24" />
        </g>
      `;
    }

    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="300" viewBox="0 0 800 300">
        <defs>
          <linearGradient id="textGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${primaryColor}" />
            <stop offset="100%" stop-color="${secondaryColor}" />
          </linearGradient>
          <linearGradient id="chromeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="45%" stop-color="#b0b0b0" />
            <stop offset="50%" stop-color="#000000" />
            <stop offset="55%" stop-color="${primaryColor}" />
            <stop offset="100%" stop-color="#ffffff" />
          </linearGradient>
        </defs>
        
        <!-- Background Layer -->
        ${backgroundSvg}
        
        <!-- Spray Paint Glow Aura -->
        <circle cx="400" cy="150" r="${oversprayRadius * 1.5}" fill="${primaryColor}" opacity="${oversprayOpacity * 0.3}" filter="blur(20px)" />
        
        <!-- Decals/Stickers Layer Behind/Above -->
        ${decalsSvg}

        <!-- Main Graffiti Text with slant transform -->
        <g transform="skewX(${slantAngle}) translate(${-slantAngle * 1.5} 0)">
          ${textElements}
        </g>
      </svg>
    `;
    const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `grafite-letradiferentes-${tagText.toLowerCase().replace(/\s+/g, "-")}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onNotify("Tag de Grafite em vetor SVG baixada com sucesso! Ideal para decalques ou adesivos. 🎨");
  };

  // Merge everything (Background, Freehand canvas strokes, Overspray Aura, SVG Letters) into a combined PNG download
  const handleDownloadFullPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Create an offline canvas to compile all layers
    const mergeCanvas = document.createElement("canvas");
    mergeCanvas.width = canvas.width || 800;
    mergeCanvas.height = canvas.height || 300;
    const ctx = mergeCanvas.getContext("2d");
    if (!ctx) return;
    
    // 1. Draw wall background texture color
    let bgColor = "#292524"; // Brick default
    if (wallPreset === "concrete") bgColor = "#3e3a36";
    else if (wallPreset === "subway") bgColor = "#1e293b";
    else if (wallPreset === "garage") bgColor = "#475569";
    else if (wallPreset === "neon") bgColor = "#09050e";
    
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, mergeCanvas.width, mergeCanvas.height);
    
    // 2. Render backing patterns (Brick grid or shutter ridges)
    if (wallPreset === "brick") {
      ctx.strokeStyle = "#1c1917";
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.35;
      const rowHeight = 35;
      const colWidth = 80;
      for (let y = 0; y < mergeCanvas.height; y += rowHeight) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(mergeCanvas.width, y);
        ctx.stroke();
        
        const offset = (Math.round(y / rowHeight) % 2 === 0) ? 0 : colWidth / 2;
        for (let x = offset; x < mergeCanvas.width; x += colWidth) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + rowHeight);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1.0;
    } else if (wallPreset === "subway") {
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.4;
      for (let x = 150; x < mergeCanvas.width; x += 150) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, mergeCanvas.height);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;
    } else if (wallPreset === "garage") {
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.45;
      for (let x = 60; x < mergeCanvas.width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, mergeCanvas.height);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;
    }
    
    // 3. Draw overspray soft aura
    if (oversprayRadius > 0) {
      const gradient = ctx.createRadialGradient(
        mergeCanvas.width / 2, mergeCanvas.height / 2, 0,
        mergeCanvas.width / 2, mergeCanvas.height / 2, oversprayRadius * 1.5
      );
      gradient.addColorStop(0, primaryColor);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.globalAlpha = oversprayOpacity * 0.3;
      ctx.fillRect(0, 0, mergeCanvas.width, mergeCanvas.height);
      ctx.globalAlpha = 1.0;
    }
    
    // 4. Layer manual spray painting strokes
    ctx.drawImage(canvas, 0, 0);
    
    // 5. Serialize the inline SVG preview and paint it on top
    const svgElement = document.querySelector(".lg\\:col-span-2 svg");
    if (svgElement) {
      try {
        const svgString = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
        const svgUrl = URL.createObjectURL(svgBlob);
        const img = new Image();
        
        img.onload = () => {
          // Draw the loaded SVG image on top of the compilation canvas
          ctx.drawImage(img, 0, 0, mergeCanvas.width, mergeCanvas.height);
          
          // Trigger file download
          const imgUrl = mergeCanvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = imgUrl;
          link.download = `mural-grafite-${tagText.toLowerCase().replace(/\s+/g, "-")}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(svgUrl);
          onNotify("Sua obra de arte completa (com pintura spray livre) foi exportada como PNG! 🖼️");
        };
        img.onerror = () => {
          // Fallback if SVG fails to compile in some strict frames (export paint + backdrop)
          const imgUrl = mergeCanvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = imgUrl;
          link.download = `mural-spray-livre.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          onNotify("Download simplificado concluído! 🎨");
        };
        img.src = svgUrl;
      } catch (err) {
        // Fallback
        const imgUrl = mergeCanvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgUrl;
        link.download = `mural-spray-livre.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onNotify("Download simplificado concluído! 🎨");
      }
    } else {
      // Background + Drawing only
      const imgUrl = mergeCanvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgUrl;
      link.download = `mural-desenho-manual.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onNotify("Download do desenho manual concluído! 🧱");
    }
  };

  // Build simulated text style object for browser preview
  const getSimulatedTextStyle = () => {
    return {
      color: primaryColor,
      fontSize: `${fontSize}px`,
      lineHeight: "1.1",
      WebkitTextStroke: `${strokeWidth}px ${strokeColor}`,
      fontFamily: activeStyleInfo.fontFamily,
      fontWeight: 900,
      transform: `skewX(${slantAngle}deg)`,
      textShadow: showShadow
        ? `${shadowOffset}px ${shadowOffset}px 0px ${strokeColor}, ${shadowOffset + 4}px ${shadowOffset + 4}px 10px rgba(0,0,0,0.65)`
        : `0px 2px 8px rgba(0,0,0,0.4)`,
      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
    };
  };

  // Render Wall specific graphics & rivets based on wallPreset state
  const renderWallGraphics = () => {
    if (wallPreset === "brick") {
      return (
        <div className="absolute inset-0 pointer-events-none opacity-30 select-none">
          <svg width="100%" height="100%">
            <pattern id="brick-pattern" width="80" height="35" patternUnits="userSpaceOnUse">
              <rect width="80" height="35" fill="none" stroke="#000" strokeWidth="2.5" />
              <line x1="40" y1="17.5" x2="40" y2="35" stroke="#000" strokeWidth="2.5" />
              <line x1="0" y1="17.5" x2="80" y2="17.5" stroke="#000" strokeWidth="2.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#brick-pattern)" />
          </svg>
        </div>
      );
    }
    if (wallPreset === "concrete") {
      return (
        <div className="absolute inset-0 pointer-events-none opacity-20 select-none bg-radial from-transparent to-stone-900/90 mix-blend-overlay">
          {/* Simulated concrete cracking and noise dots */}
          <div className="w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
        </div>
      );
    }
    if (wallPreset === "subway") {
      return (
        <div className="absolute inset-0 pointer-events-none select-none flex flex-col justify-between">
          <div className="w-full h-full flex justify-around opacity-40 border-b border-slate-900/45">
            <div className="w-[1.5px] h-full bg-slate-950 flex flex-col justify-between py-6">
              <span className="w-2 h-2 rounded-full bg-slate-950 -ml-1 border border-slate-700/50" />
              <span className="w-2 h-2 rounded-full bg-slate-950 -ml-1 border border-slate-700/50" />
              <span className="w-2 h-2 rounded-full bg-slate-950 -ml-1 border border-slate-700/50" />
            </div>
            <div className="w-[1.5px] h-full bg-slate-950 flex flex-col justify-between py-6">
              <span className="w-2 h-2 rounded-full bg-slate-950 -ml-1 border border-slate-700/50" />
              <span className="w-2 h-2 rounded-full bg-slate-950 -ml-1 border border-slate-700/50" />
              <span className="w-2 h-2 rounded-full bg-slate-950 -ml-1 border border-slate-700/50" />
            </div>
          </div>
          {/* Subway orange safety lines bottom decoration */}
          <div className="w-full h-3 bg-stripes bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/20 opacity-30 flex" />
        </div>
      );
    }
    if (wallPreset === "garage") {
      return (
        <div className="absolute inset-0 pointer-events-none opacity-25 select-none flex">
          {/* Roller shutter gates vertical stripes */}
          <div className="flex-1 border-r border-stone-950 bg-gradient-to-r from-transparent via-white/5 to-black/10" />
          <div className="flex-1 border-r border-stone-950 bg-gradient-to-r from-transparent via-white/5 to-black/10" />
          <div className="flex-1 border-r border-stone-950 bg-gradient-to-r from-transparent via-white/5 to-black/10" />
          <div className="flex-1 border-r border-stone-950 bg-gradient-to-r from-transparent via-white/5 to-black/10" />
          <div className="flex-1 border-r border-stone-950 bg-gradient-to-r from-transparent via-white/5 to-black/10" />
          <div className="flex-1 border-r border-stone-950 bg-gradient-to-r from-transparent via-white/5 to-black/10" />
          <div className="flex-1 border-r border-stone-950 bg-gradient-to-r from-transparent via-white/5 to-black/10" />
          <div className="flex-1 border-r border-stone-950 bg-gradient-to-r from-transparent via-white/5 to-black/10" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Editorial Header */}
      <div className="text-center md:text-left space-y-3.5 border-b border-slate-200/65 pb-8 relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-100 bg-pink-50/50 text-[10px] text-pink-800 font-bold tracking-widest uppercase font-mono">
          <Palette className="w-3.5 h-3.5 text-pink-600 animate-pulse" />
          <span>Módulo de Letras em Grafite &amp; Spray Digital Oficial</span>
        </div>
        <h2 className="font-sans font-black text-3xl md:text-4xl lg:text-5xl text-[#0F172A] tracking-tight leading-tight uppercase">
          Gerador de <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-amber-500 animate-gradient">Letras em Grafite</span> &amp; Spray Creator
        </h2>
        <p className="text-xs md:text-sm text-slate-500 max-w-3xl leading-relaxed font-semibold font-sans">
          Crie e customize assinaturas de arte urbana e tags espetaculares com o nosso gerador de <strong>letras em grafite</strong>! Digite seu apelido ou tag e explore o 
          alfabeto completo de <strong>letras em grafite</strong> em estilo bubble bombing, wildstyle angular ou handstyle realista. 
          Ajuste as formas de suas <strong>letras em grafite</strong>, sombras, inclinações e respingos de tinta spray sobre muros virtuais de <strong>letras em grafite</strong> e exporte tudo em alta definição (SVG).
        </p>
      </div>

      {/* Main Studio Console Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Settings Sidebar Column */}
        <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-3xl p-6 md:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-5">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-sans font-black text-xs text-[#0F172A] uppercase tracking-widest flex items-center gap-2">
              <Sliders className="w-4 h-4 text-pink-500" />
              Estúdio de Grafite
            </h3>
            <button
              onClick={handleReset}
              className="p-1.5 hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 transition-all cursor-pointer"
              title="Resetar Configurações"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Sidebar Navigation Tabs */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200/50 text-xs font-bold">
            <button
              onClick={() => setSidebarTab("style")}
              className={`flex-1 py-2 text-center rounded-xl cursor-pointer transition-all text-[10.5px] ${
                sidebarTab === "style"
                  ? "bg-white text-slate-900 shadow-sm font-black"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              1. Estilo & Cor
            </button>
            <button
              onClick={() => setSidebarTab("effects")}
              className={`flex-1 py-2 text-center rounded-xl cursor-pointer transition-all text-[10.5px] ${
                sidebarTab === "effects"
                  ? "bg-white text-slate-900 shadow-sm font-black"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              2. Letras & FX
            </button>
            <button
              onClick={() => setSidebarTab("decals")}
              className={`flex-1 py-2 text-center rounded-xl cursor-pointer transition-all text-[10.5px] ${
                sidebarTab === "decals"
                  ? "bg-white text-slate-900 shadow-sm font-black"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              3. Adereços & Muro
            </button>
          </div>

          {sidebarTab === "style" && (
            <div className="space-y-5 animate-fade-in">
              {/* User Input String */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-[10px] font-extrabold text-[#0F172A] uppercase tracking-widest font-mono block">
                    Texto do Tag ou Apelido:
                  </label>
                  <span className="text-[9px] font-mono font-bold text-slate-400">
                    {tagText.length}/14 letras
                  </span>
                </div>
                <input
                  type="text"
                  value={tagText}
                  onChange={(e) => handleTextChange(e.target.value)}
                  maxLength={14}
                  placeholder="VANDAL"
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 py-3 text-[#0F172A] text-sm font-black tracking-wide uppercase font-mono focus:outline-none focus:ring-4 focus:ring-pink-500/5 focus:border-pink-500 focus:bg-white transition-all"
                />
              </div>

              {/* Graffiti Styles Selectors */}
              <div className="space-y-2.5">
                <label className="text-[10px] font-extrabold text-[#0F172A] uppercase tracking-widest font-mono block">
                  Escolha o Estilo de Assinatura:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {graffitiStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => {
                        setSelectedStyle(style.id);
                        setShowDrips(style.defaultDrips);
                        if (style.id === "handstyle") {
                          setStrokeWidth(3);
                        } else {
                          setStrokeWidth(8);
                        }
                        onNotify(`Estilo alterado para: ${style.name}`);
                      }}
                      className={`px-3 py-2.5 border rounded-2xl text-left transition-all duration-300 cursor-pointer ${
                        selectedStyle === style.id
                          ? "bg-pink-50/60 border-pink-500 text-pink-950 shadow-xs"
                          : "bg-slate-50/50 border-slate-200 hover:bg-white text-slate-600"
                      }`}
                    >
                      <span className="text-xs font-black block leading-none">{style.name.split(" ")[0]}</span>
                      <span className="text-[8.5px] text-slate-400 font-medium block mt-1 leading-tight truncate">
                        {style.name.split(" ").slice(1).join(" ")}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Core Colors Selector Presets */}
              <div className="space-y-2.5">
                <label className="text-[10px] font-extrabold text-[#0F172A] uppercase tracking-widest font-mono block">
                  Paletas de Cores Prontas:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        setPrimaryColor(preset.primary);
                        setStrokeColor(preset.stroke);
                        onNotify(`Cores atualizadas para ${preset.name}!`);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 bg-slate-50/40 hover:bg-white border rounded-xl text-left transition-all text-xs font-bold cursor-pointer ${
                        primaryColor === preset.primary && strokeColor === preset.stroke
                          ? "border-pink-500 bg-pink-50/10 text-pink-950"
                          : "border-slate-200"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shrink-0 border border-slate-200"
                        style={{
                          background: `linear-gradient(135deg, ${preset.primary} 50%, ${preset.stroke} 50%)`
                        }}
                      />
                      <span className="truncate text-[10.5px]">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fill type selector */}
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-[#0F172A] uppercase tracking-widest font-mono block">
                  Tipo de Pintura Interna:
                </label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-100/70 p-1 rounded-xl border border-slate-200/50">
                  {(["solid", "gradient", "chrome"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setFillType(type);
                        onNotify(`Preenchimento alterado para: ${type.toUpperCase()}`);
                      }}
                      className={`py-1 text-[9.5px] font-black rounded-lg transition-all cursor-pointer text-center capitalize ${
                        fillType === type
                          ? "bg-[#0F172A] text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-950"
                      }`}
                    >
                      {type === "solid" ? "Sólido" : type === "gradient" ? "Degradê" : "Cromado"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Individual Colors selector */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-mono font-extrabold tracking-widest text-slate-400 block">
                    Tinta {fillType === "gradient" ? "Topo" : "Fill"}:
                  </span>
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-xl">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-7 h-7 rounded border border-slate-200 cursor-pointer bg-transparent"
                    />
                    <span className="text-[9.5px] font-mono font-bold text-slate-600">{primaryColor.toUpperCase()}</span>
                  </div>
                </div>

                {fillType === "gradient" ? (
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-mono font-extrabold tracking-widest text-slate-400 block">
                      Tinta Base:
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-xl">
                      <input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-7 h-7 rounded border border-slate-200 cursor-pointer bg-transparent"
                      />
                      <span className="text-[9.5px] font-mono font-bold text-slate-600">{secondaryColor.toUpperCase()}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-mono font-extrabold tracking-widest text-slate-400 block">
                      Contorno:
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-xl">
                      <input
                        type="color"
                        value={strokeColor}
                        onChange={(e) => setStrokeColor(e.target.value)}
                        className="w-7 h-7 rounded border border-slate-200 cursor-pointer bg-transparent"
                      />
                      <span className="text-[9.5px] font-mono font-bold text-slate-600">{strokeColor.toUpperCase()}</span>
                    </div>
                  </div>
                )}
              </div>

              {fillType === "gradient" && (
                <div className="space-y-1 border-t border-slate-50 pt-2">
                  <span className="text-[9px] uppercase font-mono font-extrabold tracking-widest text-slate-400 block">
                    Contorno de Outline:
                  </span>
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-xl">
                    <input
                      type="color"
                      value={strokeColor}
                      onChange={(e) => setStrokeColor(e.target.value)}
                      className="w-7 h-7 rounded border border-slate-200 cursor-pointer bg-transparent"
                    />
                    <span className="text-[9.5px] font-mono font-bold text-slate-600">{strokeColor.toUpperCase()}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {sidebarTab === "effects" && (
            <div className="space-y-4 animate-fade-in">
              {/* Font Scale slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-[#0F172A]">
                  <span className="font-extrabold">Tamanho das Letras:</span>
                  <span className="font-black text-pink-600">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min="38"
                  max="90"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>

              {/* Skew angle slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-[#0F172A]">
                  <span className="font-extrabold">Inclinação das Letras (Slant):</span>
                  <span className="font-black text-pink-600">{slantAngle}°</span>
                </div>
                <input
                  type="range"
                  min="-25"
                  max="25"
                  value={slantAngle}
                  onChange={(e) => setSlantAngle(parseInt(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>

              {/* Stroke Width outline slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-[#0F172A]">
                  <span className="font-extrabold">Espessura do Outline:</span>
                  <span className="font-black text-pink-600">{strokeWidth}px</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="14"
                  value={strokeWidth}
                  onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>

              {/* Letter spacing slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-[#0F172A]">
                  <span className="font-extrabold">Espaçamento Entre Letras:</span>
                  <span className="font-black text-pink-600">{letterSpacing}px</span>
                </div>
                <input
                  type="range"
                  min="-8"
                  max="25"
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(parseInt(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>

              {/* Height bounce slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-[#0F172A]">
                  <span className="font-extrabold">Desalinhamento Vertical (Bounce):</span>
                  <span className="font-black text-pink-600">{letterBounce}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={letterBounce}
                  onChange={(e) => setLetterBounce(parseInt(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>

              {/* Rotation slant slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-[#0F172A]">
                  <span className="font-extrabold">Rotação Alternada:</span>
                  <span className="font-black text-pink-600">{letterRotation}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={letterRotation}
                  onChange={(e) => setLetterRotation(parseInt(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>

              {/* Dynamic Drips and shadow toggles */}
              <div className="space-y-3 pt-2 border-t border-slate-100 text-xs text-slate-700 font-semibold">
                {/* Show shadow toggle */}
                <div className="flex flex-col space-y-1.5">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showShadow}
                      onChange={(e) => setShowShadow(e.target.checked)}
                      className="rounded accent-pink-500 w-4 h-4"
                    />
                    <span>Habilitar Sombra 3D Extrudada</span>
                  </label>

                  {showShadow && (
                    <div className="pl-6 space-y-1">
                      <div className="flex justify-between text-[9px] font-mono text-slate-400">
                        <span>Distância Extrusão:</span>
                        <span>{shadowOffset}px</span>
                      </div>
                      <input
                        type="range"
                        min="3"
                        max="18"
                        value={shadowOffset}
                        onChange={(e) => setShadowOffset(parseInt(e.target.value))}
                        className="w-full accent-pink-500 cursor-pointer"
                      />
                    </div>
                  )}
                </div>

                {/* Show drips toggle */}
                <div className="flex flex-col space-y-1.5 pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showDrips}
                      onChange={(e) => setShowDrips(e.target.checked)}
                      className="rounded accent-pink-500 w-4 h-4"
                    />
                    <span>Efeito Gotas Escorridas</span>
                  </label>

                  {showDrips && (
                    <div className="pl-6 space-y-1">
                      <div className="flex justify-between text-[9px] font-mono text-slate-400">
                        <span>Comprimento de Escorrer:</span>
                        <span>{dripLength}px</span>
                      </div>
                      <input
                        type="range"
                        min="15"
                        max="80"
                        value={dripLength}
                        onChange={(e) => setDripLength(parseInt(e.target.value))}
                        className="w-full accent-pink-500 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {sidebarTab === "decals" && (
            <div className="space-y-4 animate-fade-in">
              {/* Wall Presets background Selector */}
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-[#0F172A] block font-mono uppercase tracking-widest">
                  Textura do Muro de Fundo:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {wallPresetsList.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setWallPreset(preset.id as any);
                        onNotify(`Fundo alterado para: ${preset.name}`);
                      }}
                      className={`px-2.5 py-1.5 border rounded-xl text-[10px] font-bold text-left transition-all duration-300 cursor-pointer truncate ${
                        wallPreset === preset.id
                          ? "border-pink-500 bg-pink-50/20 text-pink-950 font-black"
                          : "border-slate-200 hover:bg-slate-50 text-slate-600 bg-white"
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spray Overspray / Paint Mist adjusters */}
              <div className="space-y-3 pt-1">
                <span className="text-[10px] font-extrabold text-[#0F172A] block font-mono uppercase tracking-widest">
                  Névoa Spray (Overspray de Fundo):
                </span>
                
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[9px] font-mono text-slate-500">
                    <span>Raio de Dispersão:</span>
                    <span>{oversprayRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={oversprayRadius}
                    onChange={(e) => setOversprayRadius(parseInt(e.target.value))}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[9px] font-mono text-slate-500">
                    <span>Opacidade Névoa:</span>
                    <span>{Math.round(oversprayOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.1"
                    value={oversprayOpacity}
                    onChange={(e) => setOversprayOpacity(parseFloat(e.target.value))}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Stickers/Decals section */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <label className="text-[10px] font-extrabold text-[#0F172A] block font-mono uppercase tracking-widest">
                  Acessórios Street Art (Decalques):
                </label>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                  <button
                    onClick={() => { setHasCrown(!hasCrown); onNotify(hasCrown ? "Coroa removida! 👑" : "Coroa de Rei adicionada! 👑"); }}
                    className={`flex items-center gap-1.5 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      hasCrown ? "bg-amber-50 border-amber-400 text-amber-950 font-extrabold" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <Crown className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate">Coroa 👑</span>
                  </button>
                  <button
                    onClick={() => { setHasHalo(!hasHalo); onNotify(hasHalo ? "Auréola removida! 😇" : "Auréola de Anjo adicionada! 😇"); }}
                    className={`flex items-center gap-1.5 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      hasHalo ? "bg-amber-50 border-amber-300 text-amber-900 font-extrabold" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <Sparkle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate">Auréola 😇</span>
                  </button>
                  <button
                    onClick={() => { setHasUnderline(!hasUnderline); onNotify(hasUnderline ? "Swoosh base removido!" : "Swoosh base adicionado! 🖊️"); }}
                    className={`flex items-center gap-1.5 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      hasUnderline ? "bg-pink-50 border-pink-400 text-pink-950 font-extrabold" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <Type className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                    <span className="truncate">Swoosh 🖊️</span>
                  </button>
                  <button
                    onClick={() => { setHasStars(!hasStars); onNotify(hasStars ? "Estrelas removidas!" : "Estrelas de brilho adicionadas! ✨"); }}
                    className={`flex items-center gap-1.5 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      hasStars ? "bg-pink-50 border-pink-400 text-pink-950 font-extrabold" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-pink-500 shrink-0 animate-pulse" />
                    <span className="truncate">Estrelas ✨</span>
                  </button>
                </div>
              </div>

              {/* Freehand Spray Painting Control Section */}
              <div className="space-y-3.5 pt-3 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-extrabold text-[#0F172A] block font-mono uppercase tracking-widest flex items-center gap-1.5">
                    <Brush className="w-3.5 h-3.5 text-pink-500" />
                    Modo Pintura Livre (Spray Can):
                  </label>
                  <span className="text-[9px] bg-pink-100 text-pink-700 font-extrabold px-1.5 py-0.5 rounded animate-pulse">
                    NOVO ⚡
                  </span>
                </div>

                <button
                  onClick={() => {
                    setCanvasDrawingMode(!canvasDrawingMode);
                    onNotify(canvasDrawingMode ? "Lata de Spray Livre desativada! 🚫" : "Lata de Spray Livre ATIVADA! 🎨 Pinte clicando e arrastando no muro virtual.");
                  }}
                  className={`w-full py-2.5 px-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    canvasDrawingMode
                      ? "bg-pink-50 border-pink-400 text-pink-950 font-black shadow-inner"
                      : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 font-bold"
                  }`}
                >
                  <Brush className="w-4 h-4 text-pink-500" />
                  {canvasDrawingMode ? "Desativar Lata de Spray" : "Ativar Lata de Spray Livre"}
                </button>

                {canvasDrawingMode && (
                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-3.5 space-y-3 animate-fade-in text-[11px] font-bold">
                    <p className="text-[10px] text-slate-500 leading-normal font-semibold font-sans italic text-center">
                      ✨ Clique, segure e arraste no Muro Virtual para pintar livremente!
                    </p>

                    {/* Brush Size Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-mono text-slate-500">
                        <span>Calibre do Jato (Cap Size):</span>
                        <span>{brushWidth}px</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        value={brushWidth}
                        onChange={(e) => setBrushWidth(parseInt(e.target.value))}
                        className="w-full accent-pink-500 cursor-pointer"
                      />
                    </div>

                    {/* Brush Opacity Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-mono text-slate-500">
                        <span>Concentração de Tinta (Vazão):</span>
                        <span>{Math.round(brushOpacity * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.05"
                        value={brushOpacity}
                        onChange={(e) => setBrushOpacity(parseFloat(e.target.value))}
                        className="w-full accent-pink-500 cursor-pointer"
                      />
                    </div>

                    {/* Brush Color Picker / Swatches */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-mono text-slate-500 block">Cor do Spray Livre:</span>
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {[
                          "#fbbf24", // Amber
                          "#dc2626", // Red
                          "#ec4899", // Pink
                          "#a855f7", // Purple
                          "#3b82f6", // Blue
                          "#22c55e", // Green
                          "#06b6d4", // Cyan
                          "#ffffff", // White
                          "#171717", // Black
                        ].map((c) => (
                          <button
                            key={c}
                            onClick={() => setBrushColor(c)}
                            className={`w-6 h-6 rounded-full border cursor-pointer transition-all ${
                              brushColor === c ? "scale-115 ring-2 ring-pink-500 border-white" : "border-slate-300"
                            }`}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                        {/* Native color picker */}
                        <div className="w-6 h-6 rounded-full border border-slate-300 overflow-hidden relative cursor-pointer flex items-center justify-center bg-white hover:scale-105 transition-all">
                          <input
                            type="color"
                            value={brushColor}
                            onChange={(e) => setBrushColor(e.target.value)}
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                          />
                          <Palette className="w-3.5 h-3.5 text-slate-500 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Clear Button */}
                    <button
                      onClick={clearCanvas}
                      disabled={!hasDrawnAnything}
                      className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                        hasDrawnAnything
                          ? "bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700 font-extrabold"
                          : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      <Eraser className="w-3.5 h-3.5 animate-bounce" />
                      Limpar Desenhos Manuais
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action to Save locally */}
          <button
            onClick={handleSaveTag}
            className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-xs rounded-2xl transition-all shadow-md shadow-pink-600/15 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" />
            Salvar Arte na Galeria
          </button>
        </div>

        {/* Right Preview Virtual Wall Column */}
        <div className="lg:col-span-2 flex flex-col justify-between bg-slate-950 rounded-3xl border border-slate-900 overflow-hidden shadow-2xl relative min-h-[460px]">
          
          {/* Wall Header bar */}
          <div className="bg-slate-900 px-5 py-3.5 border-b border-slate-800/80 flex justify-between items-center z-10 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-mono font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
              <span>Painel Virtual de Grafite</span>
            </div>
            
            <div className="flex items-center gap-2.5">
              <span className="text-[9px] bg-slate-950 text-slate-500 px-2 py-1 rounded font-mono border border-slate-800">
                CAP_FAT_04_ACTIVE
              </span>
            </div>
          </div>

          {/* Interactive spray mural area */}
          <div 
            className={`flex-1 flex items-center justify-center p-8 md:p-12 relative overflow-hidden transition-colors duration-500 ${
              wallPreset === "brick" ? "bg-[#292524]" :
              wallPreset === "concrete" ? "bg-[#3e3a36]" :
              wallPreset === "subway" ? "bg-[#1e293b]" :
              wallPreset === "garage" ? "bg-[#475569]" : "bg-[#09050e]"
            }`}
          >
            {/* Dynamic wall overlays (brick pattern, rivets, shutter corrugated ridges) */}
            {renderWallGraphics()}

            {/* Spray Paint Glow aerosol mist behind the text */}
            {oversprayRadius > 0 && (
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none filter blur-2xl transition-all duration-300"
                style={{
                  width: `${oversprayRadius * 3}px`,
                  height: `${oversprayRadius * 3}px`,
                  backgroundColor: primaryColor,
                  opacity: oversprayOpacity * 0.25,
                }}
              />
            )}

            {/* Interactive Freehand Paint Canvas (HTML5 Layer) */}
            <canvas
              ref={canvasRef}
              onMouseDown={handleStartDrawing}
              onMouseMove={handleDrawing}
              onMouseUp={handleStopDrawing}
              onMouseLeave={handleStopDrawing}
              onTouchStart={handleStartDrawing}
              onTouchMove={handleDrawing}
              onTouchEnd={handleStopDrawing}
              className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
                canvasDrawingMode ? "cursor-crosshair pointer-events-auto opacity-100 z-10" : "pointer-events-none opacity-90 z-0"
              }`}
            />

            {/* Inline live vector SVG preview representation (pointer events disabled to let spray paint clicks pass through) */}
            <div className="relative z-20 w-full max-w-2xl aspect-[800/300] mx-auto flex items-center justify-center select-none py-4 pointer-events-none">
              <svg
                viewBox="0 0 800 300"
                className="w-full h-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)]"
              >
                <defs>
                  <linearGradient id="previewTextGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={primaryColor} />
                    <stop offset="100%" stopColor={secondaryColor} />
                  </linearGradient>
                  <linearGradient id="previewChromeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="45%" stopColor="#b0b0b0" />
                    <stop offset="50%" stopColor="#000000" />
                    <stop offset="55%" stopColor={primaryColor} />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>

                {/* Decals/Stickers Layer */}
                {hasHalo && (
                  <ellipse
                    cx="400"
                    cy={150 - fontSize * 0.7}
                    rx={fontSize * 1.2}
                    ry={fontSize * 0.2}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="4"
                    transform={`rotate(-6 400 ${150 - fontSize * 0.7})`}
                    className="opacity-90 animate-pulse"
                  />
                )}
                {hasCrown && (
                  <path
                    d={`M ${400 - (((finalTagDecorated || "TAG").length * fontSize * 0.85) / 2) - 15} ${150 - fontSize * 0.8} L ${400 - (((finalTagDecorated || "TAG").length * fontSize * 0.85) / 2) - 30} ${150 - fontSize * 0.8 - 25} L ${400 - (((finalTagDecorated || "TAG").length * fontSize * 0.85) / 2) - 10} ${150 - fontSize * 0.8 - 10} L ${400 - (((finalTagDecorated || "TAG").length * fontSize * 0.85) / 2) + 5} ${150 - fontSize * 0.8 - 30} L ${400 - (((finalTagDecorated || "TAG").length * fontSize * 0.85) / 2) + 20} ${150 - fontSize * 0.8 - 10} L ${400 - (((finalTagDecorated || "TAG").length * fontSize * 0.85) / 2) + 40} ${150 - fontSize * 0.8 - 25} L ${400 - (((finalTagDecorated || "TAG").length * fontSize * 0.85) / 2) + 25} ${150 - fontSize * 0.8} Z`}
                    fill="#fbbf24"
                    stroke="#1c1917"
                    strokeWidth="2.5"
                    transform={`rotate(-12 ${400 - (((finalTagDecorated || "TAG").length * fontSize * 0.85) / 2)} ${150 - fontSize * 0.8})`}
                  />
                )}
                {hasUnderline && (
                  <>
                    <path
                      d={`M ${400 - ((finalTagDecorated || "TAG").length * (fontSize * 0.85 + letterSpacing)) / 2 - 20} ${150 + fontSize * 0.75} Q 400 ${150 + fontSize * 0.75 + 15}, ${400 + ((finalTagDecorated || "TAG").length * (fontSize * 0.85 + letterSpacing)) / 2 + 10} ${150 + fontSize * 0.75}`}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <path
                      d={`M ${400 - ((finalTagDecorated || "TAG").length * (fontSize * 0.85 + letterSpacing)) / 2 - 20} ${150 + fontSize * 0.75} Q 400 ${150 + fontSize * 0.75 + 15}, ${400 + ((finalTagDecorated || "TAG").length * (fontSize * 0.85 + letterSpacing)) / 2 + 10} ${150 + fontSize * 0.75}`}
                      fill="none"
                      stroke={primaryColor}
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </>
                )}
                {hasStars && (
                  <>
                    {/* Left Star */}
                    <g transform={`translate(${400 - ((finalTagDecorated || "TAG").length * (fontSize * 0.85 + letterSpacing)) / 2 - 45}, 130) scale(0.6)`}>
                      <polygon points="25,1 32,15 47,18 36,28 39,43 25,36 11,43 14,28 3,18 18,15" fill="#fbbf24" className="animate-pulse" />
                    </g>
                    {/* Right Star */}
                    <g transform={`translate(${400 + ((finalTagDecorated || "TAG").length * (fontSize * 0.85 + letterSpacing)) / 2 + 20}, 140) scale(0.6)`}>
                      <polygon points="25,1 32,15 47,18 36,28 39,43 25,36 11,43 14,28 3,18 18,15" fill="#fbbf24" className="animate-pulse" />
                    </g>
                  </>
                )}

                {/* Main letters grouped with slant transform */}
                <g transform={`skewX(${slantAngle}) translate(${-slantAngle * 1.5} 0)`}>
                  {(finalTagDecorated || "TAG").split("").map((char, index) => {
                    const letterWidth = fontSize * 0.85;
                    const totalWidth = (finalTagDecorated || "TAG").length * (letterWidth + letterSpacing);
                    const startX = 400 - totalWidth / 2 + (letterWidth / 2);
                    const charX = startX + index * (letterWidth + letterSpacing);
                    const bounceOffset = index % 2 === 0 ? letterBounce : -letterBounce;
                    const rotationOffset = index % 2 === 0 ? letterRotation : -letterRotation;

                    const fillVal = fillType === "solid" ? primaryColor : fillType === "gradient" ? "url(#previewTextGrad)" : "url(#previewChromeGrad)";

                    return (
                      <g
                        key={index}
                        transform={`translate(${charX} ${150 + bounceOffset}) rotate(${rotationOffset})`}
                      >
                        {/* 3D shadow layer */}
                        {showShadow && (
                          <text
                            x="0"
                            y="0"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            fontFamily={activeStyleInfo.fontFamily}
                            fontSize={`${fontSize * 1.3}px`}
                            fontWeight="900"
                            fill={strokeColor}
                            opacity="0.9"
                            transform={`translate(${shadowOffset} ${shadowOffset})`}
                          >
                            {char}
                          </text>
                        )}

                        {/* Outer outline border */}
                        <text
                          x="0"
                          y="0"
                          dominantBaseline="middle"
                          textAnchor="middle"
                          fontFamily={activeStyleInfo.fontFamily}
                          fontSize={`${fontSize * 1.3}px`}
                          fontWeight="900"
                          fill={strokeColor}
                          stroke={strokeColor}
                          strokeWidth={strokeWidth * 1.8}
                        >
                          {char}
                        </text>

                        {/* Main core inner colored character */}
                        <text
                          x="0"
                          y="0"
                          dominantBaseline="middle"
                          textAnchor="middle"
                          fontFamily={activeStyleInfo.fontFamily}
                          fontSize={`${fontSize * 1.3}px`}
                          fontWeight="900"
                          fill={fillVal}
                        >
                          {char}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>

              {/* Dynamic outline colored drips escorridos */}
              {showDrips && (
                <div className="absolute top-[82%] left-0 right-0 flex justify-around pointer-events-none opacity-85 px-12">
                  <div className="w-1.5 rounded-full transition-all duration-300" style={{ height: `${dripLength * 0.8}px`, backgroundColor: strokeColor }} />
                  <div className="w-1 rounded-full transition-all duration-300" style={{ height: `${dripLength * 0.4}px`, backgroundColor: primaryColor }} />
                  <div className="w-2 rounded-full transition-all duration-300" style={{ height: `${dripLength * 1.1}px`, backgroundColor: strokeColor }} />
                  <div className="w-1 rounded-full transition-all duration-300" style={{ height: `${dripLength * 0.6}px`, backgroundColor: strokeColor }} />
                  <div className="w-1.5 rounded-full transition-all duration-300" style={{ height: `${dripLength * 0.9}px`, backgroundColor: primaryColor }} />
                </div>
              )}
            </div>
          </div>

          {/* Virtual Wall Footer details & downloads */}
          <div className="bg-slate-900 p-5 border-t border-slate-800/85 flex flex-col md:flex-row md:items-center justify-between gap-5 text-xs z-10">
            <div className="text-slate-400 font-sans max-w-md">
              <strong className="text-pink-500 uppercase tracking-wide text-[10px] font-mono block mb-1">
                Família: {activeStyleInfo.name}
              </strong>
              <span className="text-slate-300 leading-relaxed font-medium">{activeStyleInfo.description}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 shrink-0 w-full md:w-auto">
              <button
                onClick={handleCopy}
                className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all duration-300 text-xs font-bold cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-pink-500" />}
                Copiar Tag
              </button>
              <button
                onClick={handleDownloadSVG}
                className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/50 rounded-xl transition-all duration-300 text-xs font-bold cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-pink-500" />
                Baixar SVG
              </button>
              <button
                onClick={handleDownloadFullPNG}
                className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-black rounded-xl transition-all duration-300 text-xs cursor-pointer shadow-lg shadow-pink-600/10"
                title="Baixar mural completo em alta definição (inclui pintura manual)"
              >
                <Palette className="w-3.5 h-3.5" />
                Salvar Obra PNG
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Local Saved Tags Gallery Shelf (v3) */}
      {savedTags.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
              <h4 className="text-xs font-bold font-mono uppercase text-slate-200 tracking-wider">
                Sua Galeria Local de Tags ({savedTags.length}/8)
              </h4>
            </div>
            <span className="text-[9px] text-slate-500 font-semibold uppercase">
              Armazenado em cache no navegador
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {savedTags.map((tag) => {
              const info = graffitiStyles.find(s => s.id === tag.style) || graffitiStyles[0];
              return (
                <div
                  key={tag.id}
                  onClick={() => handleLoadTag(tag)}
                  className="bg-slate-950 border border-slate-800 hover:border-pink-500/50 rounded-2xl p-4 cursor-pointer group transition-all relative flex flex-col justify-between space-y-4 shadow-sm"
                >
                  {/* Delete button */}
                  <button
                    onClick={(e) => handleDeleteTag(tag.id, e)}
                    className="absolute top-2.5 right-2.5 p-1 text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                    title="Remover Arte"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="space-y-1">
                    <span className="text-[8.5px] font-mono tracking-wider text-slate-500 uppercase block">
                      {info.name.split(" ")[0]}
                    </span>
                    
                    {/* Simulated miniature rendering */}
                    <p
                      style={{
                        color: tag.primaryColor,
                        fontFamily: info.fontFamily,
                        fontSize: "20px",
                        fontWeight: 900,
                        WebkitTextStroke: `1.5px ${tag.strokeColor}`,
                        transform: `skewX(${tag.slantAngle * 0.4}deg)`,
                        textShadow: tag.showShadow ? `1.5px 1.5px 0px ${tag.strokeColor}` : "none"
                      }}
                      className="truncate font-sans leading-none pt-2 select-none"
                    >
                      {tag.text}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[8px] text-slate-500 border-t border-slate-800/50 pt-2.5 font-mono">
                    <span>Fundo: {tag.wallPreset}</span>
                    <span className="text-pink-500 font-bold group-hover:underline">Carregar</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Graffiti A-Z Interactive Catalog Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-500/5 to-transparent rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-sans font-black text-slate-900 text-base uppercase tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-pink-500" />
              Alfabeto de Letras em Grafite A-Z Interativo
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-semibold leading-relaxed">
              Explore o design de <strong>letras em grafite</strong> detalhado para inspirar seus esboços e murais. Selecione a caligrafia de <strong>letras em grafite</strong> desejada para recarregar o abecedário.
            </p>
          </div>

          {/* Catalog Style Switcher */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/50">
            {[
              { id: "bubble", label: "Bubble 🎈" },
              { id: "handstyle", label: "Tag 🖋️" },
              { id: "acid", label: "Acid 🧪" },
              { id: "stencil", label: "Cyber ⚡" }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setCatalogStyle(st.id as any)}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                  catalogStyle === st.id
                    ? "bg-[#0F172A] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Alphabet Letters Grid */}
        <div className="flex flex-wrap gap-2 justify-center py-4 bg-slate-50/50 rounded-2xl p-4 border border-slate-200/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => {
                setSelectedAlphabetLetter(letter);
                onNotify(`Visualizando letras em grafite: letra "${letter}" no estilo ${catalogStyle}!`);
              }}
              className={`p-2 rounded-xl transition-all duration-300 cursor-pointer border ${
                selectedAlphabetLetter === letter
                  ? "bg-[#0F172A] border-pink-500 scale-105 shadow-md shadow-slate-900/15"
                  : "bg-white hover:bg-slate-50 border-slate-200"
              }`}
            >
              {renderAlphabetSVG(letter)}
            </button>
          ))}
        </div>

        {/* Detailed single letter drawing instruction card */}
        <div className="bg-slate-50/65 rounded-2xl border border-slate-200/80 p-5 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex flex-col items-center justify-center md:border-r border-slate-200/80 py-2 pr-0 md:pr-6">
            <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 shadow-md flex items-center justify-center min-w-32 min-h-32 relative overflow-hidden">
              {/* Micro concrete background for single letter */}
              <div className="absolute inset-0 bg-radial from-transparent to-stone-950 opacity-40" />
              <div className="relative z-10">
                {renderAlphabetSVG(selectedAlphabetLetter)}
              </div>
            </div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-2.5 font-mono font-extrabold flex items-center gap-1">
              <Sparkle className="w-3 h-3 text-pink-500 fill-pink-500" /> Letras em Grafite: Letra {selectedAlphabetLetter} ({catalogStyle.toUpperCase()})
            </span>
          </div>

          <div className="md:col-span-2 space-y-3.5">
            <h4 className="font-sans font-black text-slate-950 text-base leading-tight">
              Instruções de Traço para desenhar a letra &quot;{selectedAlphabetLetter}&quot; do abecedário de letras em grafite no estilo {catalogStyle.toUpperCase()}
            </h4>
            
            {catalogStyle === "bubble" && (
              <ol className="list-decimal list-inside text-xs text-slate-500 space-y-1.5 leading-relaxed font-semibold">
                <li>Esboce o miolo central bem inflado e arredonde todas as arestas externas destas <strong>letras em grafite</strong>.</li>
                <li>Mantenha as curvas gordas e sobreponha levemente as <strong>letras em grafite</strong> adjacentes do seu bomb.</li>
                <li>Desenhe uma linha de destaque (gloss shine) no topo esquerdo destas <strong>letras em grafite</strong> com tinta branca.</li>
                <li>Adicione o contorno de contraste de 4px na base de baixo destas <strong>letras em grafite</strong> bubble bombing.</li>
              </ol>
            )}

            {catalogStyle === "handstyle" && (
              <ol className="list-decimal list-inside text-xs text-slate-500 space-y-1.5 leading-relaxed font-semibold">
                <li>Utilize um bico chanfrado (chisel cap) e deslize para criar suas <strong>letras em grafite</strong> tag de forma rápida.</li>
                <li>Inclinações constantes de 15° para a direita dão fluidez às suas <strong>letras em grafite</strong>.</li>
                <li>Deixe a ponta de saída carregar um pouco mais de tinta nestas suas <strong>letras em grafite</strong> cursivas.</li>
                <li>Adicione estrelas e coroas acima para adornar suas <strong>letras em grafite</strong> de assinatura rápida.</li>
              </ol>
            )}

            {catalogStyle === "acid" && (
              <ol className="list-decimal list-inside text-xs text-slate-500 space-y-1.5 leading-relaxed font-semibold">
                <li>Crie traços verticais longos e ondulados nas <strong>letras em grafite</strong>, deformando o rodapé da tipografia.</li>
                <li>Elimine as barras retas e faça as junções destas <strong>letras em grafite</strong> parecerem derretidas ou viscosas.</li>
                <li>Utilize cores fluorescentes (verde limão, roxo tóxico) para dar contraste químico a estas <strong>letras em grafite</strong>.</li>
                <li>Adicione respingos de spray (overspray) em formato de névoa ao fundo das suas <strong>letras em grafite</strong>.</li>
              </ol>
            )}

            {catalogStyle === "stencil" && (
              <ol className="list-decimal list-inside text-xs text-slate-500 space-y-1.5 leading-relaxed font-semibold">
                <li>Mantenha as pontas limpas, geométricas e com interrupções técnicas estruturais nestas <strong>letras em grafite</strong>.</li>
                <li>Ideal para recortes em cartolinas ou chapas metálicas de suas <strong>letras em grafite</strong> favoritas.</li>
                <li>Esborrifar o spray de forma uniforme sobre o stencil ou molde físico destas <strong>letras em grafite</strong>.</li>
                <li>Efeito de sombras degradê nas quinas dão visual tridimensional de destaque a estas <strong>letras em grafite</strong>.</li>
              </ol>
            )}

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedAlphabetLetter);
                  onNotify(`Letra "${selectedAlphabetLetter}" copiada!`);
                }}
                className="inline-flex items-center gap-1 text-[10.5px] font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" /> Copiar Caractere
              </button>
              
              <span className="text-[10.5px] text-slate-400 py-1.5 italic font-mono font-semibold block">
                *Dica: Use bicos de spray Fat Cap para preenchimento rápido ou Skinny Cap para detalhes finos nas letras em grafite.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Street Art Glossary & Pro Tips (Terminologia & Técnicas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Glossary Block */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/80 rounded-3xl p-6 md:p-8 space-y-4">
          <h4 className="font-sans font-black text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
            📖 Glossário de Letras em Grafite: Termos de Rua
          </h4>
          <div className="text-xs text-slate-600 space-y-3.5 font-sans leading-relaxed font-semibold">
            <p>
              O design de <strong>letras em grafite</strong> possui um vocabulário próprio desenvolvido nos muros urbanos. 
              Entender este glossário técnico ajuda você a dominar a tipografia e criar estilos originais de <strong>letras em grafite</strong>:
            </p>
            <ul className="space-y-2 text-[11.5px] text-slate-500">
              <li>• <strong className="text-slate-800 font-extrabold">Bombing / Throw-up:</strong> Estilo rápido de <strong>letras em grafite</strong> com duas cores (preenchimento e contorno externo), geralmente arredondadas, para pintar rapidamente sob pressão.</li>
              <li>• <strong className="text-slate-800 font-extrabold">Wildstyle:</strong> Categoria complexa de <strong>letras em grafite</strong> pontiagudas e entrelaçadas, cheias de setas e conexões dinâmicas.</li>
              <li>• <strong className="text-slate-800 font-extrabold">Handstyle:</strong> A assinatura caligráfica pura do escritor de rua, que serve de fundação para qualquer tipo de <strong>letras em grafite</strong> de alta qualidade.</li>
              <li>• <strong className="text-slate-800 font-extrabold">Cap (Bicos):</strong> A válvula que controla a vazão de spray para definir o contorno fino ou preenchimento grosso de suas <strong>letras em grafite</strong>.</li>
            </ul>
          </div>
        </div>

        {/* Professional Aerosol Painting Tips */}
        <div className="bg-pink-50/10 border border-pink-100/60 rounded-3xl p-6 md:p-8 space-y-4">
          <h4 className="font-sans font-black text-pink-950 text-sm uppercase tracking-wider flex items-center gap-2">
            🎨 Dicas de Pintura: Passando Letras em Grafite para a Parede
          </h4>
          <div className="text-xs text-slate-600 space-y-3 font-sans leading-relaxed font-semibold">
            <p>
              Pintar com sprays de aerossol exige controle mecânico do braço. Se você pretende imprimir as 
              <strong>letras em grafite</strong> criadas aqui para grafitar na rua, siga estas regras de mestre:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-[11.5px] text-slate-600">
              <li>
                <strong className="text-pink-950 font-extrabold">Distância e Ângulo:</strong> Mantenha o spray perpendicular à parede para evitar que as lines das suas <strong>letras em grafite</strong> fiquem borradas.
              </li>
              <li>
                <strong className="text-pink-950 font-extrabold">Movimento Fluido:</strong> Nunca pare a mão enquanto estiver liberando a tinta, garantindo contornos limpos nas suas <strong>letras em grafite</strong>.
              </li>
              <li>
                <strong className="text-pink-950 font-extrabold">Segurança em Primeiro Lugar:</strong> O vapor tóxico das tintas exige o uso de máscaras com filtros adequados ao pintar suas <strong>letras em grafite</strong> reais.
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* SEO & Educational Guide Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
        <h3 className="font-sans font-black text-[#0F172A] text-sm uppercase tracking-wider flex items-center gap-1.5">
          <HelpCircle className="w-4.5 h-4.5 text-indigo-500" />
          Perguntas Frequentes sobre Letras em Grafite (FAQ)
        </h3>
        
        <div className="divide-y divide-slate-100 text-xs font-sans leading-relaxed text-slate-500 font-semibold space-y-3">
          <div className="pt-3 space-y-1">
            <span className="text-[#0F172A] font-black block">Como posso baixar minhas letras em grafite geradas no estúdio?</span>
            <p>
              É muito simples! Basta digitar sua palavra no painel lateral esquerdo, ajustar os filtros tipográficos de suas <strong>letras em grafite</strong>, 
              escolher as cores ideais e clicar em <strong className="text-pink-600 font-bold">Baixar SVG</strong>. O seu design de <strong>letras em grafite</strong> será salvo em alta definição em formato vetorial.
            </p>
          </div>

          <div className="pt-3 space-y-1">
            <span className="text-[#0F172A] font-black block">Posso usar este abecedário para estudar o formato das letras em grafite?</span>
            <p>
              Sim! Nosso catálogo interativo A-Z de <strong>letras em grafite</strong> serve exatamente como guia didático e sketchbook urbano. Você pode clicar nas 
              <strong>letras em grafite</strong> individuais para examinar as estruturas bubble, tag, acid e stencil de forma intuitiva.
            </p>
          </div>

          <div className="pt-3 space-y-1">
            <span className="text-[#0F172A] font-black block">Qual a melhor forma de praticar a criação de letras em grafite personalizadas?</span>
            <p>
              Recomendamos usar o simulador online para entender o espaçamento e fluxo visual das <strong>letras em grafite</strong>, copiando depois as estruturas das 
              <strong>letras em grafite</strong> geradas no seu caderno de desenho (blackbook) para ganhar memória muscular.
            </p>
          </div>
        </div>
      </div>

      {/* NEW Massive SEO Study Manual block for Letras em Grafite */}
      <div className="bg-slate-950 text-slate-300 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="font-sans font-black text-white text-base uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-5 h-5 text-pink-500" />
            Guia de Estudos e Caligrafia Urbana: Letras em Grafite
          </h3>
          <p className="text-[11px] text-slate-400 mt-1 font-semibold leading-relaxed">
            Aprenda a estruturar, desenhar e preencher suas próprias <strong>letras em grafite</strong> com nosso manual completo de caligrafia e arte de rua.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11.5px] leading-relaxed font-sans text-slate-400 font-semibold space-y-1 md:space-y-0">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wide font-mono">1. A Estrutura Básica das Letras em Grafite</h4>
              <p>
                Antes de tentar pintar styles complexos como Wildstyle ou 3D, todo artista de rua de sucesso precisa entender a estrutura esquelética das <strong>letras em grafite</strong>. 
                As <strong>letras em grafite</strong> nada mais são do que a distorção planejada de alfabetos tradicionais. Ao desenhar <strong>letras em grafite</strong>, você deve manter o esqueleto da letra centralizado e consistente, 
                adicionando peso, volume, dobras ou cortes sem perder a legibilidade primária. Dominar as <strong>letras em grafite</strong> básicas é o primeiro passo de qualquer graffiter profissional.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wide font-mono">2. O Fluxo e o Espaçamento em Letras em Grafite</h4>
              <p>
                Uma composição de <strong>letras em grafite</strong> bem resolvida não depende apenas de letras individuais, mas de como elas se conectam entre si. 
                O fluxo (flow) é o ritmo visual criado pela repetição de ângulos, inclinações e tamanhos consistentes através de todas as suas <strong>letras em grafite</strong>. 
                As conexões e sobreposições de suas <strong>letras em grafite</strong> precisam ser harmônicas: se a primeira letra se sobrepõe à segunda, a segunda deve preferencialmente sobrepor-se à terceira para criar uma sensação de profundidade homogênea em suas <strong>letras em grafite</strong>.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wide font-mono">3. Cores, Luz e Sombra em Letras em Grafite</h4>
              <p>
                O preenchimento tridimensional dá vida e destaque a qualquer design de <strong>letras em grafite</strong>. As <strong>letras em grafite</strong> ganham volume imediato quando adicionamos sombras projetadas (block 3D) ou sombras suaves (drop shadow). 
                Ao desenhar as sombras de suas <strong>letras em grafite</strong>, defina um ponto de luz imaginário (geralmente no canto superior esquerdo ou direito) e projete as linhas tridimensionais das <strong>letras em grafite</strong> na direção oposta. 
                Isso fará com que suas <strong>letras em grafite</strong> pareçam pular da superfície e flutuar com estilo tridimensional.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wide font-mono">4. Tipos e Estilos de Letras em Grafite Clássicos</h4>
              <p>
                Ao longo de cinco décadas de evolução da cultura hip-hop, vários estilos marcantes de <strong>letras em grafite</strong> surgiram globalmente. 
                As <strong>letras em grafite</strong> tipo Bubble (ou Bomba) focam em formas rápidas e infladas, ideais para pintura ágil em muros. 
                O Wildstyle combina <strong>letras em grafite</strong> complexas que se cruzam e desafiam a legibilidade do observador comum. 
                O Blockbuster foca em <strong>letras em grafite</strong> gigantes de formato quadrado, feitas com rolinhos de pintura para cobrir grandes áreas rapidamente. 
                Já as <strong>letras em grafite</strong> estilo Acid e 3D simulam relevos orgânicos, texturas líquidas e profundidades virtuais.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wide font-mono">5. Dicas para Treinar Caligrafia de Letras em Grafite</h4>
              <p>
                Praticar diariamente é o segredo para dominar a caligrafia de suas <strong>letras em grafite</strong>. Comece estudando o abecedário de <strong>letras em grafite</strong> completo de A a Z disponível em nosso catálogo interativo. 
                Copie cada caractere de <strong>letras em grafite</strong> no seu caderno de esboços, focando em manter os mesmos ângulos de inclinação. 
                À medida que ganhar confiança, tente mesclar as suas <strong>letras em grafite</strong> com setas, coroas ou pingos escorridos. 
                Com o tempo, você desenvolverá uma identidade artística única de <strong>letras em grafite</strong> reconhecida nas ruas e galerias.
              </p>
            </div>

            <div className="space-y-1.5 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <h4 className="text-[10.5px] font-black text-pink-500 uppercase tracking-widest font-mono">Resumo e Conclusão:</h4>
              <p className="text-[11px] text-slate-400">
                Seja você um fã de <strong>letras em grafite</strong> bubble bombing ou um mestre das complexas conexões wildstyle, nosso criador virtual de 
                <strong>letras em grafite</strong> é a ferramenta digital de design perfeita para planejar seus trabalhos urbanos, experimentar combinações ousadas de cores e exportar matrizes prontas de <strong>letras em grafite</strong> para stencil, adesivos ou murais espetaculares.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
