package com.universalsaas.organization.dto;

import com.universalsaas.organization.Organization;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class OrganizationResponse {

    private UUID id;
    private String name;
    private String slug;
    private String logoUrl;
    private UUID ownerId;
    private Instant createdAt;

    public static OrganizationResponse from(Organization org) {
        return new OrganizationResponse(
                org.getId(),
                org.getName(),
                org.getSlug(),
                org.getLogoUrl(),
                org.getOwner().getId(),
                org.getCreatedAt()
        );
    }
}
