package com.universalsaas.user.dto;

import com.universalsaas.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class UserResponse {

    private UUID id;
    private String email;
    private String firstName;
    private String lastName;
    private String avatarUrl;
    private boolean emailVerified;
    private Instant createdAt;

    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getAvatarUrl(),
                user.isEmailVerified(),
                user.getCreatedAt()
        );
    }
}
