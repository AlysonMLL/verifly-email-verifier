/* O que há aqui:
- Arrays de dados estruturados para provedores de e-mail e extensões de domínio corporativo.
- Duas faixas horizontais de rolagem infinita (uma rápida para a direita/esquerda e outra lenta).
- Estilização de cards em formato "pill" para provedores e "bento box" horizontais para os domínios.
- Lógica de pausa da animação ao passar o mouse (hover:[animation-play-state:paused]).

Função do arquivo: Renderizar a seção de "Compatibilidade Total" da landing page. 
Ele atua puramente como um componente visual de demonstração de autoridade (Social Proof), 
indicando ao usuário final que o Verifly suporta desde os provedores de e-mail em massa 
até domínios governamentais e educacionais restritos.
*/

import { Mail, Cloud, Shield, Globe, Briefcase, GraduationCap, Building2, Server } from 'lucide-react';

const providers = [
  { name: 'Gmail', color: 'text-red-500', bg: 'bg-red-500/10' },
  { name: 'Outlook / Hotmail', color: 'text-blue-600', bg: 'bg-blue-600/10' },
  { name: 'Yahoo', color: 'text-purple-600', bg: 'bg-purple-600/10' },
  { name: 'Proton Mail', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { name: 'iCloud', color: 'text-sky-500', bg: 'bg-sky-500/10' },
  { name: 'Zoho Mail', color: 'text-green-600', bg: 'bg-green-600/10' },
];

const domains = [
  { ext: '.com', desc: 'A extensão comercial e universal mais utilizada no planeta.', icon: Globe },
  { ext: '.com.br', desc: 'A extensão comercial padrão e mais confiável do mercado brasileiro.', icon: Briefcase },
  { ext: '.org / .org.br', desc: 'Destinado a organizações sem fins lucrativos ou ONGs.', icon: Building2 },
  { ext: '.edu / .edu.br', desc: 'Restrito a instituições de ensino e universidades.', icon: GraduationCap },
  { ext: '.net', desc: 'Originalmente voltado para redes e infraestrutura, hoje usado de forma geral.', icon: Server },
];

export default function Marquee() {
  // Duplicamos as arrays para garantir que o efeito infinito não tenha espaços vazios no final da tela
  const duplicatedProviders = [...providers, ...providers];
  const duplicatedDomains = [...domains, ...domains];

  return (
    <section className="w-full py-16 overflow-hidden bg-transparent border-t border-gray-200 dark:border-white/5">
      <div className="text-center mb-10 px-4">
        <p className="text-brandDark dark:text-brand text-sm font-bold tracking-widest uppercase mb-2">Compatibilidade Total</p>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Funciona com os principais provedores e extensões</h2>
      </div>

      <div className="relative w-full flex flex-col gap-6">
        {/* Máscaras de gradiente para suavizar as bordas laterais */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-lightBg dark:from-darkBg to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-lightBg dark:from-darkBg to-transparent z-10 pointer-events-none"></div>

        {/* Faixa 1: Provedores (Marquee Fast) */}
        <div className="flex w-max animate-marquee-fast hover:[animation-play-state:paused] items-center gap-4 px-4">
          {duplicatedProviders.map((provider, idx) => (
            <div 
              key={`prov-${idx}`} 
              className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-[#0a3124] border border-gray-200 dark:border-white/10 rounded-full shadow-sm whitespace-nowrap transition-colors hover:border-gray-300 dark:hover:border-white/20"
            >
              <div className={`p-2 rounded-full ${provider.bg} ${provider.color}`}>
                {provider.name === 'iCloud' ? <Cloud className="w-5 h-5" /> : 
                 provider.name === 'Proton Mail' ? <Shield className="w-5 h-5" /> : 
                 <Mail className="w-5 h-5" />}
              </div>
              <span className="font-bold text-slate-700 dark:text-gray-200">{provider.name}</span>
            </div>
          ))}
        </div>

        {/* Faixa 2: Extensões de Domínio (Marquee Slow - invertendo a direção com flex-row-reverse) */}
        <div className="flex w-max animate-marquee-slow hover:[animation-play-state:paused] items-center gap-4 px-4 ml-[-200px]">
          {duplicatedDomains.map((domain, idx) => {
            const Icon = domain.icon;
            return (
              <div 
                key={`dom-${idx}`} 
                className="flex items-center gap-4 p-4 pr-6 bg-white dark:bg-[#0a3124] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm w-[350px] shrink-0 transition-colors hover:border-gray-300 dark:hover:border-white/20"
              >
                <div className="p-3 bg-brandDark/10 dark:bg-brand/10 text-brandDark dark:text-brand rounded-xl shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-bold text-slate-900 dark:text-white text-lg">{domain.ext}</span>
                  <span className="text-xs text-slate-500 dark:text-gray-400 leading-snug line-clamp-2 mt-0.5">{domain.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}