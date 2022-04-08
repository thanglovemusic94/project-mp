package com.mintpot.busking.api.google_inapp;

import com.google.gson.Gson;
import com.mintpot.busking.api.google_inapp.dto.GoogleProductInfo;
import com.mintpot.busking.api.google_inapp.dto.GoogleReceipt;
import com.mintpot.busking.api.google_inapp.dto.ReceiptInfo;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

@Service
public class GoogleInAppClientImpl implements GoogleInAppClient {

    private final String KEY_FACTORY_ALGORITHM = "RSA";

    private final String SIGNATURE_ALGORITHM = "SHA1withRSA";

    @Value("${google.inapp.base64}")
    private String GOOGLE_PUBLIC_BASE64;



    @Override
    public ReceiptInfo verifyPurchase(GoogleReceipt googleReceipt) {
        PublicKey publicKey = generatePublicKey();
        boolean verified = verify(publicKey, googleReceipt.getOriginalJson(), googleReceipt.getSignature());
        if(verified) {
            GoogleProductInfo productInfo = new Gson().fromJson(googleReceipt.getOriginalJson(), GoogleProductInfo.class);
            return ReceiptInfo.builder()
                    .productId(productInfo.getProductId())
                    .transactionId(productInfo.getOrderId())
                    .build();
        }
        throw new BusinessException(ErrorCode.GOOGLE_PURCHASE_FAILED);
    }

    private boolean verify (PublicKey publicKey, String signedData, String signature) {
        try {
            byte[] signatureBytes = Base64.getDecoder().decode(signature);
            Signature signatureAlgorithm = Signature.getInstance(SIGNATURE_ALGORITHM);
            signatureAlgorithm.initVerify(publicKey);
            signatureAlgorithm.update(signedData.getBytes(StandardCharsets.UTF_8));
            return signatureAlgorithm.verify(signatureBytes);
        } catch (NoSuchAlgorithmException | InvalidKeyException | SignatureException e) {
            e.printStackTrace();
        }
        throw new BusinessException(ErrorCode.GOOGLE_PURCHASE_ERROR);
    }

    /**
     * Generates a PublicKey instance from a string containing the Base64-encoded public key.
     */
    private PublicKey generatePublicKey () {
        Base64.getDecoder().decode(GOOGLE_PUBLIC_BASE64);
        try {
            KeyFactory keyFactory = KeyFactory.getInstance(KEY_FACTORY_ALGORITHM);
            return keyFactory.generatePublic(new X509EncodedKeySpec(Base64.getDecoder().decode(GOOGLE_PUBLIC_BASE64)));
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            e.printStackTrace();
        }

        throw new BusinessException(ErrorCode.GOOGLE_PURCHASE_ERROR);
    }
}
