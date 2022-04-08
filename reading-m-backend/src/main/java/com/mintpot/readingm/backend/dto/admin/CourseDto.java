package com.mintpot.readingm.backend.dto.admin;


import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.readingm.api.rams.book.Grade;
import com.mintpot.readingm.backend.converter.ImageUrlSerializer;
import com.mintpot.readingm.backend.entity.constant.SchoolStage;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@JsonPropertyOrder({"pureVideoUrl"})
public class CourseDto implements Serializable {

    @NotBlank
    private String title;

    @NotBlank
    private String name;

    @NotBlank
    private String material;

    private SchoolStage schoolTarget;

    private Grade gradeTarget;

    @NotBlank
    private String urlVideo;

    @NotBlank
    private Long time;

    private long fee;

    private String videoName;

    @JsonSerialize(using = ImageUrlSerializer.class)
    private String videoUrl;

    public String getPureVideoUrl() {
        return videoUrl;
    }
}
