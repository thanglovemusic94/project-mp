package com.mintpot.readingm.backend;

import com.github.javafaker.Faker;
import com.mintpot.readingm.backend.util.HmacUtils;
import io.netty.handler.logging.LogLevel;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;
import reactor.netty.transport.logging.AdvancedByteBufFormat;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Locale;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Log4j2
@Configuration
public class BeansInitializer {

    public BeansInitializer(HmacUtils hmacUtils) {
        this.hmacUtils = hmacUtils;
    }

    /**
     * Password encoder using BCrypt
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Fake data generator
    @Bean
    public Faker krFaker() {
        return new Faker(Locale.KOREA);
    }

    private final HmacUtils hmacUtils;

    @Value("${solapi.client-id}")
    private String SOLAPI_CLIENT_ID;

    @Value("${toss.client-secret}")
    private String TOSS_CLIENT_SECRET;

    @Value("${rams.api.base-url}")
    private String RAMS_BASE_URL;

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
                .maxAge(TimeUnit.DAYS.toSeconds(1));
    }

    @Bean(name="zoomClient")
    public WebClient zoomClient() {
        return WebClient.builder()
                .baseUrl("https://api.zoom.us/v2")
                .build();
    }

    @Bean
    public WebClient solapiWebClient() {
        HttpClient httpClient = HttpClient
                .create()
                .wiretap("reactor.netty.http.client.HttpClient",
                         LogLevel.DEBUG, AdvancedByteBufFormat.TEXTUAL);

        return WebClient
                .builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .baseUrl("https://api.solapi.com")
                .filter(ExchangeFilterFunction.ofRequestProcessor(clientRequest -> {
                    final String strDate = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toString().split("\\[")[0];
                    String salt = UUID.randomUUID().toString().replace("-", "");
                    var data = strDate + salt;
                    String signature = hmacUtils.generateHmac256(data);
                    final String authHeader = "HMAC-SHA256 ApiKey=" + SOLAPI_CLIENT_ID + ", Date=" + strDate + ", salt" +
                            "=" + salt + ", signature=" + signature;

                    log.debug("Auth headers for solapi: " + authHeader);
                    return Mono.just(ClientRequest.from(clientRequest)
                                                  .header(HttpHeaders.AUTHORIZATION, authHeader)
                                                  .build());
                }))
                .build();
    }

    @Bean
    public WebClient tossWebClient() {
        return WebClient.builder()
                        .baseUrl("https://api.tosspayments.com").defaultHeaders(httpHeaders -> {
                    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
                    httpHeaders.setBasicAuth(TOSS_CLIENT_SECRET, "");
                })
                        .build();
    }

    @Bean
    public WebClient ramsWebClient() {
        return WebClient.builder()
                .exchangeStrategies(ExchangeStrategies.builder()
                        .codecs(config -> config.defaultCodecs().maxInMemorySize(5*1024*1024)) // 5 MB
                        .build()
                )
                .baseUrl(RAMS_BASE_URL)
                .defaultHeaders(httpHeaders -> {
            httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        }).build();
    }
}
