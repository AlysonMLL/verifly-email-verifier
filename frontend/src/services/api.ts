import type { VerificationResult, BatchResultRow } from '../types/index.ts';

const API_BASE_URL = 'http://localhost:8080/api/v1';

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