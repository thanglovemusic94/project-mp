package com.mintpot.busking.api.nice_id.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@ToString
public class NiceVerfDataDto {
    private String url;

    private Map<String, String> postData;

    public NiceVerfDataDto(String encData) {
        url = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
        postData = new HashMap<>();
        postData.put("m", "checkplusService");
        postData.put("EncodeData", encData);
    }
}
