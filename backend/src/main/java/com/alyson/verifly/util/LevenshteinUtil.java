package com.alyson.verifly.util;

/* O que há aqui:
- Algoritmo matemático da Distância de Levenshtein.
- Implementação otimizada em espaço de memória (O(n) usando array unidimensional).

Função do arquivo: Fornecer a base de cálculo de similaridade entre strings.
Ele quantifica matematicamente quantas inserções, deleções ou substituições 
de caracteres são necessárias para transformar a string A (ex: "gamil.com") 
na string B ("gmail.com").
*/

public class LevenshteinUtil {

    private LevenshteinUtil() {
        // Construtor privado para esconder o construtor público implícito de uma classe utilitária
    }

    public static int calculate(String s1, String s2) {
        if (s1 == null || s2 == null) {
            return -1;
        }

        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        int[] costs = new int[s2.length() + 1];
        
        for (int i = 0; i <= s1.length(); i++) {
            int lastValue = i;
            for (int j = 0; j <= s2.length(); j++) {
                if (i == 0) {
                    costs[j] = j;
                } else if (j > 0) {
                    int newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1)) {
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    }
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
            if (i > 0) {
                costs[s2.length()] = lastValue;
            }
        }
        return costs[s2.length()];
    }
}