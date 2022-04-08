package com.mintpot.readingm.backend.dto.clazz;

import com.fasterxml.jackson.annotation.JsonTypeName;
import com.mintpot.readingm.backend.entity.clazz.TextBookCurriculum;
import com.mintpot.readingm.backend.entity.constant.SchoolGrade;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@JsonTypeName("livebook")
public class RegLiveBookDto extends RegClassDto {

    @NotNull
    private LocalDate openDate;

    @NotBlank
    private String guide;

    @Min(1)
    @Max(60)
    private int stdNo;

    private SchoolGrade targetStudentGrade;

    private List<TextBookCurriculum> curriculum;
}
