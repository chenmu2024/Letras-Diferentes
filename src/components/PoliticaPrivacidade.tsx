import React from "react";
import { Shield, Eye, Lock, FileText, Check } from "lucide-react";

export default function PoliticaPrivacidade() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12 animate-fade-in">
      {/* Header Info */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-xs text-emerald-700 font-semibold">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>Segurança &amp; Transparência</span>
        </div>
        <h1 className="font-sans font-black text-3xl md:text-5xl text-[#0F172A] tracking-tight leading-tight">
          Política de <span className="bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">Privacidade</span>
        </h1>
        <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Esta política descreve as diretrizes de privacidade adotadas pelo portal <strong className="text-slate-800">letradiferentes.org</strong> para assegurar uma navegação transparente, amigável e segura.
        </p>
      </div>

      {/* Main content body */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.01)] space-y-8 text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
        
        {/* Intro */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-black text-sm md:text-base border-b border-slate-100 pb-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            <h3>1. Compromisso com a Privacidade</h3>
          </div>
          <p>
            No <strong>letradiferentes.org</strong>, valorizamos a sua privacidade e estamos firmemente comprometidos em proteger as informações dos nossos visitantes. Coletamos e processamos o mínimo possível de dados necessários para garantir o funcionamento correto e otimizado do nosso portal de utilitários, conversores de tipografia, moldes de letras e solucionadores de jogos.
          </p>
          <p>
            Esta política está em total conformidade com a <strong>LGPD (Lei Geral de Proteção de Dados - Lei nº 13.709/18)</strong> do Brasil e com as diretrizes internacionais de melhores práticas de segurança na internet.
          </p>
        </div>

        {/* Client-side processing */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-black text-sm md:text-base border-b border-slate-100 pb-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <h3>2. Processamento Local (Client-Side)</h3>
          </div>
          <p>
            A grande maioria das ferramentas disponibilizadas no <strong>letradiferentes.org</strong> (geradores de letras estilosas, gerador de apelidos/nicks de Free Fire, inversores de caixa alta/baixa, tabelas de alfabeto em libras, etc.) opera exclusivamente de forma <strong>local (no navegador do próprio usuário)</strong>.
          </p>
          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4.5 text-slate-500 space-y-2">
            <p className="font-extrabold text-[#0F172A] flex items-center gap-1.5">
              <span>🛡️</span> O que isso significa para sua segurança?
            </p>
            <p className="text-[11px] md:text-xs">
              Os textos que você insere nos campos de conversão de fonte, palavras digitadas no verificador de Termo ou listas de adedanha não são enviados aos nossos servidores e nem armazenados por nós de nenhuma forma. O processamento ocorre em tempo real usando a capacidade de renderização do seu próprio dispositivo, garantindo total anonimato de uso.
            </p>
          </div>
        </div>

        {/* Collected data */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-black text-sm md:text-base border-b border-slate-100 pb-2">
            <Eye className="w-4 h-4 text-emerald-600" />
            <h3>3. Coleta de Informações Ativas</h3>
          </div>
          <p>
            A única situação em que coletamos dados fornecidos voluntariamente por você é através do nosso <strong>Formulário de Contato</strong>:
          </p>
          <ul className="space-y-2 list-inside list-disc pl-2">
            <li><strong>Nome completo:</strong> Utilizado para identificar você na resposta do e-mail.</li>
            <li><strong>E-mail:</strong> Usado unicamente para responder a sua mensagem.</li>
            <li><strong>Conteúdo da mensagem:</strong> Para analisar a sugestão, bug reportado ou dúvida.</li>
          </ul>
          <p>
            Estes dados de contato jamais serão comercializados, alugados ou compartilhados com terceiros sob qualquer pretexto. Eles servem unicamente para comunicação direta entre você e a administração do <strong>letradiferentes.org</strong>.
          </p>
        </div>

        {/* Cookies policy */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-black text-sm md:text-base border-b border-slate-100 pb-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <h3>4. Política de Cookies e Armazenamento Local</h3>
          </div>
          <p>
            Nosso portal pode utilizar ferramentas de <code>localStorage</code> do seu navegador para salvar suas preferências locais (como fontes favoritadas, pontuações de jogo ou configurações de layout), evitando que você precise redefinir essas opções cada vez que acessa o site.
          </p>
          <p>
            Não utilizamos cookies de rastreamento invasivo ou de terceiros para publicidade direcionada. Nosso portal é livre de publicidade externa de redes de anúncios, garantindo uma navegação limpa, segura e extremamente rápida.
          </p>
        </div>

        {/* Rights */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-black text-sm md:text-base border-b border-slate-100 pb-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <h3>5. Seus Direitos de Usuário</h3>
          </div>
          <p>
            Como usuário, você tem pleno direito de:
          </p>
          <ul className="space-y-2 list-inside list-disc pl-2">
            <li>Limpar o cache do seu navegador e as informações locais armazenadas pelo nosso site a qualquer momento.</li>
            <li>Solicitar a exclusão definitiva de quaisquer dados de mensagens trocadas por e-mail através do canal <code>contato@letradiferentes.org</code>.</li>
            <li>Navegar anonimamente de forma irrestrita por todas as seções e utilitários.</li>
          </ul>
        </div>

        {/* Footer info within privacy policy */}
        <div className="border-t border-slate-100 pt-6 text-slate-400 text-[11px] flex justify-between items-center">
          <span>Última atualização: Julho de 2026</span>
          <span>letradiferentes.org</span>
        </div>

      </div>
    </div>
  );
}
