package com.mintpot.busking.dto.api;

import java.util.Date;

public interface BuskingNearByDto {

    int getId();

    String getName();

    String getImage();

    String getTitle();

    Date getStart();

    Date getEnd();

    int getType();

    int getStatus();

    int getProgress();

    int getUser_id();

    int getDuration_in_minute();

    Double getLat();

    Double getLng();

    String getLand_name();

    String getLand_id();

    String getLand_address();

    Double getDistance();

    String getNaver_stream_id();

    String getNaver_stream_url();

    String getNaver_stream_key();

    String getBusker_name();

    String getAvatar();

    String getChannel_id();

}
