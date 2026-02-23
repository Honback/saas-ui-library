package com.universalsaas.invitation.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AcceptInvitationRequest {

    @NotBlank(message = "Token is required")
    private String token;
}
