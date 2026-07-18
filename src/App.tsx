import React, { useState, useEffect, useRef, useMemo, lazy, Suspense } from "react";
import AdSensePlaceholder from "./components/AdSensePlaceholder";
import CookieConsent from "./components/CookieConsent";

const GeradorLetras = lazy(() => import("./components/GeradorLetras"));
const LetrasTatuagem = lazy(() => import("./components/LetrasTatuagem"));
const LetrasGrafite = lazy(() => import("./components/LetrasGrafite"));
const LetrasPequenas = lazy(() => import("./components/LetrasPequenas"));
const MoldesLetras = lazy(() => import("./components/MoldesLetras"));
const NicksFreeFire = lazy(() => import("./components/NicksFreeFire"));
const LetrasMaiusculas = lazy(() => import("./components/LetrasMaiusculas"));
const LetrasLibras = lazy(() => import("./components/LetrasLibras"));
const TermoHelper = lazy(() => import("./components/TermoHelper"));
const StopRespostas = lazy(() => import("./components/StopRespostas"));
const SobreNos = lazy(() => import("./components/SobreNos"));
const Contato = lazy(() => import("./components/Contato"));
const PoliticaPrivacidade = lazy(() => import("./components/PoliticaPrivacidade"));
const TermosServico = lazy(() => import("./components/TermosServico"));

import {
  Sparkles,
  PenTool,
  Palette,
  Minimize2,
  Printer,
  Sword,
  AlignLeft,
  Eye,
  HelpCircle,
  Trophy,
  Bookmark,
  ChevronDown,
  Info,
  Search,
  X
} from "lucide-react";

type TabId =
  | "home"
  | "tatuagem"
  | "grafite"
  | "pequenas"
  | "moldes"
  | "ff-nicks"
  | "maiusculas"
  | "libras"
  | "termo-helper"
  | "stop-respostas"
  | "sobre"
  | "contato"
  | "privacidade"
  | "termos";

interface TabItem {
  id: TabId;
  label: string;
  sub: string;
  icon: React.ReactNode;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Synchronize tab selections with the URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        // Find if matches valid tab
        const validTabs: TabId[] = [
          "home",
          "tatuagem",
          "grafite",
          "pequenas",
          "moldes",
          "ff-nicks",
          "maiusculas",
          "libras",
          "termo-helper",
          "stop-respostas",
          "sobre",
          "contato",
          "privacidade",
          "termos"
        ];
        if (validTabs.includes(hash as TabId)) {
          setActiveTab(hash as TabId);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Trigger on mount

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Dropdown close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dynamic SEO Metadata and Schema.org JSON-LD Updates for AdSense and Google SEO
  useEffect(() => {
    const seoConfig: Record<TabId, { title: string; desc: string; schema: any }> = {
      home: {
        title: "Letras Diferentes - Gerador de Fontes e Letras Bonitas",
        desc: "O maior gerador de letras diferentes e bonitas online. Copie e cole dezenas de fontes elegantes no Instagram, TikTok, WhatsApp e mídias sociais.",
        schema: {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "LetraDiferentes",
          "url": "https://letradiferentes.org",
          "description": "O maior gerador de letras diferentes e bonitas online. Copie e cole dezenas de fontes elegantes no Instagram, TikTok, WhatsApp e mídias sociais.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "browserRequirements": "Requires JavaScript. Requires HTML5."
        }
      },
      tatuagem: {
        title: "Letras para Tatuagem - Gerador de Fontes de Tatuagem Grátis",
        desc: "Crie e visualize moldes de letras para tatuagem grátis. Escolha entre fontes góticas, cursivas e caligráficas para desenhar sua tattoo.",
        schema: {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Gerador de Letras para Tatuagem",
          "url": "https://letradiferentes.org/#tatuagem",
          "description": "Crie e visualize moldes de letras para tatuagem grátis. Escolha entre fontes góticas, cursivas e caligráficas para desenhar sua tattoo.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All"
        }
      },
      grafite: {
        title: "Letras de Grafite - Gerador de Letras Estilosas Online",
        desc: "Transforme seu texto em desenhos de letras de grafite de rua impressionantes. Ferramenta grátis para criar assinaturas visuais e artes urbanas.",
        schema: {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Gerador de Letras de Grafite",
          "url": "https://letradiferentes.org/#grafite",
          "description": "Transforme seu texto em desenhos de letras de grafite de rua impressionantes. Ferramenta grátis para criar assinaturas visuais e artes urbanas.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All"
        }
      },
      pequenas: {
        title: "Letras Pequenas (ˢᵘᵖᵉʳˢᶜʳᶦᵖᵗ / ₛᵤ₆ₛ꜀ᵣᵢₚₜ) - Copiar e Colar",
        desc: "Gerador de letras pequenas e miúdas para colocar no topo do nome ou perfil (subscrito e sobrescrito). Copie e cole grátis no Instagram e WhatsApp.",
        schema: {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Gerador de Letras Pequenas",
          "url": "https://letradiferentes.org/#pequenas",
          "description": "Gerador de letras pequenas e miúdas para colocar no topo do nome ou perfil (subscrito e sobrescrito). Copie e cole grátis no Instagram e WhatsApp.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All"
        }
      },
      moldes: {
        title: "Moldes de Letras para Imprimir e Recortar - Grátis",
        desc: "Gere moldes de letras grandes para painéis, cartazes, trabalhos escolares e artesanato. Customize a fonte e imprima em tamanho real.",
        schema: {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Gerador de Moldes de Letras",
          "url": "https://letradiferentes.org/#moldes",
          "description": "Gere moldes de letras grandes para painéis, cartazes, trabalhos escolares e artesanato. Customize a fonte e imprima em tamanho real.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All"
        }
      },
      "ff-nicks": {
        title: "Nicks Free Fire - Símbolos e Apelidos Personalizados FF",
        desc: "Crie nicks estilosos para Free Fire e outros jogos. Combine letras diferentes, símbolos especiais de asa, raio, cruz e espaços invisíveis.",
        schema: {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Gerador de Nicks Free Fire",
          "url": "https://letradiferentes.org/#ff-nicks",
          "description": "Crie nicks estilosos para Free Fire e outros jogos. Combine letras diferentes, símbolos especiais de asa, raio, cruz e espaços invisíveis.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All"
        }
      },
      maiusculas: {
        title: "Letras Maiúsculas e Minúsculas - Conversor de Texto Online",
        desc: "Converta seu texto para caixa alta, caixa baixa, alternada ou letras maiúsculas em segundos. Ideal para formatar títulos e parágrafos.",
        schema: {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Conversor de Letras Maiúsculas e Minúsculas",
          "url": "https://letradiferentes.org/#maiusculas",
          "description": "Converta seu texto para caixa alta, caixa baixa, alternada ou letras maiúsculas em segundos. Ideal para formatar títulos e parágrafos.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All"
        }
      },
      libras: {
        title: "Letras em Libras - Alfabeto Manual de Sinais",
        desc: "Aprenda e converta palavras para a Língua Brasileira de Sinais (Libras). Tabela visual completa do alfabeto de sinais para estudantes e educadores.",
        schema: {
          "@context": "https://schema.org",
          "@type": "EducationalApplication",
          "name": "Tradutor de Letras em Libras",
          "url": "https://letradiferentes.org/#libras",
          "description": "Aprenda e converta palavras para a Língua Brasileira de Sinais (Libras). Tabela visual completa do alfabeto de sinais para estudantes e educadores.",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "All"
        }
      },
      "termo-helper": {
        title: "Termo Helper - Solucionador e Dicas do Jogo Termo",
        desc: "Descubra as palavras possíveis para o jogo Termo, Contexto e Wordle. Filtre por letras certas, erradas e posições para vencer todas as rodadas.",
        schema: {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Termo Helper",
          "url": "https://letradiferentes.org/#termo-helper",
          "description": "Descubra as palavras possíveis para o jogo Termo, Contexto e Wordle. Filtre por letras certas, erradas e posições para vencer todas as rodadas.",
          "applicationCategory": "GameApplication",
          "operatingSystem": "All"
        }
      },
      "stop-respostas": {
        title: "Respostas do Stop/Adedanha - Dicionário de Palavras de A a Z",
        desc: "Consulte respostas válidas para todas as categorias do jogo do Stop ou Adedanha de A a Z. Melhore seu repertório e ganhe pontos extras.",
        schema: {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Dicionário de Respostas de Stop e Adedanha",
          "url": "https://letradiferentes.org/#stop-respostas",
          "description": "Consulte respostas válidas para todas as categorias do jogo do Stop ou Adedanha de A a Z. Melhore seu repertório e ganhe pontos extras.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All"
        }
      },
      sobre: {
        title: "Sobre Nós - LetraDiferentes (letradiferentes.org)",
        desc: "Conheça a história, missão e valores do portal LetraDiferentes.org, a maior plataforma gratuita de utilitários e geradores de fontes do Brasil.",
        schema: {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "Sobre Nós - LetraDiferentes",
          "url": "https://letradiferentes.org/#sobre"
        }
      },
      contato: {
        title: "Contato e Suporte - LetraDiferentes (letradiferentes.org)",
        desc: "Entre em contato conosco para enviar feedbacks, sugestões de fontes, reportar erros ou solicitar novas ferramentas no portal.",
        schema: {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Fale Conosco - LetraDiferentes",
          "url": "https://letradiferentes.org/#contato"
        }
      },
      privacidade: {
        title: "Política de Privacidade - LetraDiferentes",
        desc: "Leia nossa política de privacidade. Saiba como o letradiferentes.org garante a segurança, transparência e conformidade com a LGPD no uso local.",
        schema: {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Política de Privacidade - LetraDiferentes",
          "url": "https://letradiferentes.org/#privacidade"
        }
      },
      termos: {
        title: "Termos de Serviço - LetraDiferentes",
        desc: "Conheça as condições gerais de acesso e uso do letradiferentes.org. Licença gratuita e regras para cópia de fontes e nicks.",
        schema: {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Termos de Serviço - LetraDiferentes",
          "url": "https://letradiferentes.org/#termos"
        }
      }
    };

    const currentSeo = seoConfig[activeTab] || seoConfig.home;

    // 1. Update document title
    document.title = currentSeo.title;

    // 2. Update meta description dynamically
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", currentSeo.desc);

    // 3. Update JSON-LD structured data script
    let scriptTag = document.getElementById("seo-jsonld") as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "seo-jsonld";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(currentSeo.schema);

    // 4. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    const currentUrl = `https://letradiferentes.org/${activeTab === "home" ? "" : "#" + activeTab}`;
    canonicalLink.setAttribute("href", currentUrl);

    // 5. Update Open Graph and Twitter Card tags
    const ogTags: Record<string, string> = {
      "og:title": currentSeo.title,
      "og:description": currentSeo.desc,
      "og:url": currentUrl,
      "twitter:title": currentSeo.title,
      "twitter:description": currentSeo.desc,
      "twitter:url": currentUrl,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      const isTwitter = property.startsWith("twitter:");
      const selector = isTwitter ? `meta[name="${property}"]` : `meta[property="${property}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        if (isTwitter) {
          el.setAttribute("name", property);
        } else {
          el.setAttribute("property", property);
        }
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    });
  }, [activeTab]);

  // Update hash when tab state changes
  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    window.location.hash = tabId === "home" ? "" : tabId;
    setDropdownOpen(false);
    setSearchTerm("");
  };

  // Trigger floating notifications
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const tabs: TabItem[] = [
    {
      id: "home",
      label: "Gerador de Fontes",
      sub: "letras diferentes",
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      id: "tatuagem",
      label: "Letras para Tatuagem",
      sub: "letras para tatuagem",
      icon: <PenTool className="w-4 h-4" />
    },
    {
      id: "grafite",
      label: "Letras de Grafite",
      sub: "letras em grafite",
      icon: <Palette className="w-4 h-4" />
    },
    {
      id: "pequenas",
      label: "Letras Pequenas Nick",
      sub: "letras pequenas",
      icon: <Minimize2 className="w-4 h-4" />
    },
    {
      id: "moldes",
      label: "Moldes para Recorte",
      sub: "molde de letras",
      icon: <Printer className="w-4 h-4" />
    },
    {
      id: "ff-nicks",
      label: "Símbolos & Nicks FF",
      sub: "letras diferentes ff",
      icon: <Sword className="w-4 h-4" />
    },
    {
      id: "maiusculas",
      label: "Caixa Alta e Baixa",
      sub: "letra maiúscula",
      icon: <AlignLeft className="w-4 h-4" />
    },
    {
      id: "libras",
      label: "Alfabeto em Libras",
      sub: "letras em libras",
      icon: <Eye className="w-4 h-4" />
    },
    {
      id: "termo-helper",
      label: "Termo Wordle Helper",
      sub: "palavra com 5 letras",
      icon: <HelpCircle className="w-4 h-4" />
    },
    {
      id: "stop-respostas",
      label: "Respostas Jogo Stop",
      sub: "fruta com a letra s",
      icon: <Trophy className="w-4 h-4" />
    }
  ];

  // Filter tools based on search term
  const filteredTabs = useMemo(() => {
    if (!searchTerm.trim()) return tabs;
    return tabs.filter(
      (tab) =>
        tab.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tab.sub.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, tabs]);

  const activeTabItem = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="min-h-screen bg-[#FBFBFE] text-[#0F172A] font-sans antialiased flex flex-col relative selection:bg-indigo-500/10 selection:text-indigo-900">
      {/* Premium dynamic gradient background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-300/10 to-violet-300/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-pink-200/10 to-indigo-300/5 rounded-full blur-3xl" />
      </div>

      {/* Floating global glass notification toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A]/95 text-white backdrop-blur-md font-sans text-xs px-4.5 py-3.5 rounded-2xl shadow-xl border border-white/10 flex items-center gap-2.5 animate-fade-in">
          <div className="w-5 h-5 bg-indigo-500/20 rounded-lg flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-[#818CF8]" />
          </div>
          <span className="font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* TOP GLASS HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-slate-200/50 shadow-[0_2px_15px_-3px_rgba(15,23,42,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Name (letradiferentes.org) */}
            <div 
              className="flex items-center gap-3.5 cursor-pointer select-none group"
              onClick={() => handleTabChange("home")}
            >
              <div className="relative">
                <div className="w-11 h-11 bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-600 rounded-xl flex items-center justify-center text-white font-extrabold shadow-lg shadow-indigo-500/15 group-hover:scale-[1.05] group-hover:rotate-1 transition-all duration-300 ring-2 ring-indigo-50">
                  <span className="text-xs tracking-tighter uppercase font-black font-sans bg-clip-text text-transparent bg-gradient-to-b from-white to-indigo-50">
                    LD
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-xs">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-sans font-black text-[#0F172A] text-lg tracking-tight group-hover:text-indigo-600 transition-colors leading-none">
                    LetraDiferentes
                  </h1>
                  <span className="bg-gradient-to-r from-pink-500 to-violet-600 text-white text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md leading-none shadow-xs">
                    ORG
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono mt-1">
                  letradiferentes.org
                </span>
              </div>
            </div>

            {/* Header Menu dropdown & Actions */}
            <div className="flex items-center gap-3">
              {/* Info pill about free tools */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-50/50 border border-indigo-100/60 rounded-full text-[11px] text-[#4F46E5] font-semibold font-sans tracking-wide">
                <span className="inline-block w-1.5 h-1.5 bg-[#4F46E5] rounded-full animate-ping" />
                <span>Ferramentas 100% Gratuitas</span>
              </div>

              {/* Premium Searchable Tools Dropdown Selector */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 px-4.5 py-3 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl text-xs font-bold border border-[#E2E8F0] transition-all cursor-pointer shadow-xs focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                  aria-label="Selecionar ferramenta"
                >
                  <span className="text-[#4F46E5] shrink-0 bg-indigo-50 p-1 rounded-lg">{activeTabItem.icon}</span>
                  <span className="uppercase tracking-wider hidden sm:inline-block sm:w-[210px] text-left truncate">
                    Seletor: <strong className="text-[#4F46E5] font-extrabold">{activeTabItem.label}</strong>
                  </span>
                  <span className="uppercase tracking-wider inline-block sm:hidden w-[65px] text-left truncate text-[#4F46E5]">
                    {activeTabItem.label.split(" ")[0]}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Options */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-76 md:w-84 bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl z-50 py-3.5 animate-fade-in max-h-[85vh] flex flex-col">
                    <div className="px-4.5 pb-3 mb-2.5 border-b border-slate-100">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#4F46E5] block mb-2.5">
                        Navegar pelas Ferramentas
                      </span>
                      {/* Search box within dropdown */}
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Buscar ferramenta pelo nome..."
                          className="w-full pl-8.5 pr-7 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white text-slate-800 transition-all"
                          onClick={(e) => e.stopPropagation()}
                        />
                        {searchTerm && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSearchTerm("");
                            }}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-0.5 px-2 overflow-y-auto max-h-[48vh] scrollbar-thin">
                      {filteredTabs.length > 0 ? (
                        filteredTabs.map((tab) => {
                          const isActive = activeTab === tab.id;
                          return (
                            <button
                              key={tab.id}
                              onClick={() => {
                                handleTabChange(tab.id);
                              }}
                              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                                isActive
                                  ? "bg-indigo-50/80 text-[#4F46E5]"
                                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`p-2 rounded-lg transition-colors ${isActive ? "bg-[#4F46E5] text-white" : "bg-slate-100 text-slate-400"}`}>
                                  {tab.icon}
                                </span>
                                <div>
                                  <div className="text-xs font-bold leading-tight">{tab.label}</div>
                                  <div className="text-[9.5px] font-mono italic text-slate-400 mt-0.5">{tab.sub}</div>
                                </div>
                              </div>
                              {isActive && (
                                <div className="w-2 h-2 bg-[#4F46E5] rounded-full mr-2" />
                              )}
                            </button>
                          );
                        })
                      ) : (
                        <div className="text-center py-8 text-xs text-slate-400 font-sans">
                          Nenhuma ferramenta encontrada.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* QUICK ACCESS HORIZONTAL BAR - Premium Carousel Vibe */}
        <div className="border-t border-slate-200/40 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar scroll-smooth">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 border ${
                      isActive
                        ? "bg-[#4F46E5] text-white border-[#4F46E5] shadow-sm shadow-indigo-500/10"
                        : "text-slate-600 hover:bg-white hover:text-[#0F172A] bg-transparent border-transparent hover:border-slate-200"
                    }`}
                  >
                    <span className={`transition-all ${isActive ? "text-white scale-110" : "text-slate-400 group-hover:text-slate-600"}`}>
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* ISOLATED COMPONENT WRAPPER */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-6xl mx-auto w-full">
        {/* Isolated Active Tab Indicator Badge (Proves they do not interact) */}
        {activeTab !== "home" && !["sobre", "contato", "privacidade", "termos"].includes(activeTab) && (
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50/50 border border-emerald-100 rounded-2xl px-5 py-3.5 animate-fade-in">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div className="font-sans">
                <div className="text-xs font-bold text-emerald-950">Módulo Independente &amp; Isolado</div>
                <div className="text-[11px] text-emerald-700/80 mt-0.5">As alterações nesta ferramenta não afetam nenhuma outra funcionalidade do portal.</div>
              </div>
            </div>
            <button
              onClick={() => handleTabChange("home")}
              className="text-[11px] font-bold text-[#4F46E5] hover:text-[#3B34B3] flex items-center gap-1 bg-white hover:bg-indigo-50/50 border border-indigo-100 px-3 py-1.5 rounded-xl transition-all self-start sm:self-center cursor-pointer font-sans"
            >
              ← Ver Índice Geral
            </button>
          </div>
        )}

        {/* Isolated content view rendering based on tabId */}
        <div className="animate-fade-in transition-all duration-300">
          <Suspense fallback={
            <div className="min-h-[350px] flex flex-col items-center justify-center text-slate-400 gap-3 py-16">
              <div className="w-8 h-8 border-3 border-indigo-500/10 border-t-indigo-600 rounded-full animate-spin" />
              <span className="font-mono text-xs tracking-wider uppercase font-semibold">Carregando módulo...</span>
            </div>
          }>
            {activeTab === "home" && <GeradorLetras onNotify={triggerToast} onNavigate={handleTabChange} />}
            {activeTab === "tatuagem" && <LetrasTatuagem onNotify={triggerToast} />}
            {activeTab === "grafite" && <LetrasGrafite onNotify={triggerToast} />}
            {activeTab === "pequenas" && <LetrasPequenas onNotify={triggerToast} />}
            {activeTab === "moldes" && <MoldesLetras onNotify={triggerToast} />}
            {activeTab === "ff-nicks" && <NicksFreeFire onNotify={triggerToast} />}
            {activeTab === "maiusculas" && <LetrasMaiusculas onNotify={triggerToast} />}
            {activeTab === "libras" && <LetrasLibras onNotify={triggerToast} />}
            {activeTab === "termo-helper" && <TermoHelper onNotify={triggerToast} />}
            {activeTab === "stop-respostas" && <StopRespostas onNotify={triggerToast} />}
            {activeTab === "sobre" && <SobreNos />}
            {activeTab === "contato" && <Contato onNotify={triggerToast} />}
            {activeTab === "privacidade" && <PoliticaPrivacidade />}
            {activeTab === "termos" && <TermosServico />}
          </Suspense>
        </div>

        {/* Global Responsive AdSense Display Unit placeholder */}
        <AdSensePlaceholder slot="letras-home-bottom-responsive" className="mt-12" />
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/50 bg-white/70 backdrop-blur-sm py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-tr from-indigo-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
                <span className="text-xs">LD</span>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">letradiferentes.org</div>
                <div className="text-xs text-slate-400">O maior e mais seguro portal de tipografias e geradores do Brasil.</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#4F46E5] bg-indigo-50/50 border border-indigo-100/60 rounded-full px-4.5 py-2 font-semibold">
              <Bookmark className="w-3.5 h-3.5" />
              <span>DICA: Pressione <kbd className="bg-white border border-indigo-200 px-1.5 py-0.5 rounded shadow-xs text-[10px]">Ctrl + D</kbd> para favoritar!</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} LetraDiferentes (letradiferentes.org) • Ferramentas de Estilo 100% Modulares &amp; Seguras.</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-400">
              <span className="hover:text-indigo-600 transition-colors cursor-pointer" onClick={() => handleTabChange("home")}>Início</span>
              <span className="text-slate-200">•</span>
              <span className="hover:text-indigo-600 transition-colors cursor-pointer" onClick={() => handleTabChange("sobre")}>Sobre Nós</span>
              <span className="text-slate-200">•</span>
              <span className="hover:text-indigo-600 transition-colors cursor-pointer" onClick={() => handleTabChange("contato")}>Contato</span>
              <span className="text-slate-200">•</span>
              <span className="hover:text-indigo-600 transition-colors cursor-pointer" onClick={() => handleTabChange("privacidade")}>Política de Privacidade</span>
              <span className="text-slate-200">•</span>
              <span className="hover:text-indigo-600 transition-colors cursor-pointer" onClick={() => handleTabChange("termos")}>Termos de Serviço</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Cookie Consent / GDPR banner */}
      <CookieConsent />
    </div>
  );
}

