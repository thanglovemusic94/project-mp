package com.mintpot.busking;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import com.google.api.client.util.Base64;
import com.mintpot.busking.api.solapi.dto.CustomLogger;
import com.mintpot.busking.utils.HmacUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.http.codec.json.Jackson2JsonDecoder;
import org.springframework.http.codec.json.Jackson2JsonEncoder;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import reactor.core.publisher.Mono;
import reactor.netty.channel.BootstrapHandlers;
import reactor.netty.http.client.HttpClient;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Properties;
import java.util.UUID;

@Configuration
@Log4j2
public class WebConfiguration implements WebMvcConfigurer {

	private final HmacUtils hmacUtils;

	@Value("${solapi.clientId}")
	private String SOLAPI_CLIENT_ID;

	@Value("${appstore.baseurl}")
	private String APP_STORE_BASE_URL;


	@Autowired
	private ObjectMapper objectMapper;

	public WebConfiguration(HmacUtils hmacUtils) {
		this.hmacUtils = hmacUtils;
	}

	@Override
	public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
		for (HttpMessageConverter<?> converter : converters) {
			if (converter instanceof MappingJackson2HttpMessageConverter) {
				ObjectMapper mapper = ((MappingJackson2HttpMessageConverter) converter).getObjectMapper();
				mapper.registerModule(new Hibernate5Module());
			}
		}
	}

	@Bean
	public WebClient naverWebClient() {
		return WebClient.builder().baseUrl("https://openapi.naver.com").build();
	}

	@Bean
	public WebClient naverStreamingClient() {
		return WebClient.builder().baseUrl("https://livestation.apigw.ntruss.com").build();
	}


	@Bean
	public WebClient appStoreWebClient() {
		ExchangeStrategies strategies = ExchangeStrategies.builder().codecs(clientCodecConfigurer -> {
			clientCodecConfigurer.defaultCodecs().jackson2JsonEncoder(new Jackson2JsonEncoder(objectMapper,
					MediaType.APPLICATION_JSON));
			clientCodecConfigurer.defaultCodecs().jackson2JsonDecoder(new Jackson2JsonDecoder(objectMapper,
					MediaType.APPLICATION_JSON));
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

			log.info("Auth headers for solapi: " + authHeader);

		    return Mono.just(ClientRequest.from(clientRequest).header(HttpHeaders.AUTHORIZATION, authHeader).build());
		})).build();
	}


	@Bean
	public JavaMailSender getJavaMailSender() {
		JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
		mailSender.setHost("smtp.gmail.com");
		mailSender.setPort(587);

		mailSender.setUsername("buskingland@gmail.com");
		mailSender.setPassword("uroqhklieuzulzux");

		Properties props = mailSender.getJavaMailProperties();
		props.put("mail.transport.protocol", "smtp");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.debug", "true");

		return mailSender;
	}

}
