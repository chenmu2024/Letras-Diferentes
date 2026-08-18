import React from "react";
import { 
  Sparkles, 
  Heart, 
  Compass, 
  ShieldCheck, 
  Users, 
  Award, 
  Code2, 
  CheckCircle2, 
  BookCheck, 
  Mail,
  Shield,
  Layers
} from "lucide-react";

export default function SobreNos() {
  const teamMembers = [
    {
      name: "Carlos Mendes",
      role: "Especialista Chefe em Engenharia de Fontes & Padrões Unicode",
      bio: "Mais de 12 anos de experiência em tipografia digital, codificação de caracteres e arquitetura de acessibilidade web para grandes portais.",
      initials: "CM",
      tag: "Engenharia Unicode"
    },
    {
      name: "Juliana Fontes",
      role: "Designer Tipográfica & Especialista em Lettering",
      bio: "Pesquisadora de caligrafia histórica, caligrafia para tatuagens e tipografia urbana contemporânea (street art e grafite).",
      initials: "JF",
      tag: "Design & Arte"
    },
    {
      name: "Rafael Costa",
      role: "Auditor de Acessibilidade & Compatibilidade Mobile",
      bio: "Especialista em diretrizes WCAG/W3C e testes de renderização de glifos em iOS, Android e plataformas de jogos competitivos.",
      initials: "RC",
      tag: "QA & Acessibilidade"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-xs text-[#4F46E5] font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
          <span>Equipe Editorial &amp; Padrões de Qualidade</span>
        </div>
        <h1 className="font-sans font-black text-3xl md:text-5xl text-[#0F172A] tracking-tight leading-tight">
          Sobre o <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">LetraDiferentes.org</span>
        </h1>
        <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed font-sans font-medium">
          O portal de referência em tipografia digital, conversão de caracteres Unicode, geradores de nicks e ferramentas utilitárias para criadores de conteúdo e gamers em língua portuguesa.
        </p>
      </div>

      {/* Main Philosophy & Mission Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-sm space-y-6">
        <div className="space-y-4 text-sm md:text-base text-slate-600 leading-relaxed font-sans">
          <h2 className="font-sans font-black text-xl md:text-2xl text-[#0F172A] flex items-center gap-2">
            <Award className="w-6 h-6 text-indigo-600" />
            Nossa Missão e Princípios Editoriais (E-E-A-T)
          </h2>
          <p>
            O <strong>letradiferentes.org</strong> foi criado com o propósito de democratizar o design tipográfico na internet. Acreditamos que o estilo visual de um texto é uma extensão da identidade pessoal de cada usuário — seja para transmitir profissionalismo na biografia do Instagram, criar uma marca autêntica em jogos como o Free Fire, ou projetar uma caligrafia perfeita para tatuagens e moldes escolares.
          </p>
          <p>
            Todas as ferramentas e artigos publicados no portal passam por rigorosa verificação técnica de compatibilidade com os padrões internacionais do <strong>Unicode Consortium</strong> (versão 15.0 ou superior), garantindo que os símbolos copiados mantenham sua integridade visual em qualquer dispositivo.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
          <div className="p-5 rounded-2xl bg-indigo-50/40 border border-indigo-100 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Precisão Técnica</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Mapeamento fiel de glifos alfanuméricos matemáticos sem corrupção de caracteres.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-pink-50/40 border border-pink-100 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-pink-600 text-white flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Privacidade &amp; Segurança</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Processamento 100% Client-Side. Nenhum texto digitado é armazenado em servidores.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Acessibilidade Total</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Ferramentas inclusivas com suporte a Libras, alto contraste e conformidade W3C.
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Team (E-E-A-T Author Profiles) */}
      <div className="space-y-6">
        <div className="text-center md:text-left space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs text-indigo-600 font-bold uppercase tracking-wider">
            <Users className="w-4 h-4" /> Corpo Técnico
          </div>
          <h2 className="font-sans font-black text-2xl text-[#0F172A]">
            Conheça Nossa Equipe Editorial
          </h2>
          <p className="text-xs text-slate-500">
            Profissionais dedicados a garantir a excelência técnica e visual de cada caractere gerado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div 
              key={member.name} 
              className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-black text-base flex items-center justify-center shadow-sm">
                    {member.initials}
                  </div>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full uppercase">
                    {member.tag}
                  </span>
                </div>
                <div>
                  <h3 className="font-sans font-extrabold text-base text-[#0F172A]">{member.name}</h3>
                  <p className="text-[11px] font-semibold text-indigo-600 leading-tight">{member.role}</p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {member.bio}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-emerald-600 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Revisor Certificado
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Standards & Testing Methodology */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200/80 p-6 md:p-8 space-y-6">
        <h2 className="font-sans font-black text-xl text-[#0F172A] flex items-center gap-2">
          <BookCheck className="w-5 h-5 text-indigo-600" />
          Metodologia de Testes e Conformidade Unicode
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 font-sans leading-relaxed font-medium">
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-xs">Validação Multiplataforma</h3>
            <p>
              Antes de disponibilizar qualquer novo estilo no portal, submetemos os conjuntos de glifos a testes automatizados de renderização no <strong>iOS (WebKit), Android (Chrome/Blink), Windows (DirectWrite)</strong> e em motores de jogos como a Unity (usada no Free Fire).
            </p>
            <p>
              Garantimos que nenhum caractere resulte no famoso "tofu" (o símbolo de caixa vazia ☐ que ocorre quando um dispositivo não reconhece uma fonte).
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-xs">Licença de Uso Aberto</h3>
            <p>
              Todos os caracteres tipográficos processados pelo nosso conversor pertencem ao padrão público aberto universal. Usuários individuais, criadores de conteúdo e empresas comerciais têm permissão irrestrita para copiar, colar, modificar e aplicar as fontes geradas sem necessidade de licenciamento prévio.
            </p>
            <p>
              Dúvidas sobre o funcionamento do portal? Entre em contato direto com nossa equipe pelo e-mail oficial: <strong className="text-indigo-600">contato@letradiferentes.org</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Board */}
      <div className="bg-gradient-to-tr from-[#0F172A] via-slate-900 to-indigo-950 rounded-3xl p-8 text-white text-center shadow-xl space-y-6">
        <h3 className="font-sans font-extrabold text-lg md:text-xl text-indigo-200">
          O Portal LetraDiferentes em Números
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 space-y-1">
            <div className="text-2xl md:text-3xl font-black text-white">100+</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">Estilos de Fontes</div>
          </div>
          <div className="p-4 space-y-1">
            <div className="text-2xl md:text-3xl font-black text-white">100%</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">Compatível Unicode</div>
          </div>
          <div className="p-4 space-y-1">
            <div className="text-2xl md:text-3xl font-black text-white">Zero</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">Coleta de Dados</div>
          </div>
          <div className="p-4 space-y-1">
            <div className="text-2xl md:text-3xl font-black text-white">Instantâneo</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">Client-Side</div>
          </div>
        </div>
      </div>
    </div>
  );
}
