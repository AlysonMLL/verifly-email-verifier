package com.alyson.verifly.service;

/* O que há aqui:
- Expressão regular (Regex) baseada na RFC 5322 para validação de formato de e-mail.
- Método booleano simples para validar se a string atende aos critérios estruturais.

Função do arquivo: Atuar como a primeira linha de defesa da API.
Impede que a aplicação gaste recursos de processamento ou realize chamadas 
de rede (DNS lookups) para e-mails com formatos obviamente inválidos 
(ex: sem "@", contendo espaços, ou com TLDs incompletos).
*/

import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

@Service
public class SyntaxValidationService {

    // Regex padronizada cobrindo a maioria dos casos de uso RFC 5322
    private static final String EMAIL_REGEX = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,15}$";
    private static final Pattern PATTERN = Pattern.compile(EMAIL_REGEX);

    public String normalizeEmail(String email) {
        if (email == null) {
            return "";
        }
        return email.trim();
    }

    public boolean isValidSyntax(String email) {
        String normalizedEmail = normalizeEmail(email);
        if (normalizedEmail.isBlank()) {
            return false;
        }

        int atIndex = normalizedEmail.indexOf('@');
        if (atIndex <= 0 || atIndex != normalizedEmail.lastIndexOf('@')) {
            return false;
        }

        String localPart = normalizedEmail.substring(0, atIndex);
        String domainPart = normalizedEmail.substring(atIndex + 1);

        if (localPart.isBlank() || domainPart.isBlank()) {
            return false;
        }

        return PATTERN.matcher(normalizedEmail).matches();
    }
}