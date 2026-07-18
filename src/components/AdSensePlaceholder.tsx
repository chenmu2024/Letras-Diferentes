import React from "react";
import { Info } from "lucide-react";

interface AdSensePlaceholderProps {
  slot?: string;
  className?: string;
}

export default function AdSensePlaceholder({ slot, className = "" }: AdSensePlaceholderProps) {
  return (
    <div className={`w-full max-w-4xl mx-auto my-6 p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 flex flex-col items-center justify-center text-center gap-1.5 transition-all select-none ${className}`}>
      <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
        <span>Anúncio / Publicidade</span>
        <span className="w-1 h-1 bg-slate-300 rounded-full" />
        <span className="hover:text-indigo-600 cursor-pointer flex items-center gap-0.5">
          <Info className="w-2.5 h-2.5" /> AdSense Slot
        </span>
      </div>
      <div className="text-[10px] text-slate-400 font-medium">
        {slot ? `Ad Unit [slot: ${slot}]` : "Espaço reservado para bloco de anúncios automáticos do Google AdSense."}
      </div>
    </div>
  );
}
