package com.mintpot.readingm.backend.dto.admin;

import lombok.Getter;
import lombok.Setter;

import java.net.URL;

@Getter
@Setter
public class SaveEventBannerResDto {
    private URL pcImgUrl;

    private URL mobileImgUrl;
}
