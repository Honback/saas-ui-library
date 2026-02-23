package com.universalsaas.security;

import com.universalsaas.member.OrganizationMemberRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.annotation.Order;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Order(2)
public class TenantFilter extends OncePerRequestFilter {

    private final OrganizationMemberRepository memberRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String orgIdHeader = request.getHeader("X-Organization-Id");
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();

            if (orgIdHeader != null && auth != null && auth.isAuthenticated()
                    && auth.getPrincipal() instanceof UserPrincipal) {
                UUID orgId = UUID.fromString(orgIdHeader);
                UUID userId = ((UserPrincipal) auth.getPrincipal()).getId();

                boolean isMember = memberRepository
                        .existsByOrganizationIdAndUserId(orgId, userId);
                if (isMember) {
                    TenantContext.setCurrentTenant(orgId);
                }
            }

            filterChain.doFilter(request, response);
        } finally {
            TenantContext.clear();
        }
    }
}
