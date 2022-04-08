package com.mintpot.readingm.backend.util;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.nio.ByteBuffer;
import java.nio.LongBuffer;
import java.util.UUID;

@Component
public class IdentifierUtils {

    private final Base64 BASE64 = new Base64(true);

    public String generateKey() {
        UUID uuid = UUID.randomUUID();
        byte[] uuidArray = toByteArray(uuid);
        byte[] encodedArray = BASE64.encode(uuidArray);
        String returnValue = new String(encodedArray);
        returnValue = StringUtils.removeEnd(returnValue, "\r\n");
        return returnValue;
    }

    public UUID convertKey(String key) {
        UUID returnValue = null;
        if (StringUtils.isNotBlank(key)) {
            // Convert base64 string to a byte array
            byte[] decodedArray = BASE64.decode(key);
            returnValue = fromByteArray(decodedArray);
        }
        return returnValue;
    }

    private byte[] toByteArray(UUID uuid) {
        byte[] byteArray = new byte[(Long.SIZE / Byte.SIZE) * 2];
        ByteBuffer buffer = ByteBuffer.wrap(byteArray);
        LongBuffer longBuffer = buffer.asLongBuffer();
        longBuffer.put(new long[]{uuid.getMostSignificantBits(), uuid.getLeastSignificantBits()});
        return byteArray;
    }

    private UUID fromByteArray(byte[] bytes) {
        ByteBuffer buffer = ByteBuffer.wrap(bytes);
        LongBuffer longBuffer = buffer.asLongBuffer();
        return new UUID(longBuffer.get(0), longBuffer.get(1));
    }
}
