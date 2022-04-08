package com.mintpot.busking.api.apple.inapp;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@Log4j2
public class AppStoreServiceImpl implements AppStoreService {

    private final WebClient appStoreWebClient;

    @Value("${appstore.password}")
    private String APPSTORE_PASSWORD;

    public AppStoreServiceImpl(WebClient appStoreWebClient) {
        this.appStoreWebClient = appStoreWebClient;
    }

    @Override
    public ReceiptInfo verifyReceipt(VerifyReceiptReq data) {
        String VERIFY_RECEIPT_URL = "/verifyReceipt";
        data.setPassword(APPSTORE_PASSWORD);
        String result =
                appStoreWebClient.post().uri(VERIFY_RECEIPT_URL).contentType(MediaType.APPLICATION_JSON).body(BodyInserters.fromValue(data)).retrieve().bodyToMono(String.class).block();

        JsonObject oj = JsonParser.parseString(result).getAsJsonObject();
        if(oj.get("status").getAsInt() != 0)
            throw new BusinessException(ErrorCode.APPSTORE_REQUEST_FAILED);

        var inAppEle = oj.get("receipt").getAsJsonObject().getAsJsonArray("in_app");
        var receiptInfo = inAppEle.get(inAppEle.size() - 1).getAsJsonObject();

        return ReceiptInfo.builder().productId(receiptInfo.get("product_id").getAsString()).transactionId(receiptInfo.get(
                "transaction_id").getAsString()).build();
    }
}
