package com.universalsaas.organization;

import com.universalsaas.exception.BadRequestException;
import com.universalsaas.exception.ForbiddenException;
import com.universalsaas.exception.ResourceNotFoundException;
import com.universalsaas.member.MemberRole;
import com.universalsaas.member.OrganizationMember;
import com.universalsaas.member.OrganizationMemberRepository;
import com.universalsaas.organization.dto.CreateOrganizationRequest;
import com.universalsaas.organization.dto.OrganizationResponse;
import com.universalsaas.organization.dto.UpdateOrganizationRequest;
import com.universalsaas.user.User;
import com.universalsaas.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final OrganizationMemberRepository memberRepository;
    private final UserRepository userRepository;

    @Transactional
    public OrganizationResponse create(CreateOrganizationRequest request, UUID userId) {
        if (organizationRepository.existsBySlug(request.getSlug())) {
            throw new BadRequestException("Organization slug already taken");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Organization org = new Organization();
        org.setName(request.getName());
        org.setSlug(request.getSlug().toLowerCase().trim());
        org.setOwner(user);
        org = organizationRepository.save(org);

        OrganizationMember member = new OrganizationMember();
        member.setOrganization(org);
        member.setUser(user);
        member.setRole(MemberRole.OWNER);
        memberRepository.save(member);

        return OrganizationResponse.from(org);
    }

    public List<OrganizationResponse> getUserOrganizations(UUID userId) {
        return memberRepository.findAllByUserId(userId).stream()
                .map(m -> OrganizationResponse.from(m.getOrganization()))
                .toList();
    }

    public OrganizationResponse getOrganization(UUID orgId, UUID userId) {
        Organization org = organizationRepository.findById(orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Organization", "id", orgId));

        if (!memberRepository.existsByOrganizationIdAndUserId(orgId, userId)) {
            throw new ForbiddenException("You are not a member of this organization");
        }

        return OrganizationResponse.from(org);
    }

    @Transactional
    public OrganizationResponse update(UUID orgId, UpdateOrganizationRequest request, UUID userId) {
        Organization org = organizationRepository.findById(orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Organization", "id", orgId));

        OrganizationMember member = memberRepository.findByOrganizationIdAndUserId(orgId, userId)
                .orElseThrow(() -> new ForbiddenException("You are not a member of this organization"));

        if (member.getRole() != MemberRole.OWNER && member.getRole() != MemberRole.ADMIN) {
            throw new ForbiddenException("Only owners and admins can update organization settings");
        }

        if (request.getName() != null) {
            org.setName(request.getName());
        }
        if (request.getLogoUrl() != null) {
            org.setLogoUrl(request.getLogoUrl());
        }

        org = organizationRepository.save(org);
        return OrganizationResponse.from(org);
    }
}
