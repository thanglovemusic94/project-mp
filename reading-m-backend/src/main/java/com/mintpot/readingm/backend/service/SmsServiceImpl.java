package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.sms.SingleMessage;
import com.mintpot.readingm.backend.dto.sms.SmsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class SmsServiceImpl implements SmsService {
    @Value("${solapi.sender-number}")
    private String SENDER_NUMBER;

    @Autowired
    private WebClient solapiWebClient;

    private final String BASE_API_URI = "/messages/v4";


    @Override
    public SmsResponse sendSingleMessage(SingleMessage message) {
        message.getMessage().setFrom(SENDER_NUMBER);
        return solapiWebClient.post()
                .uri(BASE_API_URI + "/send")
                .accept(MediaType.APPLICATION_JSON)
                .body(Mono.just(message), SingleMessage.class)
                .retrieve()
                .bodyToMono(SmsResponse.class)
                .block();
    }
}
