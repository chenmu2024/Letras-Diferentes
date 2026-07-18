import React, { useState } from "react";
import { Smartphone, CheckCircle, MessageSquare, Instagram, Shield, Award, Send } from "lucide-react";

interface SocialPreviewerProps {
  inputText: string;
  fontStyles: { name: string; result: string }[];
}

export default function SocialPreviewer({ inputText, fontStyles }: SocialPreviewerProps) {
  const [selectedStyleIndex, setSelectedStyleIndex] = useState<number>(0);
  const [activePlatform, setActivePlatform] = useState<"instagram" | "whatsapp" | "freefire" | "tiktok">("instagram");

  // Get current active styled text
  const currentText = fontStyles[selectedStyleIndex]?.result || inputText || "Seu Texto Estiloso";

  const platforms = [
    { id: "instagram", name: "Instagram Bio", icon: <Instagram className="w-4 h-4 text-pink-600" /> },
    { id: "whatsapp", name: "WhatsApp Chat", icon: <MessageSquare className="w-4 h-4 text-emerald-600" /> },
    { id: "freefire", name: "Free Fire Nick", icon: <Shield className="w-4 h-4 text-amber-500" /> },
    { id: "tiktok", name: "TikTok Profile", icon: <Smartphone className="w-4 h-4 text-black" /> },
  ] as const;

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full pointer-events-none" />

      {/* Header */}
      <div className="space-y-1.5 pb-4 border-b border-slate-100">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-100 bg-indigo-50/50 text-[10px] text-[#4F46E5] font-bold tracking-widest uppercase">
          Simulador de Visualização
        </div>
        <h3 className="font-sans font-black text-lg text-[#0F172A] uppercase tracking-tight flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-indigo-500" />
          Como fica nas Redes Sociais?
        </h3>
        <p className="text-xs text-slate-500 font-medium font-sans">
          Veja em tempo real como o seu texto ou nick personalizado vai aparecer nos seus perfis e jogos favoritos antes de colar!
        </p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4 md:col-span-1">
          {/* Style Selector */}
          <div className="space-y-2">
            <label className="text-[10px] font-extrabold text-[#0F172A] uppercase tracking-widest font-mono block">
              1. Escolha o Estilo de Letra:
            </label>
            <select
              value={selectedStyleIndex}
              onChange={(e) => setSelectedStyleIndex(Number(e.target.value))}
              className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-2.5 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-[#4F46E5] cursor-pointer"
            >
              {fontStyles.slice(0, 15).map((style, idx) => (
                <option key={idx} value={idx}>
                  {style.name}
                </option>
              ))}
            </select>
          </div>

          {/* Platform Switcher */}
          <div className="space-y-2">
            <label className="text-[10px] font-extrabold text-[#0F172A] uppercase tracking-widest font-mono block">
              2. Selecione a Plataforma:
            </label>
            <div className="flex flex-col gap-2">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setActivePlatform(platform.id)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    activePlatform === platform.id
                      ? "bg-indigo-50/50 border-[#4F46E5]/40 text-[#4F46E5] shadow-xs"
                      : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  {platform.icon}
                  <span>{platform.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Mockup Screen */}
        <div className="md:col-span-2 bg-[#F8FAFC] rounded-2xl border border-slate-200 p-5 flex items-center justify-center min-h-[260px]">
          {activePlatform === "instagram" && (
            <div className="w-full max-w-[320px] bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm font-sans text-xs">
              {/* Header Bar */}
              <div className="border-b border-slate-100 p-3 flex items-center justify-between font-bold">
                <span className="text-slate-800 flex items-center gap-1 text-[11px]">
                  _seu_perfil_
                  <CheckCircle className="w-3.5 h-3.5 fill-sky-500 text-white" />
                </span>
                <span className="text-slate-400">•••</span>
              </div>
              
              {/* Profile Main info */}
              <div className="p-3.5 space-y-4">
                <div className="flex items-center justify-between">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-slate-500 border border-white text-base">
                      👤
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex gap-4 text-center">
                    <div>
                      <div className="font-extrabold text-slate-800 text-[11px]">12</div>
                      <div className="text-[9px] text-slate-400 font-medium">Posts</div>
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-800 text-[11px]">8.5K</div>
                      <div className="text-[9px] text-slate-400 font-medium">Seguidores</div>
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-800 text-[11px]">421</div>
                      <div className="text-[9px] text-slate-400 font-medium">Seguindo</div>
                    </div>
                  </div>
                </div>

                {/* Profile Description */}
                <div className="space-y-1">
                  <div className="font-extrabold text-slate-800">Seu Nome Aqui</div>
                  <div className="text-slate-400 text-[10px]">Criador de conteúdo</div>
                  
                  {/* Inject User Custom Styled Text inside Bio! */}
                  <div className="text-slate-800 text-[11px] font-normal leading-relaxed whitespace-pre-wrap py-1.5 font-sans">
                    {currentText}
                  </div>

                  <div className="text-indigo-600 font-bold hover:underline">letradiferentes.org</div>
                </div>

                {/* Profile buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button className="bg-slate-100 hover:bg-slate-200 font-bold rounded-lg py-1.5 text-center text-slate-700 transition-colors">
                    Seguir
                  </button>
                  <button className="bg-slate-100 hover:bg-slate-200 font-bold rounded-lg py-1.5 text-center text-slate-700 transition-colors">
                    Mensagem
                  </button>
                </div>
              </div>
            </div>
          )}

          {activePlatform === "whatsapp" && (
            <div className="w-full max-w-[320px] bg-[#E5DDD5] border border-slate-300 rounded-3xl overflow-hidden shadow-sm font-sans text-xs">
              {/* Chat Header */}
              <div className="bg-[#075E54] text-white p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">
                    💬
                  </div>
                  <div>
                    <div className="font-bold">Letras Diferentes</div>
                    <div className="text-[9px] text-emerald-200">online</div>
                  </div>
                </div>
                <div className="flex gap-2.5 text-white/80 font-bold">
                  <span>📞</span>
                  <span>•••</span>
                </div>
              </div>

              {/* Chat Body */}
              <div className="p-3 space-y-3 min-h-[140px] flex flex-col justify-end">
                {/* Received Message */}
                <div className="bg-white p-2.5 rounded-xl rounded-tl-none max-w-[80%] shadow-xs text-slate-800 leading-normal self-start">
                  Qual estilo você mais gostou para a sua nova biografia ou nick de jogo?
                </div>

                {/* Sent Message (Styled Text output) */}
                <div className="bg-[#DCF8C6] p-2.5 rounded-xl rounded-tr-none max-w-[85%] shadow-xs text-slate-800 leading-normal self-end relative group">
                  <div className="font-normal whitespace-pre-wrap font-sans text-xs">
                    {currentText}
                  </div>
                  <span className="block text-[8px] text-slate-400 text-right mt-1">
                    15:15 ✓✓
                  </span>
                </div>
              </div>

              {/* Input field */}
              <div className="bg-slate-100 p-2 flex items-center gap-2 border-t border-slate-200">
                <input
                  type="text"
                  placeholder="Digite uma mensagem"
                  disabled
                  className="bg-white flex-1 rounded-full px-3 py-1.5 border border-slate-200 text-slate-400 text-[10px]"
                />
                <button className="w-7 h-7 rounded-full bg-[#128C7E] text-white flex items-center justify-center shrink-0">
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {activePlatform === "freefire" && (
            <div className="w-full max-w-[320px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md text-white font-mono text-[10px] relative p-4">
              {/* Outer Gaming Frame decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-amber-500/10 pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="font-bold tracking-wider text-amber-400">ESTILO LENDÁRIO</span>
                </div>
                <span className="text-[8px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30 font-black">
                  LEVEL 75
                </span>
              </div>

              <div className="space-y-4">
                {/* Character visual box */}
                <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-amber-500 p-0.5 shrink-0 flex items-center justify-center">
                    <span className="text-base">⚔️</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[8px] text-slate-500 uppercase tracking-widest font-black block">APELIDO ATUAL</span>
                    {/* The Free Fire Nick output inside nameplate */}
                    <span className="text-xs font-black text-white block truncate tracking-wide py-0.5 select-all font-sans">
                      {currentText}
                    </span>
                  </div>
                </div>

                {/* Team stats list */}
                <div className="grid grid-cols-2 gap-2 text-slate-400 text-[8px]">
                  <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-900 flex justify-between">
                    <span>Taxa de K/D:</span>
                    <strong className="text-emerald-400 font-bold">5.82</strong>
                  </div>
                  <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-900 flex justify-between">
                    <span>Partidas ganhas:</span>
                    <strong className="text-indigo-400 font-bold">428</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePlatform === "tiktok" && (
            <div className="w-full max-w-[320px] bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm font-sans text-xs">
              {/* Header */}
              <div className="border-b border-slate-100 p-3 text-center font-bold relative">
                <span className="text-slate-800 flex items-center justify-center gap-1">
                  @canal_criativo
                  <CheckCircle className="w-3.5 h-3.5 fill-cyan-400 text-white" />
                </span>
              </div>

              <div className="p-4 space-y-4 text-center">
                {/* Avatar */}
                <div className="relative inline-block">
                  <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-xl mx-auto shadow-xs">
                    🎨
                  </div>
                  <span className="absolute bottom-0 right-0 w-5 h-5 bg-pink-500 text-white font-bold rounded-full border-2 border-white flex items-center justify-center text-[10px]">
                    +
                  </span>
                </div>

                {/* Followers metrics */}
                <div className="flex justify-center gap-6 text-slate-800">
                  <div>
                    <div className="font-extrabold text-[12px]">28K</div>
                    <div className="text-[9px] text-slate-400 font-medium">Seguindo</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-[12px]">342.9K</div>
                    <div className="text-[9px] text-slate-400 font-medium">Seguidores</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-[12px]">2.5M</div>
                    <div className="text-[9px] text-slate-400 font-medium">Curtidas</div>
                  </div>
                </div>

                {/* Follow Button */}
                <div className="flex gap-2 justify-center">
                  <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-md px-8 py-1.5 text-center transition-colors">
                    Seguir
                  </button>
                  <button className="bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md px-3 py-1.5 transition-colors">
                    ✉
                  </button>
                </div>

                {/* Custom bio with our styled text */}
                <div className="space-y-1 py-1 px-2">
                  <p className="text-slate-700 text-[10.5px] font-normal leading-relaxed whitespace-pre-wrap font-sans">
                    {currentText}
                  </p>
                  <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                    🔗 <span>linktr.ee/seulink</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
