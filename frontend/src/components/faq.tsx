/* O que há aqui:
- Array de objetos contendo as 5 perguntas e respostas baseadas no design.
- Renderização de accordions usando as tags semânticas nativas <details> e <summary>.
- Estilização orientada a estados nativos (group-open) para a rotação suave do ícone.

Função do arquivo: Eliminar as últimas objeções do usuário (segurança, custo, privacidade).
A utilização de HTML5 semântico garante máxima performance e acessibilidade, permitindo
uma navegação fluida pelo teclado e leitura perfeita por screen readers sem depender do JavaScript.
*/

import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'O verificador de e-mail é realmente gratuito?',
    a: 'Sim, a nossa ferramenta é 100% gratuita. Não há cobranças ocultas, não exigimos cartão de crédito e não impomos limites abusivos para o uso diário padrão.'
  },
  {
    q: 'Preciso criar uma conta para usar?',
    a: 'Não. Acreditamos em ferramentas sem atrito. Você não precisa se cadastrar, criar senhas ou confirmar e-mails. Basta colar o endereço no topo da página e clicar em verificar.'
  },
  {
    q: 'Como a verificação funciona?',
    a: 'Nosso sistema executa uma checagem em 3 etapas em tempo real: valida a sintaxe (RFC), cruza o domínio contra bancos de e-mails descartáveis e realiza consultas de DNS (MX Records) direto nos provedores.'
  },
  {
    q: 'Meus dados ficam armazenados?',
    a: 'De forma alguma. Privacidade é o nosso pilar. Os e-mails que você insere são processados em milissegundos na memória RAM e descartados imediatamente. Não guardamos logs das suas verificações.'
  },
  {
    q: 'Funciona com qualquer provedor ou domínio?',
    a: 'Sim! Temos suporte nativo para os maiores provedores globais (Gmail, Outlook, Yahoo) e também validamos domínios personalizados, governamentais e educacionais.'
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="w-full py-16 px-4 md:px-8 max-w-3xl mx-auto scroll-mt-24">
      <div className="text-center mb-10">
        <p className="text-brandDark dark:text-brand text-sm font-bold tracking-widest uppercase mb-2">
          AINDA COM DÚVIDAS?
        </p>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Perguntas frequentes
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <details 
            key={`faq-${idx}`} 
            className="group border-b border-gray-200 dark:border-white/10 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between py-4 text-slate-900 dark:text-white font-medium hover:text-brandDark dark:hover:text-brand transition-colors">
              {faq.q}
              <ChevronDown className="w-5 h-5 text-slate-400 transition duration-300 group-open:-rotate-180" />
            </summary>
            <div className="pb-6 text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}