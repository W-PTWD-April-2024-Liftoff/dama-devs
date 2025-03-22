package com.launchcode.dama_devs.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/weather/**") // Allow weather endpoints
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);

        registry.addMapping("/api/**") // Keep this if needed for other API endpoints
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}

// the allowed origins at the React output screen is at "http://localhost:5173"
// allowed methods from React ("GET", "POST", "PUT", "DELETE", "OPTIONS")
// CORS ~ Cross-Origin Resource Sharing configuration
// Boilerplate code that allows the front-end to communicate with the back-end
// @Bean registers the WebMvcConfigurer, making sure the CORS settings are applied

