import React, { useState } from "react";
import { 
  Sparkles, 
  Info, 
  Heart, 
  HelpCircle, 
  BookOpen, 
  ShieldCheck, 
  UserCheck, 
  ExternalLink, 
  ChevronRight, 
  Tag, 
  ListOrdered,
  FileCheck,
  CheckCircle2
} from "lucide-react";

interface SeoContentProps {
  onNavigate?: (tabId: string) => void;
}

export default function SeoContent({ onNavigate }: SeoContentProps) {
  const [isTocOpen, setIsTocOpen] = useState(true);

  const tocItems = [
    { id: "o-que-sao", title: "1. O que são Letras Diferentes e Letra Diferentes?" },
    { id: "como-funciona-unicode", title: "2. Como funciona a Tecnologia Unicode?" },
    { id: "onde-usar-fontes", title: "3. Onde usar: Instagram, TikTok, WhatsApp e Free Fire" },
    { id: "guia-copiar-colar", title: "4. Passo a Passo: Como Copiar e Colar em 1 Segundo" },
    { id: "termos-mais-buscados", title: "5. Categorias e Ferramentas Relacionadas (Silo de Links)" },
    { id: "faq-geral", title: "6. Perguntas Frequentes (FAQ Oficial)" },
    { id: "equipe-editorial", title: "7. Revisão Editorial e Garantia E-E-A-T de Qualidade" },
  ];

  const internalLinks = [
    { name: "Nicks Free Fire & Símbolos ꧁ ꧂", tab: "ff-nicks", path: "/ff-nicks", tag: "Gaming" },
    { name: "Letras para Tatuagem & Caligrafia", tab: "tatuagem", path: "/tatuagem", tag: "Design" },
    { name: "Letras de Grafite Street Art", tab: "grafite", path: "/grafite", tag: "Arte" },
    { name: "Moldes de Letras para Imprimir A4", tab: "moldes", path: "/moldes", tag: "Escolar" },
    { name: "Letras Pequenas e Sobrescrito ˢᵒᵐᵉ", tab: "pequenas", path: "/pequenas", tag: "Bio" },
    { name: "Letras Maiúsculas e Minúsculas", tab: "maiusculas", path: "/maiusculas", tag: "Texto" },
    { name: "Alfabeto em Libras (Língua de Sinais)", tab: "libras", path: "/libras", tag: "Inclusão" },
    { name: "Solucionador de Termo & Wordle", tab: "termo-helper", path: "/termo-helper", tag: "Jogos" },
    { name: "Respostas Stop / Adedanha de A a Z", tab: "stop-respostas", path: "/stop-respostas", tag: "Dicionário" },
  ];

  const handleLinkClick = (e: React.MouseEvent, tab: string, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(tab);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleScrollToAnchor = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <article className="space-y-10 pt-12 border-t border-slate-200/80">
      {/* Intro block & Article Header */}
      <header className="space-y-3 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-100 bg-indigo-50/30 text-[10px] text-[#4F46E5] font-bold tracking-widest uppercase">
          Guia de Tipografia Digital
        </div>
        <h2 className="font-sans font-black text-2xl md:text-3xl text-[#0F172A] tracking-tight flex items-center gap-2 justify-center md:justify-start">
          <Sparkles className="w-6 h-6 text-[#4F46E5]" />
          Gerador de Letras Diferentes e Letra Diferentes Oficial
        </h2>
        <p className="text-xs md:text-sm text-slate-500 font-medium font-sans max-w-3xl leading-relaxed">
          Bem-vindo ao portal gratuito de <strong>letras diferentes</strong> e <strong>letra diferentes</strong>. O gerador oferece dezenas de estilos Unicode e decorações para copiar e testar em Instagram, TikTok, WhatsApp, Facebook, Free Fire e outros aplicativos, sem cadastro.
        </p>
      </header>

      {/* Table of Contents (Índice de Conteúdo Interativo para SEO & Sitelinks) */}
      <section 
        aria-label="Índice de Conteúdo"
        className="bg-indigo-50/40 border border-indigo-100/80 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-sans font-extrabold text-sm uppercase tracking-wider text-[#0F172A] flex items-center gap-2">
            <ListOrdered className="w-4.5 h-4.5 text-[#4F46E5]" />
            Índice de Conteúdo (Navegação Rápida)
          </h3>
          <button
            onClick={() => setIsTocOpen(!isTocOpen)}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-bold px-2 py-1 rounded-lg hover:bg-indigo-100/50 transition-colors"
          >
            {isTocOpen ? "Ocultar [-]" : "Expandir [+]"}
          </button>
        </div>

        {isTocOpen && (
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
            {tocItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollToAnchor(item.id)}
                className="text-left text-xs font-semibold text-slate-600 hover:text-[#4F46E5] hover:translate-x-1 transition-all py-1 px-2.5 rounded-lg hover:bg-white/80 flex items-center gap-2 group"
              >
                <ChevronRight className="w-3.5 h-3.5 text-indigo-400 group-hover:text-[#4F46E5] transition-colors flex-shrink-0" />
                <span className="truncate">{item.title}</span>
              </button>
            ))}
          </nav>
        )}
      </section>

      {/* Section 1: O que são */}
      <section id="o-que-sao" className="space-y-4">
        <h3 className="font-sans font-black text-lg text-[#0F172A] uppercase tracking-tight flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          1. O que são Letras Diferentes e Letra Diferentes?
        </h3>
        <p className="text-xs text-slate-600 font-sans leading-relaxed font-medium">
          O termo <strong>letras diferentes</strong> (frequentemente pesquisado no singular como <strong>letra diferentes</strong>) refere-se a caracteres de texto estilizados que utilizam símbolos especiais da tabela internacional <strong>Unicode</strong>. Diferente das fontes gráficas tradicionais (arquivos .TTF ou .OTF que exigem instalação no computador ou celular), as <strong>letras diferentes</strong> e <strong>letra diferentes</strong> geradas em nosso site são puramente código de texto.
        </p>
        <p className="text-xs text-slate-600 font-sans leading-relaxed font-medium">
          Isso significa que, quando você gera e copia uma palavra em <strong>letras diferentes</strong> ou <strong>letra diferentes</strong>, você pode colá-la em praticamente qualquer aplicativo moderno — incluindo a biografia do seu perfil no Instagram, mensagens do WhatsApp, legendas de vídeos no TikTok, nomes de personagens no Free Fire e publicações no Twitter (X) — sem que o estilo se perca.
        </p>
      </section>

      {/* Section 2: Unicode & Bento Grid */}
      <section id="como-funciona-unicode" className="space-y-4">
        <h3 className="font-sans font-black text-lg text-[#0F172A] uppercase tracking-tight flex items-center gap-2">
          <Info className="w-5 h-5 text-indigo-600" />
          2. Como funciona a Tecnologia Unicode nas Fontes Estilizadas?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 space-y-2.5 hover:shadow-md transition-all">
            <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center text-lg">
              🌐
            </div>
            <h4 className="font-sans font-bold text-xs text-[#0F172A] uppercase tracking-tight">
              Padrão Universal Unicode
            </h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              O padrão Unicode inclui blocos de caracteres matemáticos, alfabetos estilizados e inúmeros símbolos que podem ser combinados para criar <strong>letras diferentes</strong> sem instalar uma fonte no dispositivo.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 space-y-2.5 hover:shadow-md transition-all">
            <div className="w-9 h-9 bg-pink-50 rounded-xl flex items-center justify-center text-lg">
              ⚡
            </div>
            <h4 className="font-sans font-bold text-xs text-[#0F172A] uppercase tracking-tight">
              Mapeamento Instantâneo
            </h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Nosso conversor processa o texto inserido caractere por caractere no próprio navegador, substituindo as letras convencionais de A a Z por seus equivalentes artísticos em tempo real.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 space-y-2.5 hover:shadow-md transition-all">
            <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center text-lg">
              🔒
            </div>
            <h4 className="font-sans font-bold text-xs text-[#0F172A] uppercase tracking-tight">
              100% Seguro e Privado
            </h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Como o algoritmo opera inteiramente no lado do cliente (Client-Side), nenhuma mensagem digitada é transmitida ou gravada em servidores externos.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Onde Usar */}
      <section id="onde-usar-fontes" className="space-y-4">
        <h3 className="font-sans font-black text-lg text-[#0F172A] uppercase tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          3. Onde aplicar suas Letras Diferentes e Letra Diferentes?
        </h3>
        <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 md:p-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 font-medium leading-relaxed">
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Redes Sociais (Instagram, TikTok, WhatsApp)
              </h4>
              <p>
                As <strong>letras diferentes</strong> e <strong>letra diferentes</strong> são a forma número um de destacar biografias, stories, legendas de fotos e comentários. Um perfil com fontes elegantes em negrito ou itálico transmite autoridade, modernidade e cuidado visual para marcas e influenciadores digitais.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Jogos Competitivos (Free Fire, Roblox, LoL)
              </h4>
              <p>
                No universo gamer, um nick personalizado com <strong>letras diferentes</strong>, molduras (꧁ ꧂), raios (⚡) e espaços especiais pode ajudar a diferenciar o perfil. A compatibilidade depende das regras e da fonte usada por cada jogo integralmente nossos caracteres especiais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Passo a Passo */}
      <section id="guia-copiar-colar" className="space-y-4">
        <h3 className="font-sans font-black text-lg text-[#0F172A] uppercase tracking-tight flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-indigo-600" />
          4. Como Copiar e Colar Letras Diferentes em 3 Passos Simples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">1</div>
            <h4 className="font-bold text-slate-900">Digite seu texto</h4>
            <p className="text-slate-500">Escreva seu nome, frase ou apelido na caixa de texto no topo do gerador de <strong>letras diferentes</strong>.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">2</div>
            <h4 className="font-bold text-slate-900">Escolha o estilo</h4>
            <p className="text-slate-500">Navegue pelas centenas de fontes pré-renderizadas e clique no botão verde <strong>Copiar</strong> ao lado da sua preferida.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">3</div>
            <h4 className="font-bold text-slate-900">Cole onde quiser</h4>
            <p className="text-slate-500">Abra o seu aplicativo (Instagram, WhatsApp, Free Fire) e cole (Ctrl+V ou segure e toque em Colar) instantaneamente.</p>
          </div>
        </div>
      </section>

      {/* Section 5: Silo de Links Internos (Silo Structure & Internal Link Graph) */}
      <section id="termos-mais-buscados" className="space-y-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-100 bg-indigo-50/50 text-[10px] text-[#4F46E5] font-bold tracking-widest uppercase">
            <Tag className="w-3.5 h-3.5" /> Silo de Ferramentas &amp; Categorias
          </div>
          <h3 className="font-sans font-black text-lg text-[#0F172A] uppercase tracking-tight">
            5. Explore Nossas Ferramentas Especializadas de Tipografia
          </h3>
          <p className="text-xs text-slate-500">
            Acesse diretamente os módulos complementares do portal para atender cada uma das suas necessidades criativas:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {internalLinks.map((item) => (
            <a
              key={item.tab}
              href={item.path}
              onClick={(e) => handleLinkClick(e, item.tab, item.path)}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all group flex items-center justify-between"
            >
              <div className="space-y-0.5 min-w-0 pr-2">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{item.tag}</span>
                <h4 className="font-sans font-bold text-xs text-slate-800 group-hover:text-[#4F46E5] transition-colors truncate">
                  {item.name}
                </h4>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#4F46E5] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </a>
          ))}
        </div>
      </section>

      {/* Section 6: FAQ Geral */}
      <section id="faq-geral" className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
        <h3 className="font-sans font-black text-[#0F172A] text-base uppercase tracking-tight flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          6. Perguntas Frequentes sobre Letras Diferentes e Letra Diferentes (FAQ)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-slate-600 font-sans leading-relaxed font-medium">
          <div className="space-y-3.5">
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
              <h4 className="font-extrabold text-[#0F172A] text-xs">Por que algumas pessoas pesquisam por letra diferentes no singular?</h4>
              <p>Muitas vezes, ao buscar um estilo rápido para um único termo ou nick, os usuários digitam "<strong>letra diferentes</strong>" no singular no Google. Nosso portal é otimizado para responder perfeitamente tanto à pesquisa de "<strong>letras diferentes</strong>" quanto de "<strong>letra diferentes</strong>".</p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
              <h4 className="font-extrabold text-[#0F172A] text-xs">As fontes funcionam em todos os celulares?</h4>
              <p>Na maioria dos casos, sim. Os resultados usam caracteres Unicode, mas alguns símbolos podem aparecer de forma diferente ou não ser aceitos dependendo da fonte, versão do sistema, aplicativo ou jogo.</p>
            </div>
          </div>

          <div className="space-y-3.5">
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
              <h4 className="font-extrabold text-[#0F172A] text-xs">É seguro usar letras personalizadas em nicks de jogos?</h4>
              <p>Totalmente seguro. As <strong>letras diferentes</strong> e <strong>letra diferentes</strong> não são hacks ou scripts modificados. Tratam-se de caracteres de texto legítimos aceitos pelos servidores de jogos.</p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
              <h4 className="font-extrabold text-[#0F172A] text-xs">Posso usar as fontes geradas para fins comerciais?</h4>
              <p>Você pode copiar os caracteres gerados para bios, posts, catálogos e materiais informais. Para logotipos, marcas registradas ou materiais comerciais formais, confirme também as regras da plataforma e os direitos dos demais elementos usados no design.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: E-E-A-T Editorial Review & Author Trust Box */}
      <footer id="equipe-editorial" className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white space-y-5 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-indigo-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Garantia de Qualidade &amp; Padrão E-E-A-T
            </div>
            <h3 className="font-sans font-black text-lg text-white">
              Revisão Editorial por Especialistas em Tipografia Digital
            </h3>
          </div>
          <div className="px-3.5 py-1.5 bg-white/10 rounded-full text-[11px] font-mono text-indigo-200 border border-white/10">
            Atualizado em: Fevereiro de 2026
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed font-sans">
          <div className="space-y-2">
            <p>
              O conteúdo e os mapeamentos de caracteres do <strong>letradiferentes.org</strong> são mantidos e revisados conforme problemas são identificados. Os estilos usam Unicode sempre que aplicável, mas a aparência de cada glifo depende das fontes e do suporte de cada plataforma.
            </p>
            <p>
              Priorizamos os navegadores e dispositivos atuais nos testes de interface e corrigimos incompatibilidades reproduzíveis reportadas pelos usuários.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                ED
              </div>
              <div>
                <h4 className="font-bold text-white text-xs">Conselho Editorial de Tipografia</h4>
                <p className="text-[10px] text-indigo-300">Curadoria de Conteúdo e Manutenção Técnica</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 pt-1">
              Compromisso com a precisão dos dados, velocidade de carregamento e privacidade total do usuário.
            </p>
          </div>
        </div>
      </footer>
    </article>
  );
}
