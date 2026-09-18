package com.alyson.verifly.config;

/* O que há aqui:
- Habilitação global de cache nativo do Spring (@EnableCaching).
- Configuração do motor Caffeine (alta performance e baixo consumo de memória).
- Definição de regras de expiração (24 horas) e limite máximo (10.000 domínios).

Função do arquivo: Proteger a API contra latência excessiva de I/O.
Se 50 usuários verificarem e-mails do "@gmail.com", apenas a primeira requisição
fará a consulta DNS real. As outras 49 lerão o resultado da RAM em O(1), economizando
banda e acelerando o tempo de resposta do servidor.
*/

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager("domain-mx-cache");
        cacheManager.setCaffeine(Caffeine.newBuilder()
                .expireAfterWrite(24, TimeUnit.HOURS)
                .maximumSize(10_000));
        return cacheManager;
    }
}