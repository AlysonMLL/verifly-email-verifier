package com.alyson.verifly.dto;

import jakarta.validation.constraints.NotBlank;

public record VerificationRequest(
        @NotBlank(message = "O e-mail é obrigatório")
        String email
) {
}
