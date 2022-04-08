package com.mintpot.readingm.backend.dto.clazz;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.mintpot.readingm.backend.dto.admin.CourseDto;
import com.mintpot.readingm.backend.dto.admin.VideoDto;
import com.mintpot.readingm.backend.entity.clazz.TextBookCurriculum;
import com.mintpot.readingm.backend.entity.constant.SchoolGrade;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@JsonTypeName("davinci")
public class RegDavinciClassDto extends RegClassDto{

    @NotBlank
    private String intro;

    private String preparation;

    @JsonProperty("imageName")
    private String imageFileName;

    private String imageUrl;

    private List<VideoDto> videos;

    //private List<CourseDto> courses;

    @NotNull
    private String grade;

}
