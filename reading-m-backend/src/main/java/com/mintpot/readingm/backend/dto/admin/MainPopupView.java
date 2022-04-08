package com.mintpot.readingm.backend.dto.admin;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.readingm.backend.converter.ImageUrlSerializer;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MainPopupView {
    @JsonSerialize(using = ImageUrlSerializer.class)
    private String imageUrl;

    private String imageName;

    private String videoUrl;
}
