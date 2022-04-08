package com.mintpot.readingm.backend.dto.admin;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.readingm.backend.converter.ImageUrlSerializer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class AdDavinciClassEditDto {
    private String intro;

    private String materials;

    private String imageFileName;

    @JsonSerialize(using = ImageUrlSerializer.class)
    private String imageUrl;

    private List<VideoDto> videos;

    private String grade;

    @NotBlank
    private String name;

    @NotNull
    private Long tuitionFee;
}
