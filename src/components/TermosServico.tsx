import React from "react";
import { FileText, CheckCircle, Scale, ShieldAlert, Heart } from "lucide-react";

export default function TermosServico() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12 animate-fade-in">
      {/* Header Info */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-50 border border-violet-100 rounded-full text-xs text-violet-700 font-semibold">
          <FileText className="w-3.5 h-3.5 text-violet-600" />
          <span>Regras de Utilização</span>
        </div>
        <h2 className="font-sans font-black text-3xl md:text-5xl text-[#0F172A] tracking-tight leading-tight">
          Termos de <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Serviço</span>
        </h2>
        <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Estes termos regulam as condições gerais de acesso e uso do portal <strong className="text-slate-800">letradiferentes.org</strong> por qualquer visitante da nossa plataforma.
        </p>
      </div>

      {/* Main Content Body */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.01)] space-y-8 text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
        
        {/* Intro */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-black text-sm md:text-base border-b border-slate-100 pb-2">
            <Scale className="w-4 h-4 text-violet-600" />
            <h3>1. Aceitação dos Termos</h3>
          </div>
          <p>
            Ao acessar ou utilizar qualquer ferramenta, gerador de letras, utilitário ou tabela de referência integrada ao portal <strong>letradiferentes.org</strong>, você declara estar ciente e concordar integralmente com as condições estipuladas nestes Termos de Serviço. Se você não concorda com alguma destas condições, orientamos que interrompa imediatamente o uso do nosso site.
          </p>
        </div>

        {/* License */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-black text-sm md:text-base border-b border-slate-100 pb-2">
            <CheckCircle className="w-4 h-4 text-violet-600" />
            <h3>2. Licença de Uso do Conteúdo Gerado</h3>
          </div>
          <p>
            Todas as fontes personalizadas, letras e apelidos estilizados convertidos pelas nossas ferramentas de estilo são de uso livre e irrestrito. Você tem total autorização para:
          </p>
          <ul className="space-y-2 list-inside list-disc pl-2">
            <li>Copiar e colar os resultados em suas redes sociais (Instagram, TikTok, WhatsApp, Facebook, etc.).</li>
            <li>Utilizar os nicks e apelidos customizados em jogos online (Free Fire, PUBG, Fortnite, CS:GO, etc.).</li>
            <li>Salvar e compartilhar as ideias de tatuagens e grafites com seus tatuadores e artistas parceiros.</li>
            <li>Imprimir moldes de letras para uso escolar, artesanal ou educativo.</li>
          </ul>
          <p>
            O portal não cobra qualquer direito autoral sobre os outputs gerados pelos nossos conversores de texto, incentivando a livre criatividade dos nossos usuários.
          </p>
        </div>

        {/* Prohibited usage */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-black text-sm md:text-base border-b border-slate-100 pb-2">
            <ShieldAlert className="w-4 h-4 text-violet-600" />
            <h3>3. Conduta Proibida</h3>
          </div>
          <p>
            Os usuários comprometem-se a utilizar o <strong>letradiferentes.org</strong> de forma ética e legal. É terminantemente proibido:
          </p>
          <ul className="space-y-2 list-inside list-disc pl-2">
            <li>Utilizar bots, scripts automatizados ou scrapers para tentar extrair em massa o código-fonte ou listas integradas de dados da nossa plataforma.</li>
            <li>Tentar sobrecarregar os nossos servidores com ataques do tipo negação de serviço (DoS/DDoS).</li>
            <li>Inserir vírus, spywares ou scripts maliciosos nos formulários ou caixas de entrada do nosso portal.</li>
            <li>Usar o site para fins ilícitos, falsidade ideológica ou assédio através das mensagens enviadas pelos canais de contato.</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-black text-sm md:text-base border-b border-slate-100 pb-2">
            <ShieldAlert className="w-4 h-4 text-violet-600" />
            <h3>4. Isenção de Responsabilidade (Disclaimer)</h3>
          </div>
          <p>
            O <strong>letradiferentes.org</strong> fornece suas ferramentas gratuitas "no estado em que se encontram" (as is) e "conforme disponíveis" (as available), sem quaisquer garantias implícitas ou explícitas de funcionamento ininterrupto.
          </p>
          <p>
            Não nos responsabilizamos por perdas de dados decorrentes de caches corrompidos, incompatibilidades das fontes Unicode em determinados dispositivos móveis mais antigos, ou por desentendimentos relativos às respostas aceitas em partidas privadas do jogo do Stop/Adedanha. Nossas listas de referência são meramente consultivas e informativas.
          </p>
          <p className="pt-2 text-[11px] text-slate-500 italic">
            *Aviso sobre Marcas e Terceiros: Nomes de jogos e plataformas (como Free Fire, Garena, Instagram, Meta, TikTok, WhatsApp, Roblox, Apple, Google) são marcas registradas de seus respectivos proprietários. O letradiferentes.org é uma plataforma independente de tipografia digital e utilitários de texto, sem afiliação, patrocínio ou endosso oficial por parte de tais entidades.
          </p>
        </div>

        {/* Modifications */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-black text-sm md:text-base border-b border-slate-100 pb-2">
            <Heart className="w-4 h-4 text-violet-600" />
            <h3>5. Modificações e Melhorias</h3>
          </div>
          <p>
            Reservamo-nos o direito de, a qualquer momento, sem necessidade de aviso prévio, aprimorar, alterar ou descontinuar temporariamente qualquer uma das ferramentas do portal, visando sempre garantir a melhor qualidade técnica e a segurança operacional para nossa comunidade global de usuários.
          </p>
        </div>

        {/* Footer info within terms */}
        <div className="border-t border-slate-100 pt-6 text-slate-400 text-[11px] flex justify-between items-center">
          <span>Última atualização: Fevereiro de 2026</span>
          <span>letradiferentes.org</span>
        </div>

      </div>
    </div>
  );
}
