package com.mintpot.busking.api.naver_stream;

import com.mintpot.busking.api.naver_stream.dto.NaverChannelInfo;
import com.mintpot.busking.api.naver_stream.dto.NaverQualitySetList;
import com.mintpot.busking.api.naver_stream.dto.NaverServiceInfo;
import com.mintpot.busking.api.naver_stream.dto.NaverServiceResponse;
import com.mintpot.busking.dto.SliceDto;

public interface NaverStreamingApiClient {

    NaverChannelInfo createNaverChannel (String channelName);

    NaverChannelInfo getNaverChannelDetail (String channelId);

    SliceDto<NaverServiceInfo> getNaverService (String naverStreamId);

    void getNaverChannels();

    NaverQualitySetList getNaverQualitySets();
}
