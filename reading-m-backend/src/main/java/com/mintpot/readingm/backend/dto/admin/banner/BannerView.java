package com.mintpot.readingm.backend.dto.admin.banner;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.readingm.backend.entity.constant.ShowStatus;
import com.mintpot.readingm.backend.converter.ImageUrlSerializer;

import java.util.Date;

public interface BannerView {

    Long getId();

    String getName();

    @JsonSerialize(using = ImageUrlSerializer.class)
    String getImagePc();

    @JsonSerialize(using = ImageUrlSerializer.class)
    String getImageMb();

    Integer getOrderBanner();

    ShowStatus getShowStatus();

    Date getCreatedAt();
}
