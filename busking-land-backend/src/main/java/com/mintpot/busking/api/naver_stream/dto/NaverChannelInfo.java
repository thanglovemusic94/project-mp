package com.mintpot.busking.api.naver_stream.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NaverChannelInfo {

    private String channelId;

    private String channelName;

    private String qualitySetId;

    private String qualitySetName;

    private String publishUrl;

    private String streamKey;

    private CDN cdn;

}
