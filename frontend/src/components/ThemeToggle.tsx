/* O que há aqui:
- Integração com o hook useTheme, do next-themes, para acessar e alterar o tema atual.
- Estado de montagem para evitar inconsistências entre a renderização do servidor e do cliente.
- Botão com ícones de sol e lua para representar visualmente o tema selecionado.
- Estilos responsivos para borda, hover e adaptação aos temas claro e escuro.

Função do arquivo: Renderizar o botão de alternância de tema da aplicação.
Ele permite que o usuário alterne entre os modos claro e escuro de forma acessível e consistente.
*/

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Garante que o componente só renderize no client-side para ler o tema correto
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      aria-label="Alternar tema"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-brand" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" />
      )}
    </button>
  );
}