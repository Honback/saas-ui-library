package com.universalsaas.member.dto;

import com.universalsaas.member.MemberRole;
import com.universalsaas.member.OrganizationMember;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class MemberResponse {

    private UUID id;
    private UUID userId;
    private String email;
    private String firstName;
    private String lastName;
    private String avatarUrl;
    private MemberRole role;
    private Instant joinedAt;

    public static MemberResponse from(OrganizationMember member) {
        return new MemberResponse(
                member.getId(),
                member.getUser().getId(),
                member.getUser().getEmail(),
                member.getUser().getFirstName(),
                member.getUser().getLastName(),
                member.getUser().getAvatarUrl(),
                member.getRole(),
                member.getCreatedAt()
        );
    }
}
