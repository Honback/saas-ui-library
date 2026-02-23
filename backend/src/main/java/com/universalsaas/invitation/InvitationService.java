package com.universalsaas.invitation;

import com.universalsaas.exception.BadRequestException;
import com.universalsaas.exception.ForbiddenException;
import com.universalsaas.exception.ResourceNotFoundException;
import com.universalsaas.invitation.dto.InvitationResponse;
import com.universalsaas.member.MemberRole;
import com.universalsaas.member.OrganizationMember;
import com.universalsaas.member.OrganizationMemberRepository;
import com.universalsaas.member.dto.InviteMemberRequest;
import com.universalsaas.organization.Organization;
import com.universalsaas.organization.OrganizationRepository;
import com.universalsaas.user.User;
import com.universalsaas.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class InvitationService {

    private final InvitationRepository invitationRepository;
    private final OrganizationRepository organizationRepository;
    private final OrganizationMemberRepository memberRepository;
    private final UserRepository userRepository;

    @Transactional
    public InvitationResponse invite(UUID orgId, InviteMemberRequest request, UUID inviterId) {
        Organization org = organizationRepository.findById(orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Organization", "id", orgId));

        OrganizationMember inviter = memberRepository.findByOrganizationIdAndUserId(orgId, inviterId)
                .orElseThrow(() -> new ForbiddenException("You are not a member of this organization"));

        if (inviter.getRole() != MemberRole.OWNER && inviter.getRole() != MemberRole.ADMIN) {
            throw new ForbiddenException("Only owners and admins can invite members");
        }

        String email = request.getEmail().toLowerCase().trim();

        if (memberRepository.findAllByOrganizationId(orgId).stream()
                .anyMatch(m -> m.getUser().getEmail().equals(email))) {
            throw new BadRequestException("User is already a member of this organization");
        }

        if (invitationRepository.existsByOrganizationIdAndEmailAndStatus(orgId, email, "PENDING")) {
            throw new BadRequestException("An invitation is already pending for this email");
        }

        Invitation invitation = new Invitation();
        invitation.setOrganization(org);
        invitation.setEmail(email);
        invitation.setRole(request.getRole().name());
        invitation.setToken(UUID.randomUUID().toString());
        invitation.setInvitedBy(inviter.getUser());
        invitation.setExpiresAt(Instant.now().plus(7, ChronoUnit.DAYS));
        invitation = invitationRepository.save(invitation);

        return InvitationResponse.from(invitation);
    }

    @Transactional
    public void accept(String token, UUID userId) {
        Invitation invitation = invitationRepository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Invitation", "token", token));

        if (!"PENDING".equals(invitation.getStatus())) {
            throw new BadRequestException("Invitation is no longer valid");
        }

        if (invitation.getExpiresAt().isBefore(Instant.now())) {
            invitation.setStatus("EXPIRED");
            invitationRepository.save(invitation);
            throw new BadRequestException("Invitation has expired");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        if (!user.getEmail().equals(invitation.getEmail())) {
            throw new ForbiddenException("This invitation was sent to a different email");
        }

        OrganizationMember member = new OrganizationMember();
        member.setOrganization(invitation.getOrganization());
        member.setUser(user);
        member.setRole(MemberRole.valueOf(invitation.getRole()));
        memberRepository.save(member);

        invitation.setStatus("ACCEPTED");
        invitationRepository.save(invitation);
    }

    public List<InvitationResponse> getPendingInvitations(UUID orgId, UUID userId) {
        if (!memberRepository.existsByOrganizationIdAndUserId(orgId, userId)) {
            throw new ForbiddenException("You are not a member of this organization");
        }

        return invitationRepository.findAllByOrganizationIdAndStatus(orgId, "PENDING").stream()
                .map(InvitationResponse::from)
                .toList();
    }
}
