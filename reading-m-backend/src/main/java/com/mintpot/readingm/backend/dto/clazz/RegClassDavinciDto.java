package com.mintpot.readingm.backend.dto.clazz;

import com.fasterxml.jackson.annotation.JsonTypeName;
import com.mintpot.readingm.backend.entity.clazz.TextBookCurriculum;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
public class RegClassDavinciDto {

    @NotBlank
    private String name;

    @NotNull
    private Long tuitionFee;

}
