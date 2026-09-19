package com.alyson.verifly.service;

/* O que há aqui:
- Leitura e parsing de arquivos CSV recebidos via upload (MultipartFile).
- Orquestração da validação em lote reaproveitando as regras unitárias.
- Geração de relatórios estruturados linha a linha.

Função do arquivo: Escalar a capacidade da API.
Permite que o usuário faça upload de uma lista de contatos e processe milhares
de e-mails de uma só vez. A lógica de negócio original é reaproveitada, garantindo
que as validações de sintaxe, domínios descartáveis e a consulta DNS em cache
atuem com a mesma eficiência.
*/

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.alyson.verifly.dto.BatchResultRow;

@Service
public class BatchVerificationService {

    private static final Logger log = LoggerFactory.getLogger(BatchVerificationService.class);

    private final SyntaxValidationService syntaxService;
    private final DisposableEmailService disposableService;
    private final DomainValidationService domainService;
    private final TypoSuggestionService typoService;

    public BatchVerificationService(SyntaxValidationService syntaxService,
                                    DisposableEmailService disposableService,
                                    DomainValidationService domainService,
                                    TypoSuggestionService typoService) {
        this.syntaxService = syntaxService;
        this.disposableService = disposableService;
        this.domainService = domainService;
        this.typoService = typoService;
    }

    public List<BatchResultRow> processBatch(MultipartFile file) throws Exception {
        List<BatchResultRow> results = new ArrayList<>();

        // O builder ignora linhas em branco automaticamente para evitar NullPointerExceptions
        CSVFormat format = CSVFormat.DEFAULT.builder().setIgnoreEmptyLines(true).build();

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
             CSVParser csvParser = new CSVParser(reader, format)) {

            for (CSVRecord csvRecord : csvParser) {
                // Previne falha se houver uma linha apenas com vírgulas vazias
                if (csvRecord.size() == 0) continue;

                // Assume que o e-mail está na primeira coluna
                String rawEmail = csvRecord.get(0);
                String email = syntaxService.normalizeEmail(rawEmail);

                // 1. Barreira Síncrona: Regex RFC
                if (!syntaxService.isValidSyntax(email)) {
                    results.add(new BatchResultRow(rawEmail, false, "INVALID_SYNTAX", "Formato inválido.", null));
                    continue;
                }

                // 2. Barreira Síncrona: E-mails Temporários
                if (disposableService.isDisposable(email)) {
                    results.add(new BatchResultRow(email, false, "DISPOSABLE", "Domínio bloqueado.", null));
                    continue;
                }

                String domain = email.substring(email.indexOf("@") + 1);

                // 3. Barreira I/O Externa: MX Lookup DNS (Cacheado)
                if (!domainService.hasMxRecords(domain)) {
                    String suggestion = typoService.suggestCorrection(email);
                    results.add(new BatchResultRow(email, false, "INVALID_DOMAIN", "Sem servidores ativos.", suggestion));
                    continue;
                }

                // Sucesso Total
                results.add(new BatchResultRow(email, true, "VALID", "Válido.", null));
            }
        } catch (Exception e) {
            log.error("Erro durante o processamento do arquivo CSV.", e);
            throw e;
        }

        return results;
    }
}