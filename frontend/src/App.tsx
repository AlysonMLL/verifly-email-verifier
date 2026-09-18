/* O que há aqui:
- Instância raiz da interface de usuário em React.
- Configuração do ThemeProvider para injeção automática de Light/Dark mode via Tailwind.
- Orquestração completa de todos os componentes da Landing Page.

Função do arquivo: Atuar como o layout principal (Wrapper) da aplicação.
Ele envolve a interface no contexto de tema do next-themes e posiciona os componentes
visuais na ordem correta, garantindo consistência no espaçamento vertical entre as seções.
*/

import { ThemeProvider } from 'next-themes';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Features from './components/Features';
import Benefits from './components/Benefits';
import FAQ from './components/faq';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-slate-50 dark:bg-transparent flex flex-col font-sans overflow-x-hidden">
        <Header />
        
        <main className="flex-grow flex flex-col items-center">
          <Hero />
          <Marquee />
          
          <div className="w-full bg-slate-50 dark:bg-transparent pt-10 pb-10">
            <Features />
            <Benefits />
          </div>
          
          <FAQ />
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;