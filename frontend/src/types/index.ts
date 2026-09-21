/* O que há aqui:
- Interface VerificationResult para representar o resultado de uma verificação de e-mail.
- Campos de validade, código, mensagem e sugestão retornados pela API.
- Interface BatchResultRow que estende o resultado individual com o e-mail identificado.

Função do arquivo: Definir os contratos de dados compartilhados pelo frontend.
Ele garante tipagem consistente entre os serviços da API e os componentes que exibem os resultados.
*/

export interface VerificationResult {
  valid: boolean;
  code: string;
  message: string;
  suggestion: string | null;
}

export interface BatchResultRow extends VerificationResult {
  email: string; // O batch devolve a coluna extra para identificação
}