package com.universalsaas.invitation.dto;

import com.universalsaas.invitation.Invitation;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class InvitationResponse {

    private UUID id;
    private String email;
    private String role;
    private String status;
    private UUID organizationId;
    private String organizationName;
    private Instant expiresAt;
    private Instant createdAt;

    public static InvitationResponse from(Invitation inv) {
        return new InvitationResponse(
                inv.getId(),
                inv.getEmail(),
                inv.getRole(),
                inv.getStatus(),
                inv.getOrganization().getId(),
                inv.getOrganization().getName(),
                inv.getExpiresAt(),
                inv.getCreatedAt()
        );
    }
}
