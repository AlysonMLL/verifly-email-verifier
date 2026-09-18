package com.alyson.verifly.controller;

/* O que há aqui:
- Injeção de Dependência (DI) dos 4 serviços de validação (Sintaxe, Descartável, Domínio e Tipografia).
- Endpoint POST /api/v1/verify com fluxo de curto-circuito (Fail-fast).

Função do arquivo: Atuar como o maestro da operação.
A lógica aplica o padrão "Fail-fast": se a sintaxe falhar, devolve erro imediatamente, 
poupando CPU. Se for descartável, recusa sem gastar rede. Se passar, consulta o DNS
e, em caso de erro, sugere correção ortográfica.
*/

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alyson.verifly.dto.VerificationRequest;
import com.alyson.verifly.dto.VerificationResult;
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

    public VerificationController(SyntaxValidationService syntaxService,
                                  DisposableEmailService disposableService,
                                  DomainValidationService domainService,
                                  TypoSuggestionService typoService) {
        this.syntaxService = syntaxService;
        this.disposableService = disposableService;
        this.domainService = domainService;
        this.typoService = typoService;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of("status", "UP", "message", "Verifly API is running!"));
    }

    @PostMapping("/verify")
    public ResponseEntity<VerificationResult> verifyEmail(@Valid @RequestBody VerificationRequest request) {
        String email = syntaxService.normalizeEmail(request.email());

        // 1. Barreira Síncrona: Regex RFC
        if (!syntaxService.isValidSyntax(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new VerificationResult(
                    false, "INVALID_SYNTAX", "Formato de e-mail inválido.", null
            ));
        }

        // 2. Barreira Síncrona: E-mails Temporários
        if (disposableService.isDisposable(email)) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new VerificationResult(
                    false, "DISPOSABLE", "Domínios de e-mail temporários não são permitidos.", null
            ));
        }

        // Extrai o domínio para a próxima fase
        String domain = email.substring(email.indexOf("@") + 1);

        // 3. Barreira I/O Externa: MX Lookup DNS (Caffeine Cacheado)
        if (!domainService.hasMxRecords(domain)) {
            String suggestion = typoService.suggestCorrection(email);
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new VerificationResult(
                    false, "INVALID_DOMAIN", "O domínio não possui servidores de e-mail ativos.", suggestion
            ));
        }

        // Sucesso total
        return ResponseEntity.ok(new VerificationResult(
            true, "VALID", "E-mail verificado com sucesso.", null
        ));
    }
}