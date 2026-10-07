import React, { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle, HelpCircle, Bug, Heart, Share2 } from "lucide-react";

export default function Contato({ onNotify }: { onNotify: (msg: string) => void }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "feedback",
    mensagem: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nome.trim()) newErrors.nome = "Por favor, insira seu nome.";
    if (!formData.email.trim()) {
      newErrors.email = "Por favor, insira seu e-mail.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Por favor, insira um e-mail válido.";
    }
    if (!formData.mensagem.trim()) newErrors.mensagem = "Por favor, digite sua mensagem.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subjectLabels: Record<string, string> = {
      feedback: "Feedback geral",
      bug: "Relato de bug",
      sugestao: "Sugestão de nova fonte ou ferramenta",
      parceria: "Parcerias e anúncios",
      outros: "Outros assuntos",
    };

    const subject = `[LetraDiferentes] ${subjectLabels[formData.assunto] || "Contato"}`;
    const body = [
      `Nome: ${formData.nome}`,
      `E-mail para resposta: ${formData.email}`,
      "",
      formData.mensagem,
    ].join("\n");

    const mailtoUrl = `mailto:contato@letradiferentes.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
    onNotify("Seu aplicativo de e-mail foi aberto para concluir o envio.");
  };

  const handleReset = () => {
    setFormData({
      nome: "",
      email: "",
      assunto: "feedback",
      mensagem: "",
    });
    setSubmitted(false);
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12 animate-fade-in">
      {/* Header Info */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-xs text-[#4F46E5] font-semibold">
          <Mail className="w-3.5 h-3.5 text-[#4F46E5]" />
          <span>Fale Conosco</span>
        </div>
        <h2 className="font-sans font-black text-3xl md:text-5xl text-[#0F172A] tracking-tight leading-tight">
          Tem alguma <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">Dúvida ou Sugestão?</span>
        </h2>
        <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Queremos ouvir você! Envie suas sugestões de novas fontes, reporte bugs ou compartilhe suas ideias para melhorar o <strong className="text-slate-800">letradiferentes.org</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Info Blocks */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
            <h3 className="font-sans font-black text-base text-[#0F172A] border-b border-slate-100 pb-3">
              Canais de Atendimento
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3.5">
                <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center text-[#4F46E5] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">E-mail Direto</div>
                  <a href="mailto:contato@letradiferentes.org" className="text-sm font-extrabold text-[#4F46E5] hover:underline break-all mt-0.5 block">
                    contato@letradiferentes.org
                  </a>
                  <p className="text-[11px] text-slate-400 mt-1">Envie sua mensagem diretamente para este endereço.</p>
                </div>
              </div>

              <div className="flex gap-3.5">
                <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Suporte ao Usuário</div>
                  <div className="text-sm font-extrabold text-slate-800 mt-0.5">
                    100% Online e Aberto
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Envie sugestões de novos alfabetos, símbolos e jogos.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ / Helper */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 space-y-4">
            <h4 className="font-sans font-extrabold text-[#0F172A] text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span>💡</span> Dicas Úteis
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 shrink-0">•</span>
                <span>Se você encontrou um erro no gerador, mencione seu navegador e dispositivo.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 shrink-0">•</span>
                <span>Novos símbolos para o Free Fire podem ser adicionados mediante solicitações da comunidade.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 shrink-0">•</span>
                <span>Para parcerias ou divulgação institucional, selecione o assunto correspondente no formulário.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nome */}
                <div className="space-y-1.5">
                  <label htmlFor="nome" className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                    Seu Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Digite seu nome completo"
                    className={`w-full px-4 py-3 bg-slate-50/50 border rounded-2xl text-xs md:text-sm focus:outline-none focus:ring-4 focus:bg-white text-slate-800 transition-all ${
                      errors.nome ? "border-red-300 focus:ring-red-500/10" : "border-slate-200/80 focus:ring-indigo-500/10"
                    }`}
                  />
                  {errors.nome && <p className="text-[11px] text-red-500 font-medium">{errors.nome}</p>}
                </div>

                {/* E-mail */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                    Seu E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="exemplo@email.com"
                    className={`w-full px-4 py-3 bg-slate-50/50 border rounded-2xl text-xs md:text-sm focus:outline-none focus:ring-4 focus:bg-white text-slate-800 transition-all ${
                      errors.email ? "border-red-300 focus:ring-red-500/10" : "border-slate-200/80 focus:ring-indigo-500/10"
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-red-500 font-medium">{errors.email}</p>}
                </div>

                {/* Assunto */}
                <div className="space-y-1.5">
                  <label htmlFor="assunto" className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                    Assunto do Contato
                  </label>
                  <div className="relative">
                    <select
                      id="assunto"
                      value={formData.assunto}
                      onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-2xl text-xs md:text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white text-slate-800 transition-all appearance-none cursor-pointer"
                    >
                      <option value="feedback">Enviar um Feedback Geral</option>
                      <option value="bug">Reportar um Bug / Erro</option>
                      <option value="sugestao">Sugerir Nova Fonte ou Jogo</option>
                      <option value="parceria">Parcerias e Anúncios</option>
                      <option value="outros">Outros Assuntos</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Mensagem */}
                <div className="space-y-1.5">
                  <label htmlFor="mensagem" className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                    Sua Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    rows={5}
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    placeholder="Escreva detalhadamente o que você precisa..."
                    className={`w-full px-4 py-3 bg-slate-50/50 border rounded-2xl text-xs md:text-sm focus:outline-none focus:ring-4 focus:bg-white text-slate-800 transition-all resize-none ${
                      errors.mensagem ? "border-red-300 focus:ring-red-500/10" : "border-slate-200/80 focus:ring-indigo-500/10"
                    }`}
                  />
                  {errors.mensagem && <p className="text-[11px] text-red-500 font-medium">{errors.mensagem}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-[#4F46E5] hover:bg-[#3B34B3] text-white font-extrabold rounded-2xl text-xs md:text-sm shadow-lg shadow-indigo-500/20 transition-all cursor-pointer hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Preparar E-mail</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto border border-emerald-100 shadow-sm">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-sans font-black text-xl text-[#0F172A]">E-mail Preparado</h3>
                  <p className="text-xs md:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                    Preparamos a mensagem no seu aplicativo de e-mail. Revise o conteúdo e toque em enviar para concluir o contato. O endereço informado para resposta é <strong>{formData.email}</strong>.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all cursor-pointer"
                >
                  Preparar Outro E-mail
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
