/* O que há aqui:
- Componente de cabeçalho principal (Hero) com o input de validação unitária.
- Integração de Drag/Clipboard (Colar) usando navigator.clipboard nativo.
- Fluxo de requisição assíncrono conectado ao backend Spring Boot via api.verifySingle().
- Estados visuais de loading, sucesso, erro e sugestões do Levenshtein (Did You Mean).

Função do arquivo: Ser a porta de entrada para a ação principal do usuário (Verificação Unitária).
Ele valida a sintaxe localmente primeiro, dispara a requisição para a API real, e renderiza o 
resultado (Válido, Descartável, Inválido DNS) usando cores de feedback contextual.
*/

import { useState } from 'react';
import { Clipboard, ShieldCheck, Loader2, CheckCircle2, XCircle, AlertTriangle, Zap, Gift, CheckCheck, UserRoundX } from 'lucide-react';
import { api } from '../services/api';
import type { VerificationResult } from '../types';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const [resultData, setResultData] = useState<VerificationResult | null>(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setEmail(text);
      setStatus('idle');
      setResultData(null);
    } catch (err) {
      console.error('Falha ao ler a área de transferência: ', err);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    // Validação de sintaxe Frontend Síncrona (RFC 5322 básica)
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(cleanEmail)) {
      setStatus('invalid');
      setResultData({ valid: false, code: 'INVALID_SYNTAX', message: 'Formato de e-mail inválido.', suggestion: null });
      return;
    }

    setStatus('loading');
    setResultData(null);

    try {
      // Dispara para o Backend Spring Boot
      const response = await api.verifySingle(cleanEmail);
      setStatus(response.valid ? 'valid' : 'invalid');
      setResultData(response);
    } catch (error: any) {
      setStatus('invalid');
      setResultData({ valid: false, code: 'SERVER_ERROR', message: error.message || 'Falha ao conectar com o servidor.', suggestion: null });
    }
  };

  return (
    <section id="hero" className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center pt-20 pb-16 px-4 text-center scroll-mt-24">
      
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/30 bg-brand/5 text-brandDark dark:text-brand text-sm font-medium mb-6">
        <ShieldCheck className="w-4 h-4" />
        <span>Verificação instantânea de e-mails</span>
      </div>

      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
        Verificador de email <span className="text-brandDark dark:text-brand italic">gratuito</span>
      </h1>
      <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mb-12">
        Confirme em segundos se um endereço de e-mail é válido, existe de fato e está pronto para receber mensagens — sem criar conta e sem pagar nada.
      </p>

      {/* Área de Input */}
      <form onSubmit={handleVerify} className="w-full max-w-2xl mb-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow flex items-center">
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus('idle');
                setResultData(null);
              }}
              placeholder="nome@exemplo.com"
              className={`w-full bg-white dark:bg-[#0a3124] border text-slate-900 dark:text-white rounded-xl py-4 pl-5 pr-28 focus:outline-none focus:ring-2 transition-all shadow-sm
                ${status === 'invalid' ? 'border-red-500 focus:ring-red-500/20' : ''}
                ${status === 'valid' ? 'border-brandDark dark:border-brand focus:ring-brand/20' : ''}
                ${status === 'idle' || status === 'loading' ? 'border-gray-300 dark:border-gray-700 focus:border-brandDark dark:focus:border-brand focus:ring-brand/20' : ''}
              `}
              disabled={status === 'loading'}
            />
            
            <button
              type="button"
              onClick={handlePaste}
              disabled={status === 'loading'}
              className="absolute right-2 flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
            >
              <Clipboard className="w-4 h-4" />
              Colar
            </button>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-brandDark dark:bg-brand text-white dark:text-darkBg font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-[0_0_15px_rgba(0,179,126,0.3)] dark:shadow-[0_0_15px_rgba(0,255,179,0.2)] disabled:opacity-70 disabled:hover:scale-100 hover:-translate-y-0.5 shrink-0 min-w-[140px] flex items-center justify-center"
          >
            {status === 'loading' ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Verificar'}
          </button>
        </div>
      </form>

      {/* Container de Resultados Sincronos */}
      {resultData && (
        <div className="w-full max-w-2xl mb-4 flex flex-col items-center justify-start">
          <div className={`w-full p-4 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-4 text-left shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300
            ${resultData.valid ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'}
          `}>
            
            <div className="flex items-center gap-3">
              {resultData.valid ? (
                <div className="p-2 bg-emerald-100 dark:bg-emerald-800/30 rounded-full text-emerald-600 dark:text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              ) : (
                <div className="p-2 bg-red-100 dark:bg-red-800/30 rounded-full text-red-600 dark:text-red-400 shrink-0">
                  {resultData.code === 'DISPOSABLE' ? <AlertTriangle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                </div>
              )}
              
              <div className="flex flex-col">
                <span className={`font-bold ${resultData.valid ? 'text-emerald-800 dark:text-emerald-400' : 'text-red-800 dark:text-red-400'}`}>
                  {resultData.code}
                </span>
                <span className="text-slate-600 dark:text-slate-300 text-sm">
                  {resultData.message}
                </span>
              </div>
            </div>

            {/* Sugestão de Digitação (Levenshtein) */}
            {resultData.suggestion && (
              <div className="flex flex-col items-center md:items-end text-sm">
                <span className="text-slate-500 dark:text-slate-400">Você quis dizer?</span>
                <button 
                  onClick={() => {
                    setEmail(resultData.suggestion!);
                    setStatus('idle');
                    setResultData(null);
                  }}
                  className="font-mono font-bold text-brandDark dark:text-brand hover:underline"
                >
                  {resultData.suggestion}
                </button>
              </div>
            )}
            
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-3 mt-4 mb-2 translate-y-[-2px]">
        {[
          { label: 'Sem necessidade de cadastro', icon: UserRoundX },
          { label: 'Resultado em segundos', icon: Zap },
          { label: 'Verificação de sintaxe e domínio', icon: CheckCheck },
          { label: '100% gratuito', icon: Gift },
        ].map(({ label, icon: Icon }) => (
          <span
            key={label}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-white/5 text-slate-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 shadow-sm shadow-slate-200/80 dark:shadow-none"
          >
            <Icon className="w-3.5 h-3.5 text-brandDark dark:text-brand" />
            {label}
          </span>
        ))}
      </div>

    </section>
  );
}