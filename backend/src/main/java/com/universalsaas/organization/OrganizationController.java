package com.universalsaas.organization;

import com.universalsaas.common.ApiResponse;
import com.universalsaas.organization.dto.CreateOrganizationRequest;
import com.universalsaas.organization.dto.OrganizationResponse;
import com.universalsaas.organization.dto.UpdateOrganizationRequest;
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
@RequestMapping("/organizations")
@RequiredArgsConstructor
public class OrganizationController {

    private final OrganizationService organizationService;

    @PostMapping
    public ResponseEntity<ApiResponse<OrganizationResponse>> create(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CreateOrganizationRequest request) {
        OrganizationResponse response = organizationService.create(request, principal.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<OrganizationResponse>>> getUserOrganizations(
            @AuthenticationPrincipal UserPrincipal principal) {
        List<OrganizationResponse> orgs = organizationService.getUserOrganizations(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(orgs));
    }

    @GetMapping("/{orgId}")
    public ResponseEntity<ApiResponse<OrganizationResponse>> getOrganization(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID orgId) {
        OrganizationResponse response = organizationService.getOrganization(orgId, principal.getId());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PutMapping("/{orgId}")
    public ResponseEntity<ApiResponse<OrganizationResponse>> update(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID orgId,
            @Valid @RequestBody UpdateOrganizationRequest request) {
        OrganizationResponse response = organizationService.update(orgId, request, principal.getId());
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
