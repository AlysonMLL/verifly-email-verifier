/* O que há aqui:
- Estrutura semântica de rodapé (<footer>).
- Logotipo consistente com o header, utilizando a paleta da marca.
- Links de navegação minimalistas perfeitamente alinhados à direita no Desktop.

Função do arquivo: Finalizar a página transmitindo credibilidade. Ele fornece o resumo
da proposta de valor da ferramenta e cria âncoras úteis para facilitar a navegação em
telas longas.
*/

import logo_dark from '../assets/logo-verifly.png';
import logo_light from '../assets/logo-verifly-lightmode.png';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';



export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const logo = mounted && theme === 'light' ? logo_light : logo_dark;


  return (
    <footer className="w-full border-t border-gray-200 dark:border-white/5 bg-transparent mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Branding & Info */}
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-12 w-auto transition-all" />
          </div>
          <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">
            2026 © Verifly. Todos os direitos reservados.
          </p>
        </div>

        {/* Contact links */}
        <div className="flex flex-col gap-4 border-l-2 border-brand/50 pl-5 md:items-end md:pl-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-gray-300">
            Contato
          </span>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/AlysonMLL"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="group flex h-11 w-11 items-center justify-center rounded-lg border border-slate-300/70 text-slate-600 transition-all hover:-translate-y-0.5 hover:border-brand hover:bg-brand/10 hover:text-brandDark focus:outline-none focus:ring-2 focus:ring-brand/60 dark:border-white/10 dark:text-gray-300 dark:hover:text-brand"
            >
              <FaGithub aria-hidden="true" className="h-5 w-5 transition-transform group-hover:scale-110" />
            </a>
            <a
              href="https://www.linkedin.com/in/alysonmll/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="group flex h-11 w-11 items-center justify-center rounded-lg border border-slate-300/70 text-slate-600 transition-all hover:-translate-y-0.5 hover:border-brand hover:bg-brand/10 hover:text-brandDark focus:outline-none focus:ring-2 focus:ring-brand/60 dark:border-white/10 dark:text-gray-300 dark:hover:text-brand"
            >
              <FaLinkedin aria-hidden="true" className="h-5 w-5 transition-transform group-hover:scale-110" />
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}