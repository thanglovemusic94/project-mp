package com.mintpot.pii;

import com.github.javafaker.Faker;
import com.mintpot.pii.service.ImageService;
import com.mintpot.solapi.dto.CustomLogger;
import com.mintpot.solapi.utils.HmacUtils;
import lombok.extern.log4j.Log4j2;
import org.locationtech.jts.geom.GeometryFactory;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.netty.channel.BootstrapHandlers;
import reactor.netty.http.client.HttpClient;

import java.lang.reflect.InvocationTargetException;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Locale;
import java.util.UUID;

@Log4j2
@Configuration
@ConfigurationProperties("mintpot")
public class BeansInitializer {

    private final HmacUtils hmacUtils;

    @Value("${solapi.client-id}")
    private String SOLAPI_CLIENT_ID;

    @Value("${toss.client-id}")
    private String TOSS_CLIENT_ID;

    @Value("${toss.client-secret}")
    private String TOSS_CLIENT_SECRET;

    private Class<ImageService> images;

    public void setImages(Class<ImageService> images) {
        this.images = images;
    }

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

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper;
    }

    // Fake data generator
    @Bean
    public Faker krFaker() {
        return new Faker(Locale.KOREA);
    }


    @Bean
    public WebClient solapiWebClient() {
        HttpClient httpClient = HttpClient
                .create()
                .tcpConfiguration(
                        tc -> tc.bootstrap(
                                b -> BootstrapHandlers.updateLogSupport(b, new CustomLogger(HttpClient.class))))
                .wiretap(true);
        return WebClient.builder().clientConnector(new ReactorClientHttpConnector(httpClient)).baseUrl("https://api.solapi.com").filter(ExchangeFilterFunction.ofRequestProcessor(clientRequest -> {
            final String strDate = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toString().split("\\[")[0];
            String salt = UUID.randomUUID().toString().replace("-", "");
            var data = strDate + salt;
            String signature = hmacUtils.generateHmac256(data);

            final String authHeader = "HMAC-SHA256 ApiKey=" + SOLAPI_CLIENT_ID + ", Date=" + strDate + ", salt" +
                    "=" + salt + ", signature=" + signature;

            log.debug("Auth headers for solapi: " + authHeader);

            return Mono.just(ClientRequest.from(clientRequest).header(HttpHeaders.AUTHORIZATION, authHeader).build());
        })).build();
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

    @Bean("geoFac")
    public GeometryFactory geometryFactory() {
        return new GeometryFactory();
    }

    @Bean
    public ImageService imageService() throws NoSuchMethodException, IllegalAccessException, InvocationTargetException,
            InstantiationException {
        return images.getDeclaredConstructor().newInstance();
    }
}
