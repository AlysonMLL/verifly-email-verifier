package com.alyson.verifly.service;

/* O que há aqui:
- Isolamento do domínio a partir da string do e-mail.
- Consulta de rede real aos servidores DNS globais usando JNDI (Java Naming and Directory Interface).
- Anotação @Cacheable interligada à configuração do Caffeine.

Função do arquivo: Confirmar a existência física do servidor de e-mails.
Ele resolve domínios e verifica se existem registros do tipo "MX". Se não existirem,
mesmo que a sintaxe seja perfeita, o e-mail não é capaz de receber mensagens (hard bounce).
*/

import java.util.Properties;

import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.InitialDirContext;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class DomainValidationService {

    private String normalizeDomain(String domain) {
        if (domain == null) {
            return "";
        }
        return domain.trim().toLowerCase();
    }

    @Cacheable(value = "domain-mx-cache", key = "#root.target.normalizeDomain(#domain)")
    public boolean hasMxRecords(String domain) {
        String normalizedDomain = normalizeDomain(domain);
        if (normalizedDomain.isBlank()) {
            return false;
        }

        InitialDirContext ctx = null;
        try {
            Properties env = new Properties();
            env.put("java.naming.factory.initial", "com.sun.jndi.dns.DnsContextFactory");
            ctx = new InitialDirContext(env);

            Attributes attrs = ctx.getAttributes(normalizedDomain, new String[]{"MX"});
            Attribute mxAttr = attrs.get("MX");

            return mxAttr != null && mxAttr.size() > 0;

        } catch (NamingException e) {
            // Falha na resolução DNS ou domínio inexistente
            return false;
        } finally {
            if (ctx != null) {
                try {
                    ctx.close();
                } catch (NamingException ignored) {
                    // Ignorado: fechamento do contexto não altera o resultado do lookup.
                }
            }
        }
    }
}