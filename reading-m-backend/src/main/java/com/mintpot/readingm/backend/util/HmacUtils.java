package com.mintpot.readingm.backend.util;

import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@Component
public class HmacUtils {

    @Value("${solapi.client-secret}")
    private String SOLAPI_CLIENT_SECRET;

    public String generateHmac256(String message) {
        var key = SOLAPI_CLIENT_SECRET.getBytes(StandardCharsets.UTF_8);

        byte[] bytes = hmac("HmacSHA256", key, message.getBytes(StandardCharsets.UTF_8));
        return new String(Hex.encode(bytes));
    }

    byte[] hmac(String algorithm, byte[] key, byte[] message) {
        try {
            Mac mac = Mac.getInstance(algorithm);
            mac.init(new SecretKeySpec(key, algorithm));
            return mac.doFinal(message);
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            throw new CommonException(ErrorCode.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
