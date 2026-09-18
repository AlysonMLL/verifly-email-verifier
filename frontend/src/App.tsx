/* O que há aqui:
- Instância raiz da interface de usuário em React.
- Configuração do ThemeProvider para injeção automática de Light/Dark mode via Tailwind.
- Orquestração dos componentes estruturais da Landing Page (Header, Hero, Marquee, etc.).

Função do arquivo: Atuar como o layout principal (Wrapper) da aplicação.
Ele envolve a interface no contexto de tema do next-themes e posiciona os componentes
visuais na ordem correta, garantindo que o footer seja empurrado para o final da tela
através das classes flex e min-h-screen.
*/

import { ThemeProvider } from 'next-themes';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen flex flex-col font-sans overflow-x-hidden">
        <Header />
        
        <main className="flex-grow flex flex-col items-center">
          <Hero />
          <Marquee />
          
          {/* As seções Cards, FAQ e Footer entrarão aqui */}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;