package com.examportal.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * OpenAPI/Swagger configuration for API documentation.
 * Provides comprehensive API documentation with JWT security scheme.
 */
@Configuration
public class OpenApiConfig {

    @Value("${cors.allowed-origins}")
    private String allowedOrigins;

    @Bean
    public OpenAPI examPortalOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Exam Portal API")
                        .description(
                                "RESTful API for the Exam Portal application - A modern online examination management system. "
                                        +
                                        "Features include user authentication, category management, quiz creation, question management, and exam taking.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Exam Portal Team")
                                .email("support@examportal.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Development Server"),
                        new Server().url(allowedOrigins.split(",")[0].replace("5173", "8080").replace("3000", "8080"))
                                .description("Production Server")))
                .addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))
                .components(new Components()
                        .addSecuritySchemes("Bearer Authentication", new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .bearerFormat("JWT")
                                .scheme("bearer")
                                .description("Enter JWT Bearer token")));
    }
}
