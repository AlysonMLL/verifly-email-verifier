/* O que há aqui:
- Layout focado em texto corrido com uma lista (bullet points) destacada.
- Estilização de container centralizado com fundo suave (background diferenciado).

Função do arquivo: Educar o usuário final sobre o "motivo" da ferramenta existir.
Aumenta o tempo de permanência na página ao explicar que a ferramenta previne
retrabalho e protege a reputação de disparos, focando na "dor" do usuário.
*/

import { Check } from 'lucide-react';

export default function Benefits() {
  const points = [
    'Reduz taxas de rejeição (bounce) em disparos e campanhas de e-mail marketing',
    'Evita perder contatos, orçamentos e cadastros por causa de digitação errada',
    'Protege a reputação do seu domínio junto aos provedores de e-mail'
  ];

  return (
    <section className="w-full py-10 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-[#0a3124] border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-sm">
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
          Por que verificar um e-mail antes de usá-lo?
        </h2>
        
        <p className="text-slate-600 dark:text-gray-400 mb-8 leading-relaxed text-lg">
          Um único caractere errado transforma um endereço válido em uma mensagem que nunca chega. 
          Verificar um e-mail antes de enviá-lo, cadastrá-lo ou salvá-lo evita retrabalho, economiza tempo 
          e mantém suas listas de contatos limpas e confiáveis — seja para uso pessoal, 
          formulários de cadastro ou campanhas de marketing.
        </p>

        <ul className="space-y-4">
          {points.map((point, idx) => (
            <li key={`point-${idx}`} className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0 bg-brand/20 p-1 rounded-full text-brandDark dark:text-brand">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-slate-700 dark:text-gray-300 font-medium">
                {point}
              </span>
            </li>
          ))}
        </ul>
        
      </div>
    </section>
  );
}