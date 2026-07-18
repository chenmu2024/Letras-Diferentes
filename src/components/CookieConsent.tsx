import React, { useState, useEffect } from "react";
import { Shield, X, Check, ArrowRight } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("letras-cookie-consent");
    if (!consent) {
      // Show after a small delay for premium feels
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("letras-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleRefuse = () => {
    localStorage.setItem("letras-cookie-consent", "refused");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200 p-5 md:p-6 shadow-[0_15px_50px_-15px_rgba(15,23,42,0.15)] flex flex-col gap-4 animate-fade-in">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-[#4F46E5] shrink-0">
          <Shield className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-sans font-black text-[#0F172A] text-sm leading-tight">
            Nós valorizamos sua privacidade
          </h4>
          <p className="text-[11px] md:text-xs text-slate-500 font-medium leading-relaxed">
            O <strong>letradiferentes.org</strong> utiliza cookies e tecnologias locais (como localStorage) para otimizar o carregamento de ferramentas, memorizar suas preferências e, eventualmente, exibir anúncios personalizados compatíveis com o Google AdSense.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2.5 pt-1.5 border-t border-slate-100">
        <button
          onClick={handleRefuse}
          className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-[10.5px] md:text-xs font-bold transition-all cursor-pointer"
        >
          Recusar
        </button>
        <button
          onClick={handleAcceptAll}
          className="flex items-center gap-1 px-4.5 py-2.5 bg-[#4F46E5] hover:bg-[#3B34B3] text-white rounded-xl text-[10.5px] md:text-xs font-black transition-all cursor-pointer shadow-md shadow-indigo-500/10"
        >
          <span>Aceitar Todos</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
