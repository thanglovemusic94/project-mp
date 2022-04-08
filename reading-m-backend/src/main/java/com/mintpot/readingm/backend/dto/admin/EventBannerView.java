package com.mintpot.readingm.backend.dto.admin;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.readingm.backend.converter.ImageUrlSerializer;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventBannerView {
    @JsonSerialize(using = ImageUrlSerializer.class)
    private String pcImgUrl;

    private String pcImgName;

    @JsonSerialize(using = ImageUrlSerializer.class)
    private String mobileImgUrl;

    private String mobileImgName;
}
