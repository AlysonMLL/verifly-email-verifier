export interface VerificationResult {
  valid: boolean;
  code: string;
  message: string;
  suggestion: string | null;
}

export interface BatchResultRow extends VerificationResult {
  email: string; // O batch devolve a coluna extra para identificação
}