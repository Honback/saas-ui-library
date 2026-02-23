package com.universalsaas.invitation;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InvitationRepository extends JpaRepository<Invitation, UUID> {

    Optional<Invitation> findByToken(String token);

    List<Invitation> findAllByOrganizationIdAndStatus(UUID organizationId, String status);

    boolean existsByOrganizationIdAndEmailAndStatus(UUID organizationId, String email, String status);
}
