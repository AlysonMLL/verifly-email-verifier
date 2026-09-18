/* O que há aqui:
- Array de objetos contendo os dados e ícones (lucide-react) das 4 features principais.
- Componente funcional que renderiza a seção de "Cards Bento Box".
- Layout responsivo usando CSS Grid (1 coluna no mobile, 2 no tablet, 4 no desktop).
- Efeitos visuais de transição, hover (elevação e brilho de borda) e modo escuro.

Função do arquivo: Apresentar de forma clara e objetiva os diferenciais do verificador (Verifly).
Ele atua como a seção de argumentação do produto, mostrando ao usuário que a ferramenta
é completa, rápida, gratuita e segura, substituindo textos longos por cards escaneáveis.
*/

import { SearchCheck, UserX, Zap, LockKeyhole } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const featureCards = [
  { title: 'Verificação completa', description: 'Checamos sintaxe, domínio e registros (MX).', icon: SearchCheck },
  { title: 'Sem necessidade de conta', description: 'Nenhum cadastro, senha ou plano.', icon: UserX },
  { title: '100% gratuito e rápido', description: 'Resultado em segundos, sem limites.', icon: Zap },
  { title: 'Privacidade em 1º lugar', description: 'E-mails não são armazenados.', icon: LockKeyhole }
];

function FeatureCard({ card, delay }: { card: any, delay: number }) {
  const { ref, isVisible } = useScrollReveal();
  const Icon = card.icon;

  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`flex flex-col p-8 bg-white dark:bg-[#0a3124] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-brand transition-all duration-700 group
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="p-3 bg-brandDark/10 dark:bg-brand/10 w-fit rounded-xl mb-6 text-brandDark dark:text-brand transition-transform group-hover:scale-110">
        <Icon className="w-6 h-6" strokeWidth={2} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{card.title}</h3>
      <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{card.description}</p>
    </div>
  );
}

export default function Features() {
  const { ref: headerRef, isVisible: isHeaderVisible } = useScrollReveal();

  return (
    <section id="recursos" className="w-full py-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center scroll-mt-24">
      <div 
        ref={headerRef} 
        className={`text-center mb-12 transition-all duration-700 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <p className="text-brandDark dark:text-brand text-sm font-bold tracking-widest uppercase mb-2">POR QUE ESTE VERIFICADOR</p>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Tudo o que você precisa</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
        {featureCards.map((card, idx) => (
          <FeatureCard key={`feat-${idx}`} card={card} delay={idx * 150} />
        ))}
      </div>
    </section>
  );
}