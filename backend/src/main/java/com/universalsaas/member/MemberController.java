package com.universalsaas.member;

import com.universalsaas.common.ApiResponse;
import com.universalsaas.member.dto.MemberResponse;
import com.universalsaas.member.dto.UpdateMemberRoleRequest;
import com.universalsaas.security.UserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/organizations/{orgId}/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<MemberResponse>>> getMembers(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID orgId) {
        List<MemberResponse> members = memberService.getMembers(orgId, principal.getId());
        return ResponseEntity.ok(ApiResponse.success(members));
    }

    @PutMapping("/{memberId}")
    public ResponseEntity<ApiResponse<MemberResponse>> updateRole(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID orgId,
            @PathVariable UUID memberId,
            @Valid @RequestBody UpdateMemberRoleRequest request) {
        MemberResponse response = memberService.updateRole(orgId, memberId, request, principal.getId());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity<Void> removeMember(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID orgId,
            @PathVariable UUID memberId) {
        memberService.removeMember(orgId, memberId, principal.getId());
        return ResponseEntity.noContent().build();
    }
}
