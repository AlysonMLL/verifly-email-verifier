/* O que há aqui:
- URL base da API definida por variável de ambiente, com fallback para o backend local.
- Método para verificar um único endereço de e-mail via requisição POST.
- Método para enviar um arquivo e obter os resultados da verificação em lote.
- Tratamento de erros internos do servidor e conversão das respostas para os tipos da aplicação.

Função do arquivo: Centralizar a comunicação do frontend com a API de verificação de e-mails.
Ele mantém as chamadas HTTP e seus formatos de resposta organizados em uma única interface reutilizável.
*/

import type { VerificationResult, BatchResultRow } from '../types/index.ts';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export const api = {
  verifySingle: async (email: string): Promise<VerificationResult> => {
    const response = await fetch(`${API_BASE_URL}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    // Se for um erro interno do Spring Boot (500), aí sim estouramos o erro.
    // Os erros 400 e 422 agora passam direto para lermos o JSON.
    if (!response.ok && response.status >= 500) {
      throw new Error(`Erro no servidor: ${response.status}`);
    }

    return response.json();
  },

  verifyBatch: async (file: File): Promise<BatchResultRow[]> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/verify/batch`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok && response.status >= 500) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Erro de rede: ${response.status}`);
    }

    return response.json();
  }
};