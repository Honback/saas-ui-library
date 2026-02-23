package com.universalsaas.member;

import com.universalsaas.exception.BadRequestException;
import com.universalsaas.exception.ForbiddenException;
import com.universalsaas.exception.ResourceNotFoundException;
import com.universalsaas.member.dto.MemberResponse;
import com.universalsaas.member.dto.UpdateMemberRoleRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final OrganizationMemberRepository memberRepository;

    public List<MemberResponse> getMembers(UUID orgId, UUID userId) {
        if (!memberRepository.existsByOrganizationIdAndUserId(orgId, userId)) {
            throw new ForbiddenException("You are not a member of this organization");
        }

        return memberRepository.findAllByOrganizationId(orgId).stream()
                .map(MemberResponse::from)
                .toList();
    }

    @Transactional
    public MemberResponse updateRole(UUID orgId, UUID memberId,
                                     UpdateMemberRoleRequest request, UUID userId) {
        OrganizationMember currentUser = memberRepository.findByOrganizationIdAndUserId(orgId, userId)
                .orElseThrow(() -> new ForbiddenException("You are not a member of this organization"));

        if (currentUser.getRole() != MemberRole.OWNER && currentUser.getRole() != MemberRole.ADMIN) {
            throw new ForbiddenException("Only owners and admins can update member roles");
        }

        OrganizationMember target = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException("Member", "id", memberId));

        if (!target.getOrganization().getId().equals(orgId)) {
            throw new ResourceNotFoundException("Member", "id", memberId);
        }

        if (target.getRole() == MemberRole.OWNER) {
            throw new BadRequestException("Cannot change the owner's role");
        }

        if (request.getRole() == MemberRole.OWNER) {
            throw new BadRequestException("Cannot assign owner role");
        }

        target.setRole(request.getRole());
        target = memberRepository.save(target);
        return MemberResponse.from(target);
    }

    @Transactional
    public void removeMember(UUID orgId, UUID memberId, UUID userId) {
        OrganizationMember currentUser = memberRepository.findByOrganizationIdAndUserId(orgId, userId)
                .orElseThrow(() -> new ForbiddenException("You are not a member of this organization"));

        if (currentUser.getRole() != MemberRole.OWNER && currentUser.getRole() != MemberRole.ADMIN) {
            throw new ForbiddenException("Only owners and admins can remove members");
        }

        OrganizationMember target = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException("Member", "id", memberId));

        if (!target.getOrganization().getId().equals(orgId)) {
            throw new ResourceNotFoundException("Member", "id", memberId);
        }

        if (target.getRole() == MemberRole.OWNER) {
            throw new BadRequestException("Cannot remove the owner");
        }

        memberRepository.delete(target);
    }
}
