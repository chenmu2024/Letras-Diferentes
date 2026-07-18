import React from "react";
import { Sparkles, Heart, Compass, Shield, Users } from "lucide-react";

export default function SobreNos() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-xs text-[#4F46E5] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
          <span>Sobre o LetraDiferentes</span>
        </div>
        <h2 className="font-sans font-black text-3xl md:text-5xl text-[#0F172A] tracking-tight leading-tight">
          Nossa Missão: <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">Criatividade sem Limites</span>
        </h2>
        <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
          O <strong className="text-slate-800 font-semibold">letradiferentes.org</strong> é o maior e mais confiável portal de tipografias, geradores de fontes e ferramentas utilitárias do Brasil. Nossa plataforma nasceu para ajudar você a se expressar de forma única e estilosa na internet.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.01)] space-y-8">
        <div className="prose prose-slate max-w-none space-y-6 text-sm md:text-base text-slate-600 leading-relaxed">
          <p>
            Na era digital, a forma como nos comunicamos vai muito além das palavras que escolhemos. O estilo visual do nosso texto transmite personalidade, sentimentos e atitude. Seja para destacar sua biografia no Instagram, criar um apelido marcante no Free Fire, planejar uma tatuagem conceitual, criar um molde de letras para recorte ou aprender a linguagem de sinais (Libras), nós oferecemos a solução perfeita e instantânea.
          </p>
          <p>
            Acreditamos que a tecnologia deve ser acessível, intuitiva e, acima de tudo, limpa. É por isso que o <strong>letradiferentes.org</strong> é projetado como uma plataforma 100% gratuita, sem pop-ups invasivos e livre de anúncios irritantes que comprometem sua experiência de navegação.
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-[#4F46E5]">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-sans font-extrabold text-[#0F172A] text-sm md:text-base">100% Livre e Gratuito</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Todas as nossas ferramentas de estilo de letras, geradores de nicks e utilitários são gratuitos e sempre serão. Zero cobranças ocultas.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-sans font-extrabold text-[#0F172A] text-sm md:text-base">Foco na Privacidade</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Sua segurança é primordial. Processamos suas conversões de fontes e personalizações diretamente no seu navegador, sem coletar dados pessoais desnecessários.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-3">
            <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="font-sans font-extrabold text-[#0F172A] text-sm md:text-base">Módulos Inteligentes</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Cada ferramenta no portal é construída de maneira isolada e modular para garantir velocidade máxima de carregamento e compatibilidade total.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-3">
            <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-sans font-extrabold text-[#0F172A] text-sm md:text-base">Comunidade Criativa</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Atendemos mensalmente milhares de estudantes, gamers, criadores de conteúdo, designers e entusiastas que confiam no nosso padrão de excelência.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Board */}
      <div className="bg-gradient-to-tr from-[#0F172A] to-slate-900 rounded-3xl p-8 text-white text-center shadow-xl space-y-6">
        <h3 className="font-sans font-extrabold text-lg md:text-xl text-indigo-200">
          letradiferentes.org em Números
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 space-y-1">
            <div className="text-2xl md:text-3xl font-black text-white">10+</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">Ferramentas</div>
          </div>
          <div className="p-4 space-y-1">
            <div className="text-2xl md:text-3xl font-black text-white">100%</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">Seguro (SSL)</div>
          </div>
          <div className="p-4 space-y-1">
            <div className="text-2xl md:text-3xl font-black text-white">Zero</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">Anúncios</div>
          </div>
          <div className="p-4 space-y-1">
            <div className="text-2xl md:text-3xl font-black text-white">Instantâneo</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">Conversor</div>
          </div>
        </div>
      </div>
    </div>
  );
}
