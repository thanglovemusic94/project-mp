package com.mintpot.readingm.backend.dto.admin;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VideoInPayDto {

    private String title;

    private long time;

    private long price;

    private String videoUrl;

}
