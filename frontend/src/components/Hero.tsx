import { useState } from 'react';
import { Clipboard, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setEmail(text);
      setStatus('idle');
    } catch (err) {
      console.error('Falha ao ler a área de transferência: ', err);
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Validação simples de sintaxe no frontend (RFC 5322 básica)
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
      setStatus('valid');
      // No futuro, chamaremos a API aqui: await api.verify(email)
    } else {
      setStatus('invalid');
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center pt-20 pb-16 px-4 text-center">
      
      {/* Badge Superior */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-brandDark/30 bg-white dark:bg-[#0a3124] text-brandDark dark:text-brand text-sm font-medium mb-6">
        <ShieldCheck className="w-4 h-4" />
        <span>Verificação instantânea de e-mails</span>
      </div>

      {/* Títulos */}
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
        Verificador de email <span className="text-brandDark italic dark:text-brand">gratuito</span>
      </h1>
      <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mb-12">
        Confirme em segundos se um endereço de e-mail é válido, existe de fato e está pronto para receber mensagens — sem criar conta e sem pagar nada.
      </p>

      {/* Área de Input */}
      <form onSubmit={handleVerify} className="w-full max-w-2xl mb-10">
        <div className="flex flex-col sm:flex-row gap-4">
          
          {/* Input com botão Colar embutido */}
          <div className="relative flex-grow flex items-center">
            <input
              type="text" // Usando text para não disparar a validação nativa do HTML antes da nossa
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus('idle');
              }}
              placeholder="nome@exemplo.com"
              className={`w-full bg-white dark:bg-[#0a3124] border text-slate-900 dark:text-white rounded-lg py-4 pl-5 pr-28 focus:outline-none focus:ring-2 transition-all shadow-sm
                ${status === 'invalid' ? 'border-red-500 focus:ring-red-500/20' : ''}
                ${status === 'valid' ? 'border-brandDark focus:ring-brandDark/20' : ''}
                ${status === 'idle' ? 'border-gray-300 dark:border-gray-700 focus:border-brand focus:ring-brand/20' : ''}
              `}
            />
            
            {/* Botão Colar */}
            <button
              type="button"
              onClick={handlePaste}
              className="absolute right-2 flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-md transition-colors"
            >
              <Clipboard className="w-4 h-4" />
              Colar
            </button>
          </div>

          {/* Botão Verificar */}
          <button
            type="submit"
            className="bg-brandDark dark:bg-brand text-darkBg font-bold px-8 py-4 rounded-lg hover:bg-[#00e6a1] hover:-translate-y-0.5 transition-all shadow-[0_0_15px_rgba(0,255,179,0.2)] disabled:opacity-70 disabled:hover:translate-y-0 shrink-0"
          >
            Verificar
          </button>
        </div>
        
        {/* Feedback visual de erro (Opcional) */}
        {status === 'invalid' && (
          <p className="text-red-500 text-sm mt-3 text-left pl-2 font-medium">
            Formato de e-mail inválido.
          </p>
        )}
      </form>

      {/* Badges de Benefícios */}
      <div className="flex flex-wrap justify-center gap-3">
        {['Sem necessidade de cadastro', 'Resultado em segundos', 'Verificação de sintaxe e domínio', '100% gratuito'].map((badge) => (
          <span key={badge} className="px-4 py-1.5 rounded-full text-xs font-medium bg-gray-200 dark:bg-white/5 text-slate-600 dark:text-gray-400 border border-gray-300 dark:border-white/10">
            {badge}
          </span>
        ))}
      </div>

    </section>
  );
}