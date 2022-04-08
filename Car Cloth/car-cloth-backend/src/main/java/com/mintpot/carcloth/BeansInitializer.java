package com.mintpot.carcloth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.javafaker.Faker;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.mintpot.carcloth.utils.HmacUtils;
import io.netty.handler.logging.LogLevel;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.codec.json.Jackson2JsonDecoder;
import org.springframework.http.codec.json.Jackson2JsonEncoder;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
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
import java.util.Arrays;
import java.util.Locale;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Log4j2
@Configuration
@RequiredArgsConstructor
public class BeansInitializer {

	@Value("${solapi.api-key}")
	private String solapiClientId;
	private final ObjectMapper objectMapper;
	private final HmacUtils hmacUtils;

	@Value("${appstore.baseurl}")
	private String APP_STORE_BASE_URL;

	@Bean
	public Faker krFaker() {
		return new Faker(Locale.KOREA);
	}

	/**
	 * Password encoder using BCrypt
	 */
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
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
				.maxAge(TimeUnit.DAYS.toSeconds(1));
	}

	@Bean
	public ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

		return modelMapper;
	}

	@Bean
	public WebClient iamportWebClient() {
		return WebClient.builder().baseUrl("https://api.iamport.kr").defaultHeaders(httpHeaders -> {
			httpHeaders.setContentType(MediaType.APPLICATION_JSON);
		}).build();
	}

	// @Bean
	// public Scheduler scheduler() throws SchedulerException {
	// SchedulerFactory schedFact = new org.quartz.impl.StdSchedulerFactory();
	// var sched = schedFact.getScheduler();
	// sched.start();
	// return sched;
	// }

	@Bean
	public WebClient naverWebClient() {
		return WebClient.builder().baseUrl("https://openapi.naver.com").build();
	}

	@Bean
	public WebClient appStoreWebClient() {
		ExchangeStrategies strategies = ExchangeStrategies.builder().codecs(clientCodecConfigurer -> {
			clientCodecConfigurer.defaultCodecs()
					.jackson2JsonEncoder(new Jackson2JsonEncoder(objectMapper, MediaType.APPLICATION_JSON));
			clientCodecConfigurer.defaultCodecs()
					.jackson2JsonDecoder(new Jackson2JsonDecoder(objectMapper, MediaType.APPLICATION_JSON));
		}).build();
		return WebClient.builder().exchangeStrategies(strategies).baseUrl(APP_STORE_BASE_URL).build();
	}

	@Bean
	public WebClient kakaoWebClient() {
		return WebClient.builder().baseUrl("https://kapi.kakao.com").build();
	}

	@Bean
	public WebClient facebookWebClient() {
		return WebClient.builder().baseUrl("https://graph.facebook.com/v9.0").build();
	}

	@Bean
	public WebClient googleWebClient() {
		return WebClient.builder().baseUrl("https://www.googleapis.com/oauth2/v1/").build();
	}

	@Bean
	public GoogleIdTokenVerifier googleIdTokenVerifier() {
		return new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
				.setAudience(Arrays.asList("61254803402-vtucjevu7v08gq8vno2ekrpc5bnd99ed.apps.googleusercontent.com",
						"61254803402-efvg0dr4ge0nif9h2ogc6rde4jrclpch.apps.googleusercontent.com",
						"61254803402-chgehg0asu9pmbt76ddao5d4sa0m32ou.apps.googleusercontent.com"))
				.build();
	}

	@Bean
	public WebClient solapiWebClient() {
		var httpClient = HttpClient.create().wiretap("reactor.netty.http.client.HttpClient", LogLevel.DEBUG,
				AdvancedByteBufFormat.TEXTUAL);

		return WebClient.builder().clientConnector(new ReactorClientHttpConnector(httpClient))
				.baseUrl("https://api.solapi.com").filter(ExchangeFilterFunction.ofRequestProcessor(clientRequest -> {
					final String strDate = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toString().split("\\[")[0];
					String salt = UUID.randomUUID().toString().replace("-", "");
					var data = strDate + salt;
					String signature = hmacUtils.generateHmac256(data);

					final String authHeader = "HMAC-SHA256 ApiKey=" + solapiClientId + ", Date=" + strDate + ", salt="
							+ salt + ", signature=" + signature;

					log.info("Auth headers for solapi: " + authHeader);
					return Mono.just(
							ClientRequest.from(clientRequest).header(HttpHeaders.AUTHORIZATION, authHeader).build());
				})).build();
	}
}
