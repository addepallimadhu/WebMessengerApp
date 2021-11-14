package org.newops.messenger.Service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

public class BaseService {
    public String getCurrentUserName() {
        Jwt jwt = (Jwt)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return (String) jwt.getClaims().get("email");

    }

    public String getCurrentUserDisplayName() {
        Jwt jwt = (Jwt)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return (String) jwt.getClaims().get("name");

    }
}
