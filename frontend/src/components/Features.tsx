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

const featureCards = [
  {
    title: 'Verificação completa',
    description: 'Checamos sintaxe, domínio e registros de e-mail (MX) para confirmar se o endereço realmente pode receber mensagens.',
    icon: SearchCheck
  },
  {
    title: 'Sem necessidade de conta',
    description: 'Nenhum cadastro, senha ou plano. Cole o e-mail e verifique — sem barreiras entre você e o resultado.',
    icon: UserX
  },
  {
    title: '100% gratuito e rápido',
    description: 'Resultado em poucos segundos, sem limites escondidos, sem cartão de crédito e sem letras miúdas.',
    icon: Zap
  },
  {
    title: 'Privacidade em primeiro lugar',
    description: 'Os e-mails verificados não são armazenados nem compartilhados com terceiros em nenhuma etapa do processo.',
    icon: LockKeyhole
  }
];

export default function Features() {
  return (
    <section className="w-full py-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center">
      
      {/* Título da Seção */}
      <div className="text-center mb-12">
        <p className="text-brandDark dark:text-brand text-sm font-bold tracking-widest uppercase mb-2">
          POR QUE ESTE VERIFICADOR
        </p>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Tudo o que você precisa, sem complicação
        </h2>
      </div>

      {/* Grid Bento Box Responsivo */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
        {featureCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={`feat-${idx}`}
              className="flex flex-col p-8 bg-white dark:bg-[#0a3124] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-brand transition-all duration-300 group"
            >
              <div className="p-3 bg-brandDark/10 dark:bg-brand/10 w-fit rounded-xl mb-6 text-brandDark dark:text-brand transition-transform group-hover:scale-110">
                <Icon className="w-6 h-6" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}