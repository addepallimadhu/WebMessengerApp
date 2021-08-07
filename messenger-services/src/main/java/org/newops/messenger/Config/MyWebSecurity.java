package org.newops.messenger.Config;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.util.Assert;

import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Configuration
@EnableWebSecurity
//@EnableResourceServer
@Slf4j
public class MyWebSecurity extends WebSecurityConfigurerAdapter {

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private List<String> issuers;

    @Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}")
    private String jwkSetUri;

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers(HttpMethod.OPTIONS);
        web.ignoring().antMatchers("/*")	;
        web.ignoring().antMatchers("/static/**")	;

    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .csrf().disable()
                .authorizeRequests().antMatchers("/api/").permitAll()
                .antMatchers("/api/user/").permitAll()
           //     .antMatchers("/").permitAll()
                .anyRequest().authenticated()
                .and().oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)

        ;

    }

    @Bean
    public JwtDecoder jwtDecoder() {
        NimbusJwtDecoder result = NimbusJwtDecoder.withJwkSetUri(jwkSetUri).build();
        OAuth2TokenValidator<Jwt> validator = new DelegatingOAuth2TokenValidator<>(
                JwtValidators.createDefault(),
                new JwtDuelIssuerValidator(issuers));
        System.out.println("Inside JWT DECODER");
        result.setJwtValidator(validator);
        return result;
    }

    private final static class JwtDuelIssuerValidator implements OAuth2TokenValidator<Jwt> {
        private final List<String> issuers;
        private final OAuth2Error error;

        public JwtDuelIssuerValidator(List<String> issuers) {
            Assert.noNullElements(issuers, "issuer cannot be null");
            Assert.notNull(issuers, "issuer cannot be null");
            this.issuers = issuers;
            this.error = new OAuth2Error("invalid_request",
                    "The iss claim is not valid",
                    "https://tools.ietf.org/html/rfc6750#section-3.1");
        }

        @Override
        public OAuth2TokenValidatorResult validate(Jwt token) {
             AtomicReference<Boolean> issuerFound = new AtomicReference<>(false);
            Assert.notNull(token, "token cannot be null");
                issuers.forEach(a -> {
                    if (a.contains(token.getClaim("iss"))){
        //                System.out.print(a);
                        issuerFound.set(true);
                      //  return OAuth2TokenValidatorResult.success();
                    }

                }); //;contains(token.getClaim("iss")))
        //        log.error("iss is invalid: issuers {} , token issuer {}", token.getIssuer(), issuers);

            return (issuerFound.get() ?
                   OAuth2TokenValidatorResult.success() :
                    OAuth2TokenValidatorResult.failure(this.error));
           // return OAuth2TokenValidatorResult.success();
        }

    }
}
