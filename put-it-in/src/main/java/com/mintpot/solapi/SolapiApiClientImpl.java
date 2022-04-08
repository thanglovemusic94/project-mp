package com.mintpot.solapi;

import com.mintpot.solapi.dto.GroupInfoResponse;
import com.mintpot.solapi.dto.Message;
import com.mintpot.solapi.dto.Response;
import com.mintpot.solapi.dto.SingleMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class SolapiApiClientImpl implements SolapiApiClient {

    @Value("${solapi.sender-number}")
    private String SENDER_NUMBER;

    private final WebClient solapiWebClient;

    public SolapiApiClientImpl(WebClient solapiWebClient) {
        this.solapiWebClient = solapiWebClient;
    }

    @Override
    public GroupInfoResponse createMessageGroup() {
        return solapiWebClient.post().uri("/messages/v4/groups").retrieve().bodyToMono(GroupInfoResponse.class).block();
    }

    @Override
    public void deleteMessageGroup(String groupId) {
        solapiWebClient.delete().uri(
                ub -> ub.path("/messages/v4/groups/{groupId}").build(groupId)
        ).retrieve().bodyToMono(String.class).block();
    }

    @Override
    public void addGroupMessage(String groupId, List<Message> messages) {
        messages.forEach(message -> message.setFrom(SENDER_NUMBER));
        solapiWebClient.put().uri(
                ub -> ub.path("/messages/v4/groups/{groupId}/messages").build(groupId)
        ).body(messages, List.class).retrieve().bodyToMono(String.class).block();
    }

    @Override
    public GroupInfoResponse sendGroupMessage(String groupId) {
        return solapiWebClient.post().uri(
                ub -> ub.path("/messages/v4/groups/{groupId}/send").build(groupId)
        ).retrieve().bodyToMono(GroupInfoResponse.class).block();
    }

    @Override
    public Response sendSingleMessage(Message message) {
        message.setFrom(SENDER_NUMBER);
        SingleMessage msg = new SingleMessage(message);
        return solapiWebClient.post().uri("/messages/v4/send")
                .accept(MediaType.valueOf(MediaType.APPLICATION_JSON_VALUE))
                .body(Mono.just(msg), SingleMessage.class)
                .retrieve()
                .bodyToMono(Response.class)
                .block();
    }
}
