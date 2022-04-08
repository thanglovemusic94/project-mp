package com.mintpot.busking.api.naver_stream.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CDN {

    private boolean createCdn = true;

    private String cdnType = "CDN_PLUS";

    private String instanceNo;

    private String statusName;

    private String cdnDomain;
}
