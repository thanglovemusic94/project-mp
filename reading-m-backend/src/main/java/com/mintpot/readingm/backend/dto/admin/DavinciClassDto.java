package com.mintpot.readingm.backend.dto.admin;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.readingm.backend.converter.ImageUrlSerializer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DavinciClassDto {

    private long id;

    private String name;

    @JsonSerialize(using = ImageUrlSerializer.class)
    private String imageUrl;

    private Double rating;

}
