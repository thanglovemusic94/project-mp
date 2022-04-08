package com.mintpot.readingm.backend.util;

import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;

@Component
public class AesUtils {

    private static final String ENCRYPT_ALGO = "AES/GCM/NoPadding";
    private static final int TAG_LENGTH_BIT = 128;
    private static final int IV_LENGTH_BYTE = 12;
    private static final int AES_KEY_BIT = 256;

    private SecretKey SECRET_KEY;

    private byte[] INIT_VALUE;

    // AES secret key
    @PostConstruct
    void initialize() throws NoSuchAlgorithmException {
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(AES_KEY_BIT, SecureRandom.getInstanceStrong());
        SECRET_KEY = keyGen.generateKey();
        INIT_VALUE = new byte[12];
        new SecureRandom().nextBytes(INIT_VALUE);
    }

    // hex representation
    private String hex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }

    private byte[] hexToByteArray(String str) {
        byte[] res = new byte[str.length()/2];

        for (int i = 0; i < res.length; i++) {
            int index = i * 2;
            int j = Integer.parseInt(str.substring(index, index + 2), 16);
            res[i] = (byte) j;
        }
        return res;
    }

    // print hex with block size split
    private String hexWithBlockSize(byte[] bytes, int blockSize) {

        String hex = hex(bytes);

        // one hex = 2 chars
        blockSize = blockSize * 2;

        // better idea how to print this?
        List<String> result = new ArrayList<>();
        int index = 0;
        while (index < hex.length()) {
            result.add(hex.substring(index, Math.min(index + blockSize, hex.length())));
            index += blockSize;
        }

        return result.toString();

    }


    public byte[] encrypt(byte[] pText) throws Exception {
        Cipher cipher = Cipher.getInstance(ENCRYPT_ALGO);
        cipher.init(Cipher.ENCRYPT_MODE, SECRET_KEY, new GCMParameterSpec(TAG_LENGTH_BIT, INIT_VALUE));
        return cipher.doFinal(pText);
    }

    // prefix IV length + IV bytes to cipher text
    public String encryptWithPrefixIV(String pText) throws Exception {
        byte[] cipherText = encrypt(pText.getBytes(StandardCharsets.UTF_8));
        return hex(ByteBuffer.allocate(INIT_VALUE.length + cipherText.length).put(INIT_VALUE).put(cipherText).array());

    }

    public String decrypt(byte[] cText) throws Exception {
        Cipher cipher = Cipher.getInstance(ENCRYPT_ALGO);
        cipher.init(Cipher.DECRYPT_MODE, SECRET_KEY, new GCMParameterSpec(TAG_LENGTH_BIT, INIT_VALUE));
        byte[] plainText = cipher.doFinal(cText);
        return new String(plainText, StandardCharsets.UTF_8);

    }

    public String decryptWithPrefixIV(String cText) throws Exception {

        ByteBuffer bb = ByteBuffer.wrap(hexToByteArray(cText));

        byte[] iv = new byte[IV_LENGTH_BYTE];
        bb.get(iv);

        byte[] cipherText = new byte[bb.remaining()];
        bb.get(cipherText);

        return decrypt(cipherText);

    }

}
