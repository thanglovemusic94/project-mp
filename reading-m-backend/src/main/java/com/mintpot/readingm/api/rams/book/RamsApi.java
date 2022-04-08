package com.mintpot.readingm.api.rams.book;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mintpot.readingm.backend.entity.Book;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class RamsApi {

    private final WebClient ramsWebClient;

    private final ObjectMapper objectMapper;

    private static final DateFormat DATE_FORMAT_YYYY_MM = new SimpleDateFormat("yyyy-MM");

    public List<Book> getClassBook(GetBookReq req) {
        final var res = ramsWebClient.post()
                                     .uri("/book_list.aspx")
                                     .body(Mono.just(req), GetBookReq.class)
                                     .retrieve()
                                     .bodyToMono(GetBookRes.class)
                                     .block();
        if (res == null)
            throw new RuntimeException("Get RAMS Book failed");
        if ("1000".equalsIgnoreCase(res.getResultCode()))
            return res.getResultData().getBook();
        else throw new RuntimeException("");
    }

    public List getData(Object req, String uri, String nodeName, java.lang.Class<?> entity) {


        final var strRes = ramsWebClient.post()
                                     .uri(uri)
                                     .body(Mono.just(req), req.getClass())
                                     .retrieve()
                                     .bodyToMono(String.class)
                                     .block();
        if (StringUtils.isEmpty(strRes))
            throw new RuntimeException("Get RAMS Curriculum failed");

        try {
            JsonNode obj = objectMapper.readTree(strRes);
            final var resultCode = obj.get("resultCode").asText();
            if(!"1000".equalsIgnoreCase(resultCode))
                throw new RuntimeException("Get RAMS data failed for type " + entity.getName() + " with resultCode " + resultCode);

            List<Object> res = new ArrayList<>();
            for(JsonNode node: obj.get("resultData").get(nodeName)) {
                res.add(objectMapper.convertValue(node, entity));
            }

            return res;
        } catch(JsonProcessingException ex) {
            throw new RuntimeException("Processing failed");
        }
    }
}
