/* O que há aqui:
- Gerenciamento de estado complexo (Drag & Drop, Loading, Resultados) via hooks do React.
- Chamada assíncrona ao endpoint multipart/form-data do backend Spring Boot.
- Componente de renderização visual: Zona de Drop pontilhada e Tabela de Resultados.

Função do arquivo: Escalar a usabilidade. 
Permite ao usuário arrastar arquivos CSV diretamente da sua área de trabalho
e obter uma tabela rica com os diagnósticos de múltiplos e-mails simultaneamente.
*/

import { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import type { BatchResultRow } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function BatchUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<BatchResultRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { ref, isVisible } = useScrollReveal();
  
  // Referência invisível para abrir a janela do sistema caso o usuário clique em vez de arrastar
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manipuladores de Eventos de Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    // Validação básica do lado do cliente
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError("Por favor, envie apenas arquivos no formato CSV.");
      setResults(null);
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResults(null);

    try {
      // Chama a nossa classe de serviço tipada
      const data = await api.verifyBatch(file);
      setResults(data);
    } catch (err: any) {
      setError(err.message || "Erro ao processar o arquivo.");
    } finally {
      setIsProcessing(false);
      // Limpa o input invisível para permitir o re-upload do mesmo arquivo se necessário
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <section 
        ref={ref} 
        id="batch" 
        className={`w-full py-16 px-4 md:px-8 max-w-4xl mx-auto scroll-mt-24 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      
      <div className="text-center mb-10">
        <p className="text-brandDark dark:text-brand text-sm font-bold tracking-widest uppercase mb-2">ESCALA EMPRESARIAL</p>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Verificação em Lote</h2>
        <p className="text-slate-600 dark:text-gray-400 mt-2">Arraste um arquivo .csv com sua lista de e-mails para processamento massivo.</p>
      </div>

      {/* Zona de Drop (Drag & Drop) */}
      <div 
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[250px]
          ${isDragging 
            ? 'border-brand bg-brand/5 scale-[1.02]' 
            : 'border-gray-300 dark:border-white/20 bg-white dark:bg-[#0a3124] hover:border-brand/50 hover:bg-slate-50 dark:hover:bg-white/5'
          }
          ${isProcessing ? 'pointer-events-none opacity-80' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileSelect} 
          accept=".csv" 
          className="hidden" 
        />

        {isProcessing ? (
          <div className="flex flex-col items-center text-brandDark dark:text-brand">
            <Loader2 className="w-12 h-12 mb-4 animate-spin" />
            <span className="font-bold text-lg">Processando lote...</span>
            <span className="text-sm text-slate-500 dark:text-gray-400 mt-1">Por favor, não feche esta aba.</span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-slate-600 dark:text-gray-400 pointer-events-none">
            <div className="p-4 bg-brandDark/10 dark:bg-brand/10 text-brandDark dark:text-brand rounded-full mb-4">
              <UploadCloud className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-lg">Clique para buscar ou arraste seu .csv</span>
            <span className="text-sm mt-2">Estrutura esperada: um e-mail por linha na primeira coluna.</span>
          </div>
        )}
      </div>

      {/* Mensagem de Erro */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3 text-red-600 dark:text-red-400 font-medium">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Tabela de Resultados (Apenas visível quando results tem dados) */}
      {results && results.length > 0 && (
        <div className="mt-10 bg-white dark:bg-[#0a3124] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-slate-50 dark:bg-transparent">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-brandDark dark:text-brand" />
              Relatório de Processamento
            </h3>
            <span className="text-xs font-bold px-3 py-1 bg-brandDark/10 dark:bg-brand/10 text-brandDark dark:text-brand rounded-full uppercase tracking-wider">
              {results.length} registros
            </span>
          </div>
          
          <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 font-semibold border-b border-gray-200 dark:border-white/10">Status</th>
                  <th className="px-6 py-4 font-semibold border-b border-gray-200 dark:border-white/10">E-mail Fornecido</th>
                  <th className="px-6 py-4 font-semibold border-b border-gray-200 dark:border-white/10">Diagnóstico</th>
                  <th className="px-6 py-4 font-semibold border-b border-gray-200 dark:border-white/10">Sugestão</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                {results.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      {row.valid ? (
                        <span className="flex items-center gap-1.5 text-brandDark dark:text-brand font-medium"><CheckCircle2 className="w-4 h-4" /> Válido</span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-red-500 font-medium"><XCircle className="w-4 h-4" /> Inválido</span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-900 dark:text-gray-200">{row.email}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-gray-400">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-white/5 rounded text-xs mr-2 border border-gray-200 dark:border-white/10">{row.code}</span>
                      {row.message}
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-gray-400 italic">
                      {row.suggestion || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </section>
  );
}