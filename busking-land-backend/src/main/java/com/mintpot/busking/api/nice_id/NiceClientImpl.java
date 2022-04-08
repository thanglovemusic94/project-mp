package com.mintpot.busking.api.nice_id;

import NiceID.Check.CPClient;
import com.mintpot.busking.api.nice_id.dto.NiceVerfDataDto;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Component
public class NiceClientImpl implements NiceClient {

    @Value("${niceid.siteCode}")
    private String siteCode;

    @Value("${niceid.sitePass}")
    private String sitePass;


    @Override
    public NiceVerfDataDto personalVerification() {
        var callbackSuccessUrl =
                ServletUriComponentsBuilder.fromCurrentContextPath().path("/auth/nice/success").build().toString();
        var callbackErrorUrl =
                ServletUriComponentsBuilder.fromCurrentContextPath().path("/auth/nice/error").build().toString();
        var niceCheck = new CPClient();
        var requestNo = niceCheck.getRequestNO(siteCode);
        String authType = "";
        String popgubun = "N";
        String customize = "";
        String gender = "";

        String data =
                "7:REQ_SEQ" + requestNo.getBytes().length + ":" + requestNo + "8" +
                        ":SITECODE" +
                        siteCode.getBytes().length + ":" + siteCode + "9" +
                        ":AUTH_TYPE" +
                        authType.getBytes().length + ":" + authType + "7" +
                        ":RTN_URL" +
                        callbackSuccessUrl.getBytes().length + ":" + callbackSuccessUrl +
                        "7:ERR_URL" + callbackErrorUrl.getBytes().length + ":" + callbackErrorUrl +
                        "11:POPUP_GUBUN" + popgubun.getBytes().length + ":" + popgubun +
                        "9:CUSTOMIZE" + customize.getBytes().length + ":" + customize +
                        "6:GENDER" + gender.getBytes().length + ":" + gender;

        String encData;
        int res = niceCheck.fnEncode(siteCode, sitePass, data);
        switch (res) {
            case 0:
                encData = niceCheck.getCipherData();
                break;
            case -1:
                throw new BusinessException(ErrorCode.NICE_ENCODING_SYSTEM_ERROR);
            case -2:
                throw new BusinessException(ErrorCode.NICE_ENCODING_PROCEED_ERROR);
            case -3:
                throw new BusinessException(ErrorCode.NICE_ENCODING_DATA_ERROR);
            case -9:
                throw new BusinessException(ErrorCode.NICE_INPUT_DATA_ERROR);
            default:
                throw new BusinessException(ErrorCode.NICE_UNKNOWN_ERROR, "Unknown error occurred with errorId " + res);
        }

        return new NiceVerfDataDto(encData);

    }
}
