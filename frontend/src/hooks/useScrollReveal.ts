/* O que há aqui:
- Hook personalizado para detectar quando um elemento entra na área visível da página.
- Referência de elemento HTML e estado que indica se ele já foi revelado.
- IntersectionObserver configurado com um threshold personalizável.
- Desconexão do observer após a primeira entrada na tela e durante a limpeza do efeito.

Função do arquivo: Fornecer a lógica reutilizável para animações de revelação ao rolar a página.
Ele permite que componentes iniciem uma animação somente quando seu conteúdo se torna visível.
*/

import { useEffect, useRef, useState } from 'react';

export function useScrollReveal(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Se entrou na tela, muda o estado e desconecta (só anima a 1ª vez)
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.disconnect();
    };
  }, [threshold]);

  return { ref, isVisible };
}