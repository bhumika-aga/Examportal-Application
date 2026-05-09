package com.examportal.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

/**
 * Security configuration for the Exam Portal application.
 * Configures JWT authentication, CORS, and endpoint security.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class MySecurityConfig {
    
    private final String allowedOrigins;
    
    private final JwtAuthenticationEntryPoint unauthorizedHandler;
    
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    
    public MySecurityConfig(@Value("${cors.allowed-origins}") String allowedOrigins,
                            JwtAuthenticationEntryPoint unauthorizedHandler,
                            JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.allowedOrigins = allowedOrigins;
        this.unauthorizedHandler = unauthorizedHandler;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }
    
    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
        throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    
    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        List<String> origins = Arrays.asList(allowedOrigins.split(","));
        configuration.setAllowedOriginPatterns(origins);
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(requests -> requests
                                                   .requestMatchers(HttpMethod.POST, "/generate-token").permitAll()
                                                   .requestMatchers(HttpMethod.POST, "/user/").permitAll()
                                                   .requestMatchers("/h2-console/**").permitAll()
                                                   .requestMatchers("/actuator/health", "/actuator/info").permitAll()
                                                   .requestMatchers("/actuator/**").authenticated()
                                                   .requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/api-docs/**", "/v3/api-docs/**")
                                                   .permitAll()
                                                   .requestMatchers(HttpMethod.OPTIONS).permitAll()
                                                   .anyRequest().authenticated())
            .exceptionHandling(handling -> handling.authenticationEntryPoint(unauthorizedHandler))
            .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // For H2 console frame display
            .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable));
        
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}