package com.mintpot.carcloth.api.solapi.otp;

import com.github.javafaker.Faker;
import com.mintpot.carcloth.api.solapi.Message;
import com.mintpot.carcloth.api.solapi.MessageType;
import com.mintpot.carcloth.api.solapi.SingleMessage;
import com.mintpot.carcloth.api.solapi.SmsService;
import com.mintpot.carcloth.utils.AesUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("prd")
@Log4j2
public class OtpPrdImpl implements OtpService {

    private final SmsService smsService;

    private final AesUtils aesUtils;

    private final Faker krFaker;

    private final int VERIFICATION_NO_DIGITS = 4;

    public OtpPrdImpl(SmsService smsService, AesUtils aesUtils, Faker krFaker) {
        this.smsService = smsService;
        this.aesUtils = aesUtils;
        this.krFaker = krFaker;
    }

    @Override
    public String generalOtp(String phoneNo) throws Exception {
        String verifyStr = krFaker.regexify("[0-9]{" + VERIFICATION_NO_DIGITS + "}");
        Message msg = Message.builder()
                .text("인증번호는 [" + verifyStr + "] 차옷에서 본인인증번호를 안내드립니다.")
                .type(MessageType.SMS)
                .to(phoneNo)
                .build();

        String statusMessage = smsService.sendSingleMessage(new SingleMessage(msg)).getStatusMessage();
        log.debug("(ENV: PRODUCT) Phone Verification requested for phone number {} has code: {} and has status message: ", phoneNo, verifyStr, statusMessage);
        return aesUtils.encryptWithPrefixIV(verifyStr.concat("-").concat(phoneNo));
    }
}
