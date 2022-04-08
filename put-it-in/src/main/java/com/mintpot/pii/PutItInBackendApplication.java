package com.mintpot.pii;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.concurrent.TimeUnit;

@SpringBootApplication(scanBasePackages = {"com.mintpot"})
@EnableScheduling
public class PutItInBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(PutItInBackendApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                applyFullCorsAllowedPolicy(registry);
            }
        };
    }

    private void applyFullCorsAllowedPolicy(CorsRegistry registry) {
        registry.addMapping("/**") //
                .allowedOrigins("*") //
                .allowedMethods("OPTIONS", "HEAD", "GET", "PUT", "POST", "DELETE", "PATCH") //
                .allowedHeaders("*") //
                .exposedHeaders("WWW-Authenticate") //
                .allowCredentials(true)
                .maxAge(TimeUnit.DAYS.toSeconds(1));
    }
}
