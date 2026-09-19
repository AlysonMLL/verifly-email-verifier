package com.alyson.verifly.dto;

/* O que há aqui:
- Record Java para padronizar a resposta de cada linha processada no CSV.

Função do arquivo: Atuar como o contrato de saída de dados em lote. 
Ele espelha o resultado individual, mas anexa a string original do e-mail 
para que o frontend consiga montar a tabela de resultados relacionando a 
análise à entrada correspondente.
*/

public record BatchResultRow(
        String email,
        boolean valid,
        String code,
        String message,
        String suggestion
) {
}