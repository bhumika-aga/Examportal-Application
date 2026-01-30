package com.examportal.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * Security configuration for the Exam Portal application.
 * Configures JWT authentication, CORS, and endpoint security.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class MySecurityConfig {

	@Value("${cors.allowed-origins}")
	private String allowedOrigins;

	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;

	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;

	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean
	BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	/*
	 * @Bean DaoAuthenticationProvider authenticationProvider() {
	 * DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
	 * authProvider.setUserDetailsService(userDetailsService);
	 * authProvider.setPasswordEncoder(passwordEncoder()); return authProvider; }
	 */

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		List<String> origins = Arrays.asList(allowedOrigins.split(","));
		configuration.setAllowedOriginPatterns(origins);
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowCredentials(true);
		configuration.setMaxAge(3600L);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
				.csrf(csrf -> csrf.disable())
				.cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.authorizeHttpRequests(requests -> requests
						// Public endpoints
						.requestMatchers("/generate-token", "/user/", "/user/test").permitAll()
						// H2 Console (development only)
						.requestMatchers("/h2-console/**").permitAll()
						// Actuator endpoints for health monitoring
						.requestMatchers("/actuator/**").permitAll()
						// Swagger/OpenAPI endpoints
						.requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/api-docs/**", "/v3/api-docs/**")
						.permitAll()
						// Allow preflight requests
						.requestMatchers(HttpMethod.OPTIONS).permitAll()
						// All other requests require authentication
						.anyRequest().authenticated())
				.exceptionHandling(handling -> handling.authenticationEntryPoint(unauthorizedHandler))
				.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				// For H2 console frame display
				.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()));

		http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
}