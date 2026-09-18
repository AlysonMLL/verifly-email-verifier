package com.alyson.verifly.service;

/* O que há aqui:
- Lista pré-definida de domínios populares (provedores globais e brasileiros).
- Lógica de extração de domínio e cruzamento com o cálculo de Levenshtein.

Função do arquivo: Agir como o corretor ortográfico da API ("Você quis dizer...?").
Se o usuário digitar "nome@outlok.com", o serviço calcula a distância para "outlook.com"
(distância tolerada <= 2) e devolve a sugestão montada "nome@outlook.com", 
salvando o usuário de perder comunicações importantes por erro de digitação.
*/

import java.util.List;

import org.springframework.stereotype.Service;

import com.alyson.verifly.util.LevenshteinUtil;

@Service
public class TypoSuggestionService {

    // Banco de domínios corporativos e gratuitos conhecidos
    private static final List<String> POPULAR_DOMAINS = List.of(
            "gmail.com", "yahoo.com", "yahoo.com.br", "hotmail.com", "outlook.com",
            "outlook.com.br", "live.com", "icloud.com", "protonmail.com", "proton.me",
            "zoho.com", "uol.com.br", "bol.com.br", "terra.com.br", "ig.com.br"
    );

    // Limite máximo de erros tolerados para considerarmos uma sugestão válida
    private static final int MAX_TOLERATED_DISTANCE = 2;

    public String suggestCorrection(String email) {
        if (email == null || !email.contains("@")) {
            return null;
        }

        String[] parts = email.split("@");
        if (parts.length != 2) {
            return null;
        }

        String localPart = parts[0];
        String domainPart = parts[1].toLowerCase();

        // Se o domínio digitado já for perfeito e conhecido, não há o que sugerir
        if (POPULAR_DOMAINS.contains(domainPart)) {
            return null;
        }

        String bestMatch = null;
        int lowestDistance = Integer.MAX_VALUE;

        for (String popularDomain : POPULAR_DOMAINS) {
            int distance = LevenshteinUtil.calculate(domainPart, popularDomain);
            
            if (distance < lowestDistance) {
                lowestDistance = distance;
                bestMatch = popularDomain;
            }
        }

        // Retorna a sugestão apenas se o erro for pequeno (ex: 1 ou 2 letras erradas)
        // Isso evita sugerir "ig.com.br" quando o usuário digita um domínio de empresa privada curto.
        if (bestMatch != null && lowestDistance <= MAX_TOLERATED_DISTANCE) {
            return localPart + "@" + bestMatch;
        }

        return null;
    }
}