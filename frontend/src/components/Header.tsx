import ThemeToggle from './ThemeToggle';
import { CheckCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full py-6 px-4 md:px-8 flex justify-between items-center max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        {/* Logo Icon */}
        <div className="bg-brand p-2 rounded-xl text-darkBg shadow-[0_0_15px_rgba(0,255,179,0.3)]">
          <CheckCircle className="w-6 h-6" strokeWidth={2.5} />
        </div>
        
        {/* Nome do Site */}
        <span className="font-bold text-2xl tracking-tight text-slate-900 dark:text-white">
          Veri<span className="text-brand">fly</span>
        </span>
      </div>

      {/* Botão de Tema */}
      <div className="flex items-center">
        <ThemeToggle />
      </div>
    </header>
  );
}