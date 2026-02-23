package com.universalsaas.invitation;

import com.universalsaas.common.ApiResponse;
import com.universalsaas.invitation.dto.AcceptInvitationRequest;
import com.universalsaas.invitation.dto.InvitationResponse;
import com.universalsaas.member.dto.InviteMemberRequest;
import com.universalsaas.security.UserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class InvitationController {

    private final InvitationService invitationService;

    @PostMapping("/organizations/{orgId}/members/invite")
    public ResponseEntity<ApiResponse<InvitationResponse>> invite(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID orgId,
            @Valid @RequestBody InviteMemberRequest request) {
        InvitationResponse response = invitationService.invite(orgId, request, principal.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(response));
    }

    @GetMapping("/organizations/{orgId}/invitations")
    public ResponseEntity<ApiResponse<List<InvitationResponse>>> getPendingInvitations(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID orgId) {
        List<InvitationResponse> invitations = invitationService.getPendingInvitations(orgId, principal.getId());
        return ResponseEntity.ok(ApiResponse.success(invitations));
    }

    @PostMapping("/invitations/accept")
    public ResponseEntity<ApiResponse<Void>> accept(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody AcceptInvitationRequest request) {
        invitationService.accept(request.getToken(), principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Invitation accepted", null));
    }
}
