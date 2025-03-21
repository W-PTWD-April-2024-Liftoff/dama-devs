package com.launchcode.dama_devs.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            }
        };
    }
}

// the allowed origins at the React output screen is at "http://localhost:5173"
// allowed methods from React ("GET", "POST", "PUT", "DELETE", "OPTIONS")
// CORS ~ Cross-Origin Resource Sharing configuration
// Boilerplate code that allows the front-end to communicate with the back-end
// @Bean registers the WebMvcConfigurer, making sure the CORS settings are applied

