package com.mintpot.readingm.backend.dto.clazz;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.mintpot.readingm.backend.entity.constant.ClassSource;
import com.mintpot.readingm.backend.entity.constant.ClassStatus;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.WRAPPER_OBJECT)
@JsonSubTypes({
        @JsonSubTypes.Type(value = RegLiveBookDto.class, name = "livebook"),
        @JsonSubTypes.Type(value = RegLiveGoalDto.class, name = "livegoal"),
        @JsonSubTypes.Type(value = RegDavinciClassDto.class, name = "davinci")
})
public abstract class RegClassDto {

    @NotBlank
    private String name;

    @NotBlank
    private String materials;

    @NotNull
    private Long tuitionFee;

    private ClassSource source;

    private ClassStatus status;
}
