package com.alyson.verifly.controller;

/* O que há aqui:
- Injeção de Dependência (DI) dos serviços unitários e do serviço de lote (Batch).
- Endpoint POST /api/v1/verify com fluxo de curto-circuito (Fail-fast).
- Endpoint POST /api/v1/verify/batch para upload e processamento de arquivos CSV.

Função do arquivo: Atuar como o maestro da operação da API.
Ele gerencia as requisições HTTP individuais e em massa, repassando os dados 
para a camada de negócio e envelopando as respostas com os Status Codes RESTful corretos.
*/

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.alyson.verifly.dto.BatchResultRow;
import com.alyson.verifly.dto.VerificationRequest;
import com.alyson.verifly.dto.VerificationResult;
import com.alyson.verifly.service.BatchVerificationService;
import com.alyson.verifly.service.DisposableEmailService;
import com.alyson.verifly.service.DomainValidationService;
import com.alyson.verifly.service.SyntaxValidationService;
import com.alyson.verifly.service.TypoSuggestionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class VerificationController {

    private final SyntaxValidationService syntaxService;
    private final DisposableEmailService disposableService;
    private final DomainValidationService domainService;
    private final TypoSuggestionService typoService;
    private final BatchVerificationService batchService;

    public VerificationController(SyntaxValidationService syntaxService,
                                  DisposableEmailService disposableService,
                                  DomainValidationService domainService,
                                  TypoSuggestionService typoService,
                                  BatchVerificationService batchService) {
        this.syntaxService = syntaxService;
        this.disposableService = disposableService;
        this.domainService = domainService;
        this.typoService = typoService;
        this.batchService = batchService;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of("status", "UP", "message", "Verifly API is running!"));
    }

    @PostMapping("/verify")
    public ResponseEntity<VerificationResult> verifyEmail(@Valid @RequestBody VerificationRequest request) {
        String email = syntaxService.normalizeEmail(request.email());

        if (!syntaxService.isValidSyntax(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new VerificationResult(
                    false, "INVALID_SYNTAX", "Formato de e-mail inválido.", null
            ));
        }

        if (disposableService.isDisposable(email)) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_CONTENT).body(new VerificationResult(
                    false, "DISPOSABLE", "Domínios de e-mail temporários não são permitidos.", null
            ));
        }

        String domain = email.substring(email.indexOf("@") + 1);

        if (!domainService.hasMxRecords(domain)) {
            String suggestion = typoService.suggestCorrection(email);
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_CONTENT).body(new VerificationResult(
                    false, "INVALID_DOMAIN", "O domínio não possui servidores de e-mail ativos.", suggestion
            ));
        }

        return ResponseEntity.ok(new VerificationResult(
                true, "VALID", "E-mail verificado com sucesso.", null
        ));
    }

    @PostMapping("/verify/batch")
    public ResponseEntity<?> verifyBatch(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "O arquivo CSV não pode estar vazio."));
        }

        try {
            List<BatchResultRow> results = batchService.processBatch(file);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Falha ao processar o arquivo CSV. Verifique a formatação."));
        }
    }
}