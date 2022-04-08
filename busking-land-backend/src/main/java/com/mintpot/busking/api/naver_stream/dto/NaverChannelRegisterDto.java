package com.mintpot.busking.api.naver_stream.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NaverChannelRegisterDto {

    private String channelName;

    private CDN cdn;

    private Integer qualitySetId;

    private Boolean useDvr;
}
