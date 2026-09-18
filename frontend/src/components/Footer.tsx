/* O que há aqui:
- Estrutura semântica de rodapé (<footer>).
- Logotipo consistente com o header, utilizando a paleta da marca.
- Links de navegação minimalistas perfeitamente alinhados à direita no Desktop.

Função do arquivo: Finalizar a página transmitindo credibilidade. Ele fornece o resumo
da proposta de valor da ferramenta e cria âncoras úteis para facilitar a navegação em
telas longas.
*/

import logo from '../assets/logo-verifly.png';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-white/5 bg-transparent mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Branding & Info */}
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-16 w-auto transition-all" />
          </div>
          <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">
            2026 © Verifly. Todos os direitos reservados.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-6 text-sm font-medium">
          {['Como funciona', 'Dúvidas frequentes', 'Privacidade', 'Contato'].map((link) => (
            <a 
              key={link} 
              href={link === 'Dúvidas frequentes' ? '#faq' : '#'} 
              className="text-slate-600 dark:text-gray-400 hover:text-brandDark dark:hover:text-brand transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
        
      </div>
    </footer>
  );
}