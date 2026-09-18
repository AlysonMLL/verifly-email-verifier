package com.alyson.verifly.service;

/* O que há aqui:
- Carregamento estático de um arquivo .txt contendo domínios descartáveis.
- Armazenamento em um HashSet na memória para consultas de alta performance.
- Extração do domínio da string de e-mail e verificação booleana.

Função do arquivo: Proteger sistemas contra cadastros "fantasmas".
A anotação @PostConstruct força o Spring Boot a ler o arquivo do disco 
uma única vez durante o startup (boot) da aplicação. As verificações 
subsequentes batem direto na RAM (HashSet), ocorrendo em menos de 1 milissegundo.
*/

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class DisposableEmailService {

    private static final Logger log = LoggerFactory.getLogger(DisposableEmailService.class);

    private Set<String> disposableDomains = new HashSet<>();

    @PostConstruct
    public void init() {
        InputStream inputStream = getClass().getResourceAsStream("/data/disposable-domains.txt");

        if (inputStream == null) {
            log.warn("Arquivo de domínios descartáveis não encontrado em /data/disposable-domains.txt");
            return;
        }

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
            disposableDomains = reader.lines()
                    .map(String::trim)
                    .map(String::toLowerCase)
                    .filter(line -> !line.isEmpty() && !line.startsWith("#"))
                    .collect(Collectors.toSet());

            log.info("Lista de domínios descartáveis carregada: {} provedores.", disposableDomains.size());
        } catch (Exception e) {
            log.error("Falha ao carregar disposable-domains.txt", e);
        }
    }

    public boolean isDisposable(String email) {
        if (email == null || !email.contains("@")) {
            return false;
        }

        String domain = email.substring(email.indexOf("@") + 1).trim().toLowerCase();
        return disposableDomains.contains(domain);
    }
}