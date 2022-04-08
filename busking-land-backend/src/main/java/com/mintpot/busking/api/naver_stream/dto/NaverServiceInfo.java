package com.mintpot.busking.api.naver_stream.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NaverServiceInfo {
    /*
    {
         "name":"720p-16-9",
         "url":"https://test123.cdn.ntruss.com/live/video/ls-20200326194008-jk9ld/720p-16-9/playlist.m3u8",
         "resolution":"1280x720",
         "videoBitrate":"2500000",
         "audioBitrate":"128000"
      },
     */

    private String name;

    private String url;

    private String resolution;

    private String videoBitrate;

    private String audioBitrate;

}
