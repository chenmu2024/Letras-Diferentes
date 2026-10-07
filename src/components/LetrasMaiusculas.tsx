import React, { useState, useMemo } from "react";
import { 
  Copy, 
  Check, 
  Trash2, 
  AlignLeft, 
  BarChart2, 
  Search, 
  ArrowLeftRight, 
  Download, 
  Clipboard, 
  FileText, 
  RefreshCw, 
  Upload, 
  BookOpen, 
  Volume2, 
  Sparkles
} from "lucide-react";

interface LetrasMaiusculasProps {
  onNotify: (message: string) => void;
}

export default function LetrasMaiusculas({ onNotify }: LetrasMaiusculasProps) {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  // Search and Replace state
  const [searchWord, setSearchWord] = useState("");
  const [replaceWord, setReplaceWord] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);

  // Prefix & Suffix state
  const [prefixValue, setPrefixValue] = useState("");
  const [suffixValue, setSuffixValue] = useState("");

  const handleCopy = () => {
    if (!text.trim()) {
      onNotify("O texto está vazio! ⚠️");
      return;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    onNotify("Texto formatado copiado com sucesso! 📋");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
    onNotify("Área de texto limpa.");
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      onNotify("Texto colado da área de transferência! 📋");
    } catch (err) {
      onNotify("Não foi possível ler a área de transferência automaticamente. Cole usando Ctrl+V! ⚠️");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        setText(result);
        onNotify(`Arquivo "${file.name}" importado com sucesso! 📄`);
      }
    };
    reader.readAsText(file);
  };

  const handleDownloadFile = () => {
    if (!text.trim()) {
      onNotify("Não há texto para baixar! ⚠️");
      return;
    }
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "texto_formatado.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    onNotify("Seu texto foi baixado como arquivo .txt! 💾");
  };

  // Convert operations
  const convertToUpperCase = () => {
    setText(text.toUpperCase());
    onNotify("Convertido para CAIXA ALTA ⬆️");
  };

  const convertToLowerCase = () => {
    setText(text.toLowerCase());
    onNotify("Convertido para caixa baixa ⬇️");
  };

  const convertToSentenceCase = () => {
    // Uppercase first letter of each sentence
    const converted = text
      .toLowerCase()
      .replace(/(^\s*|[.!?]\s+)([a-zà-ÿ])/g, (m, p1, p2) => p1 + p2.toUpperCase());
    setText(converted);
    onNotify("Convertido para Início de Frase 📖");
  };

  const convertToTitleCase = () => {
    // Capitalize first letter of each word
    const converted = text
      .toLowerCase()
      .split(" ")
      .map((word) => {
        if (word.length === 0) return "";
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
    setText(converted);
    onNotify("Convertido para Primeira Letra Maiúscula 📝");
  };

  const convertToAlternatingCase = () => {
    const converted = text
      .split("")
      .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
      .join("");
    setText(converted);
    onNotify("Alternado aLtErNaDo! 🤪");
  };

  const convertToInverseCase = () => {
    const converted = text
      .split("")
      .map((char) => {
        if (char === char.toUpperCase()) return char.toLowerCase();
        return char.toUpperCase();
      })
      .join("");
    setText(converted);
    onNotify("Capitalização invertida com sucesso! 🔄");
  };

  // Modern Casing (Camel, Pascal, Snake, Kebab)
  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const convertToCamelCase = () => {
    const cleaned = removeAccents(text.toLowerCase())
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .split(/\s+/);
    
    if (cleaned.length === 0 || cleaned[0] === "") return;
    
    const converted = cleaned[0] + cleaned.slice(1)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
    
    setText(converted);
    onNotify("Convertido para camelCase 🐫");
  };

  const convertToPascalCase = () => {
    const cleaned = removeAccents(text.toLowerCase())
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .split(/\s+/);
    
    const converted = cleaned
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
    
    setText(converted);
    onNotify("Convertido para PascalCase 🏔️");
  };

  const convertToSnakeCase = () => {
    const converted = removeAccents(text.toLowerCase())
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "_");
    setText(converted);
    onNotify("Convertido para snake_case 🐍");
  };

  const convertToKebabCase = () => {
    const converted = removeAccents(text.toLowerCase())
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    setText(converted);
    onNotify("Convertido para kebab-case / slug-url 🍢");
  };

  // Surgical Cleaners
  const handleStripExtraSpaces = () => {
    const cleaned = text.replace(/ +/g, " ").trim();
    setText(cleaned);
    onNotify("Espaços extras removidos com sucesso! ✨");
  };

  const handleRemoveLineBreaks = () => {
    const cleaned = text.replace(/[\r\n]+/g, " ");
    setText(cleaned);
    onNotify("Quebras de linha removidas! 📏");
  };

  const handleRemoveEmptyLines = () => {
    const cleaned = text
      .split(/\r?\n/)
      .filter((line) => line.trim() !== "")
      .join("\n");
    setText(cleaned);
    onNotify("Linhas em branco descartadas! 🗑️");
  };

  const handleReverseText = () => {
    const reversed = text.split("").reverse().join("");
    setText(reversed);
    onNotify("Texto invertido de trás para frente! 🔄");
  };

  const handleStripAccentsOnly = () => {
    setText(removeAccents(text));
    onNotify("Todos os acentos gráficos foram removidos! 🧹");
  };

  // Prefix & Suffix Appender
  const handleAddPrefixAndSuffix = () => {
    if (!prefixValue && !suffixValue) {
      onNotify("Insira um prefixo ou sufixo para aplicar! ⚠️");
      return;
    }
    const lines = text.split(/\r?\n/);
    const updated = lines.map(line => `${prefixValue}${line}${suffixValue}`).join("\n");
    setText(updated);
    onNotify("Prefixo/Sufixo injetado em todas as linhas! 📝");
  };

  // Search and Replace Handler
  const handleSearchAndReplace = () => {
    if (!searchWord) {
      onNotify("Digite a palavra a ser localizada! ⚠️");
      return;
    }

    let updatedText = "";
    if (caseSensitive) {
      // Direct replace
      updatedText = text.split(searchWord).join(replaceWord);
    } else {
      // Case-insensitive regex match
      const escaped = searchWord.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      const regex = new RegExp(escaped, "gi");
      updatedText = text.replace(regex, replaceWord);
    }

    setText(updatedText);
    onNotify(`Substituído todas as ocorrências de "${searchWord}" por "${replaceWord}"! 🔍`);
  };

  // Live Statistics calculation
  const stats = useMemo(() => {
    const charCount = text.length;
    const charNoSpace = text.replace(/\s/g, "").length;
    const lineCount = text === "" ? 0 : text.split(/\r?\n/).length;
    
    const wordsArray = text.trim() === "" ? [] : text.trim().split(/[\s\r\n]+/);
    const wordCount = wordsArray.length;
    
    const sentenceCount = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    // Read/Speak times (WPM averages)
    const readTimeSec = Math.ceil((wordCount / 200) * 60);
    const speakTimeSec = Math.ceil((wordCount / 130) * 60);

    const formatTime = (seconds: number) => {
      if (seconds < 60) return `${seconds}s`;
      const min = Math.floor(seconds / 60);
      const sec = seconds % 60;
      return `${min}m ${sec}s`;
    };

    // Keyword & Word Density Analysis (excluding trivial common words in PT)
    const stopWords = new Set([
      "o", "a", "os", "as", "um", "uma", "uns", "umas", "de", "do", "da", "dos", "das", "em", "no", "na", "nos", "nas",
      "e", "ou", "mas", "que", "para", "com", "por", "sem", "sob", "se", "como", "esta", "este", "isto", "daqui", "isso",
      "é", "são", "foi", "foram", "era", "ser", "ter", "uma", "ele", "ela", "eles", "elas", "me", "te", "se", "lhe", "nos"
    ]);

    const wordFreq: { [key: string]: number } = {};
    wordsArray.forEach((w) => {
      const cleanWord = w.toLowerCase().replace(/[^a-zA-Z0-9á-ÿÁ-Ÿ]/g, "");
      if (cleanWord.length > 1 && !stopWords.has(cleanWord)) {
        wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
      }
    });

    const topWords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, freq]) => ({
        word,
        freq,
        density: wordCount > 0 ? ((freq / wordCount) * 100).toFixed(1) : "0"
      }));

    return {
      characters: charCount,
      charactersNoSpace: charNoSpace,
      words: wordCount,
      sentences: sentenceCount,
      lines: lineCount,
      readingTime: formatTime(readTimeSec),
      speakingTime: formatTime(speakTimeSec),
      topWords
    };
  }, [text]);

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div className="text-center md:text-left space-y-3.5 border-b border-slate-200/60 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/50 text-[11px] text-[#4F46E5] font-semibold tracking-wider uppercase">
          <AlignLeft className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
          <span>Conversor Profissional de Letras Maiúsculas e Letra Maiúscula</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
          Letras <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-violet-600">Maiúsculas</span> &amp; Minúsculas
        </h1>
        <p className="text-xs md:text-sm text-slate-500 max-w-2xl leading-relaxed font-semibold">
          Ferramenta avançada de <strong>letra maiúscula</strong> para formatar, limpar e converter textos instantaneamente. Mude para <strong>letras maiúsculas</strong> de forma simples, altere capitalizações de frases para <strong>letra maiúscula</strong>, limpe linhas ou analise métricas de <strong>letras maiúsculas</strong> em tempo real de forma totalmente segura.
        </p>
      </div>

      {/* Main Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Editor Board */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
            
            {/* Header controls inside text area */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs border-b border-slate-100 pb-4">
              <label className="font-black text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <FileText className="w-4 h-4 text-indigo-500" />
                Área de Letra Maiúscula e Letras Maiúsculas
              </label>
              
              <div className="flex flex-wrap items-center gap-2">
                {/* Custom File Upload */}
                <label className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Importar .txt</span>
                  <input
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={handleDownloadFile}
                  disabled={!text}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 disabled:opacity-50 disabled:hover:bg-slate-100 disabled:hover:text-slate-700 font-bold rounded-lg transition-all cursor-pointer"
                  title="Baixar como arquivo de texto"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exportar</span>
                </button>

                <button
                  onClick={handlePaste}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg transition-all cursor-pointer"
                  title="Colar do Clipboard"
                >
                  <Clipboard className="w-3.5 h-3.5" />
                  <span>Colar</span>
                </button>

                <button
                  onClick={handleClear}
                  disabled={!text}
                  className="p-1.5 text-slate-400 hover:text-red-600 disabled:opacity-30 rounded transition-all cursor-pointer"
                  title="Limpar Área de Texto"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Main Textarea */}
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Cole ou escreva seu texto aqui para converter em letra maiúscula, alterar capitalizações de letras maiúsculas, localizar termos de letra maiúscula ou analisar métricas..."
                rows={11}
                className="w-full bg-[#F8FAFC]/50 border border-[#E2E8F0] rounded-2xl px-4 py-4 text-[#0F172A] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/15 focus:border-[#4F46E5] focus:bg-white transition-all resize-y leading-relaxed font-medium"
              />
              {text.length === 0 && (
                <div className="absolute right-3 bottom-3 flex items-center gap-1 text-[10px] text-slate-400 font-mono font-bold">
                  <span>Pronto para formatar letra maiúscula</span>
                  <Sparkles className="w-3 h-3 text-indigo-400 animate-spin" />
                </div>
              )}
            </div>

            {/* Case Formatting Grid */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                Selecione a Letra Maiúscula ou Minúscula Desejada:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <button
                  onClick={convertToUpperCase}
                  title="Converter todo o texto para letra maiúscula"
                  className="px-3 py-3 bg-[#4F46E5] hover:bg-[#4F46E5]/90 text-white rounded-xl text-xs font-black tracking-wider transition-all cursor-pointer shadow-sm shadow-indigo-500/10 uppercase"
                >
                  Letra Maiúscula
                </button>
                <button
                  onClick={convertToLowerCase}
                  title="Converter tudo removendo a letra maiúscula"
                  className="px-3 py-3 bg-slate-50 hover:bg-slate-100 text-[#0F172A] rounded-xl text-xs font-bold tracking-wider transition-all border border-[#E2E8F0] cursor-pointer"
                >
                  Minúsculas
                </button>
                <button
                  onClick={convertToTitleCase}
                  title="Primeira letra maiúscula em cada palavra"
                  className="px-3 py-3 bg-slate-50 hover:bg-slate-100 text-[#0F172A] rounded-xl text-xs font-bold tracking-wider transition-all border border-[#E2E8F0] cursor-pointer"
                >
                  Início Maiúsculo
                </button>
                <button
                  onClick={convertToSentenceCase}
                  title="Início de frase com letra maiúscula"
                  className="px-3 py-3 bg-slate-50 hover:bg-slate-100 text-[#0F172A] rounded-xl text-xs font-bold tracking-wider transition-all border border-[#E2E8F0] cursor-pointer"
                >
                  Frase Maiúscula
                </button>
                <button
                  onClick={convertToAlternatingCase}
                  title="Mesclar letra maiúscula e minúscula"
                  className="px-3 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold tracking-wider transition-all border border-[#E2E8F0] cursor-pointer"
                >
                  aLtErNaDo
                </button>
              </div>

              {/* Advanced Programming & Text formats */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                <button
                  onClick={convertToInverseCase}
                  title="Inverte de letra maiúscula para minúscula e vice-versa"
                  className="px-3 py-2.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 rounded-xl text-xs font-bold transition-all border border-[#E2E8F0] cursor-pointer"
                >
                  Inverter Caixa
                </button>
                <button
                  onClick={convertToCamelCase}
                  className="px-3 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold font-mono transition-all border border-[#E2E8F0] cursor-pointer"
                >
                  camelCase
                </button>
                <button
                  onClick={convertToPascalCase}
                  className="px-3 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold font-mono transition-all border border-[#E2E8F0] cursor-pointer"
                >
                  PascalCase
                </button>
                <button
                  onClick={convertToSnakeCase}
                  className="px-3 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold font-mono transition-all border border-[#E2E8F0] cursor-pointer"
                >
                  snake_case
                </button>
                <button
                  onClick={convertToKebabCase}
                  className="px-3 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold font-mono transition-all border border-[#E2E8F0] cursor-pointer"
                >
                  kebab-case
                </button>
              </div>
            </div>
          </div>

          {/* Cleaners & Prefix Utilities Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
            <h3 className="font-display text-sm font-bold text-[#0F172A] uppercase tracking-wider border-b border-slate-100 pb-3 font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Oficina de Limpeza de Letras Maiúsculas e Inserção de Linhas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Line Actions */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                  Remoções e Limpezas Rápidas:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleStripExtraSpaces}
                    className="px-3 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-all cursor-pointer"
                  >
                    🧹 Limpar Espaços Duplos
                  </button>
                  <button
                    onClick={handleRemoveEmptyLines}
                    className="px-3 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-all cursor-pointer"
                  >
                    🗑️ Excluir Linhas Vazias
                  </button>
                  <button
                    onClick={handleRemoveLineBreaks}
                    className="px-3 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-all cursor-pointer"
                  >
                    📏 Remover Quebras
                  </button>
                  <button
                    onClick={handleStripAccentsOnly}
                    className="px-3 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-all cursor-pointer"
                  >
                    ✨ Remover Acentos
                  </button>
                </div>
                <button
                  onClick={handleReverseText}
                  className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl border border-slate-200 transition-all cursor-pointer"
                >
                  🔄 Inverter Texto Inteiro (Espelho)
                </button>
              </div>

              {/* Right Column: Prefix / Suffix Appender */}
              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 space-y-3">
                <span className="text-[10px] font-black text-slate-700 tracking-wider block font-mono uppercase">
                  Prefixo e Sufixo em Letras Maiúsculas:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 block mb-1">Prefixo (Início):</label>
                    <input
                      type="text"
                      value={prefixValue}
                      onChange={(e) => setPrefixValue(e.target.value)}
                      placeholder="Ex: - "
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-400 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 block mb-1">Sufixo (Fim):</label>
                    <input
                      type="text"
                      value={suffixValue}
                      onChange={(e) => setSuffixValue(e.target.value)}
                      placeholder="Ex: ;"
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-400 font-mono"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddPrefixAndSuffix}
                  className="w-full py-2 bg-[#0F172A] hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Injetar em Todas as Linhas
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tools and Statistics Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Main Action Hub */}
          <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 text-white rounded-3xl p-6 shadow-md border border-indigo-800 space-y-4">
            <h3 className="font-display text-xs font-bold text-indigo-300 uppercase tracking-wider border-b border-indigo-800/60 pb-2 font-mono flex items-center gap-1.5">
              <Clipboard className="w-4 h-4 text-indigo-400" />
              Finalizar Letras Maiúsculas
            </h3>
            
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-pink-500/20 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4.5 h-4.5 animate-bounce" />
                  COPIADO COM SUCESSO!
                </>
              ) : (
                <>
                  <Copy className="w-4.5 h-4.5" />
                  COPIAR LETRAS MAIÚSCULAS
                </>
              )}
            </button>
            <p className="text-[10px] text-indigo-200 font-medium text-center leading-relaxed">
              Clique para salvar o texto em <strong>letras maiúsculas</strong> pronto em sua área de transferência para colar no Word, Docs, Redes Sociais ou WhatsApp!
            </p>
          </div>

          {/* Interactive Search and Replace Module */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs space-y-4">
            <h3 className="font-display text-xs font-bold text-[#0F172A] uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5 font-mono">
              <ArrowLeftRight className="w-4 h-4 text-indigo-500" />
              Localizar &amp; Substituir Letra Maiúscula
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Localizar Termo:</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                    placeholder="Palavra ou caractere..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:bg-white rounded-xl pl-8 pr-3 py-2 text-xs focus:outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Substituir Por:</label>
                <input
                  type="text"
                  value={replaceWord}
                  onChange={(e) => setReplaceWord(e.target.value)}
                  placeholder="Nova palavra..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:bg-white rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-600 pb-1">
                <input
                  type="checkbox"
                  id="caseSensitiveCheck"
                  checked={caseSensitive}
                  onChange={(e) => setCaseSensitive(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 cursor-pointer"
                />
                <label htmlFor="caseSensitiveCheck" className="cursor-pointer select-none font-medium">
                  Diferenciar Letra Maiúscula
                </label>
              </div>

              <button
                onClick={handleSearchAndReplace}
                className="w-full py-2 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Substituir Tudo
              </button>
            </div>
          </div>

          {/* Live Statistics & Analysis */}
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-5 shadow-xs space-y-4">
            <h3 className="font-display text-xs font-bold text-[#0F172A] uppercase tracking-wider border-b border-[#E2E8F0] pb-2 flex items-center gap-1 font-mono">
              <BarChart2 className="w-4 h-4 text-indigo-500" />
              Estatísticas de Letra Maiúscula
            </h3>
            
            <div className="grid grid-cols-2 gap-2.5 text-xs font-semibold">
              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                <div className="text-slate-400 font-bold font-mono text-[9px] uppercase tracking-wider">Caracteres</div>
                <div className="text-base font-black text-[#0F172A] font-mono mt-0.5">{stats.characters}</div>
              </div>
              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                <div className="text-slate-400 font-bold font-mono text-[9px] uppercase tracking-wider">Sem Espaço</div>
                <div className="text-base font-black text-[#0F172A] font-mono mt-0.5">{stats.charactersNoSpace}</div>
              </div>
              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                <div className="text-slate-400 font-bold font-mono text-[9px] uppercase tracking-wider">Palavras</div>
                <div className="text-base font-black text-[#0F172A] font-mono mt-0.5">{stats.words}</div>
              </div>
              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                <div className="text-slate-400 font-bold font-mono text-[9px] uppercase tracking-wider">Frases / Linhas</div>
                <div className="text-base font-black text-[#0F172A] font-mono mt-0.5">{stats.sentences} / {stats.lines}</div>
              </div>
            </div>

            {/* Read & Speak estimations */}
            <div className="border-t border-slate-100 pt-3.5 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-500 font-semibold">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-400" /> Tempo de Leitura Silenciosa:
                </span>
                <span className="font-mono text-slate-800 font-bold">{stats.readingTime}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-indigo-400" /> Tempo de Discurso Falado:
                </span>
                <span className="font-mono text-slate-800 font-bold">{stats.speakingTime}</span>
              </div>
            </div>

            {/* Density analysis list */}
            {stats.topWords.length > 0 && (
              <div className="border-t border-slate-100 pt-3.5 space-y-2.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                  Densidade de Palavras Relevantes:
                </span>
                <div className="space-y-1.5">
                  {stats.topWords.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span className="truncate max-w-[120px] font-mono">"{item.word}"</span>
                        <span className="text-slate-400 font-mono text-[10px]">{item.freq}x ({item.density}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                        <div 
                          className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${Math.min(parseFloat(item.density) * 3, 100)}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic educational guidelines on grammatical rules */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h3 className="font-display text-lg font-black text-[#0F172A] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            Regras de Uso: Letra Maiúscula &amp; Letras Maiúsculas na Língua Portuguesa
          </h3>
          <p className="text-xs text-slate-400 font-semibold">
            Entenda as regras ortográficas oficiais do Acordo Ortográfico para o uso correto de <strong>letra maiúscula</strong> e a aplicação adequada de <strong>letras maiúsculas</strong> no seu dia a dia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 leading-relaxed font-semibold">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <h4 className="font-black text-slate-800 text-sm">✓ Quando utilizar Letra Maiúscula obrigatoriamente?</h4>
              <p className="text-slate-500 font-medium">
                A <strong>letra maiúscula</strong> deve ser utilizada no início de períodos, frases ou parágrafos após pontos finais (.), de interrogação (?) ou de exclamação (!). Também é obrigatório usar <strong>letra maiúscula</strong> em nomes próprios, apelidos de pessoas, instituições oficiais, nomes de planetas, corpos celestes e períodos históricos de grande relevância. O uso consistente de <strong>letra maiúscula</strong> garante uma boa legibilidade e correção formal do texto.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-black text-slate-800 text-sm">✓ Uso de Letras Maiúsculas em Títulos de Obras</h4>
              <p className="text-slate-500 font-medium">
                Pelo Acordo Ortográfico vigente, apenas a primeira palavra de um título precisa obrigatoriamente de <strong>letra maiúscula</strong> (por exemplo: "Cem anos de solidão"), a menos que as demais palavras exijam <strong>letra maiúscula</strong> por serem nomes próprios. No entanto, para fins estéticos ou publicitários, muitas pessoas preferem converter todas as palavras para começar com <strong>letra maiúscula</strong>, o que confere um destaque maior no design do título.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-black text-slate-800 text-sm">✓ Como converter textos para Letras Maiúsculas?</h4>
              <p className="text-slate-500 font-medium">
                Para transformar blocos inteiros em <strong>letras maiúsculas</strong>, utilize o nosso botão de conversão rápida. Essa funcionalidade altera cada caractere minúsculo para seu equivalente em <strong>letras maiúsculas</strong>, mantendo os acentos perfeitamente configurados. A padronização em <strong>letras maiúsculas</strong> é ideal para destacar avisos importantes, criar cabeçalhos chamativos ou formatar dados específicos em planilhas eletrônicas.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <h4 className="font-black text-slate-800 text-sm">✗ Quando NÃO utilizar Letra Maiúscula?</h4>
              <p className="text-slate-500 font-medium">
                Não se deve usar <strong>letra maiúscula</strong> em dias da semana, meses do ano, estações do ano e pontos cardeais (a menos que indiquem grandes regiões, como o Sul do país). Palavras de ligação, como preposições no meio de títulos, também devem evitar a <strong>letra maiúscula</strong>. Manter esses elements em minúsculas realça o uso legítimo de <strong>letra maiúscula</strong> em outros pontos essenciais da estrutura textual.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-black text-slate-800 text-sm">✓ Estilo Alternado e Conversor de Letras Maiúsculas</h4>
              <p className="text-slate-500 font-medium">
                No desenvolvimento de softwares e bancos de dados, os formatos de código preferem evitar espaços. Em vez disso, usam variações que intercalam <strong>letra maiúscula</strong> e minúscula (como <code className="font-mono bg-slate-200 px-1 rounded text-pink-600">camelCase</code> ou <code className="font-mono bg-slate-200 px-1 rounded text-pink-600">PascalCase</code>). Nosso conversor de <strong>letras maiúsculas</strong> possui algoritmos que facilitam a criação dessas variáveis para desenvolvedores que necessitam de <strong>letras maiúsculas</strong> e minúsculas controladas.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-black text-slate-800 text-sm">✓ Benefícios de padronizar com Letras Maiúsculas</h4>
              <p className="text-slate-500 font-medium">
                Padronizar seu texto com a aplicação exata de <strong>letra maiúscula</strong> e <strong>letras maiúsculas</strong> eleva o nível profissional de seus relatórios, e-mails comerciais ou redações acadêmicas. Nosso site foi feito para ser a sua oficina definitiva de conversão para <strong>letras maiúsculas</strong>, garantindo máxima precisão gramatical em apenas alguns milissegundos. Experimente os diferentes estilos de <strong>letra maiúscula</strong> e simplifique sua digitação diária!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
