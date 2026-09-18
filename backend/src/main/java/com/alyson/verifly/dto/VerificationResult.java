package com.alyson.verifly.dto;

public record VerificationResult(
        boolean valid,
        String code,
        String message,
        String suggestion
) {
}
