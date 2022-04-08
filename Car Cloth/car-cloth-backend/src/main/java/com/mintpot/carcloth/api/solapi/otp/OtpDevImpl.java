package com.mintpot.carcloth.api.solapi.otp;

import com.mintpot.carcloth.utils.AesUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("dev")
@Log4j2
public class OtpDevImpl implements OtpService {

    private final AesUtils aesUtils;

    public OtpDevImpl(AesUtils aesUtils) {
        this.aesUtils = aesUtils;
    }

    @Override
    public String generalOtp(String phoneNo) throws Exception {
        String verifyStr = "0000";
        log.debug("(ENV: DEV) Phone Verification requested for phone number {} has code: {}", phoneNo, verifyStr);
        return aesUtils.encryptWithPrefixIV(verifyStr.concat("-").concat(phoneNo));
    }
}
