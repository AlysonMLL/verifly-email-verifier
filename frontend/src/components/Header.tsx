import ThemeToggle from './ThemeToggle';
import logo from '../assets/logo-verifly.png';

export default function Header() {
  const links = [
    { name: 'Início', href: '#hero' },
    { name: 'Compatibilidade', href: '#compatibilidade' },
    { name: 'Recursos', href: '#recursos' },
    { name: 'Dúvidas', href: '#faq' }
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 w-full h-30 border-b border-slate-200/70 bg-slate-50/85 backdrop-blur-md dark:border-white/5 dark:bg-darkBg/80 transition-colors">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-12 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-16 w-auto transition-all" />
        </div>

        <div className="flex items-center gap-6 mt-2">
          <nav className="hidden gap-6 text-sm font-bold uppercase tracking-wide md:flex">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-slate-500 transition-colors hover:text-brandDark dark:text-gray-400 dark:hover:text-brand"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}