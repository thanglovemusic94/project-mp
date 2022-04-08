package com.mintpot.readingm.backend.dto.admin;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.readingm.backend.converter.ImageUrlSerializer;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DavinciClassDetailDto {
    private long id;

    @JsonSerialize(using = ImageUrlSerializer.class)
    private String imageUrl;

    private String name;

    private String grade;

    private String materials;

    private String intro;

    private long tuitionFee;

    private Double rating;

    private boolean addedToCart;

    private List<VideoDto> videos;

}