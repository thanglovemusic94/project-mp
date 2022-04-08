package com.mintpot.carcloth.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.dto.converters.AbsoluteUrlsSerializer;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
public class ConstructionExampleDetailDto {
    private long id;

    private MyConstructionExampleDto.CarTypeDto carType;

    private LocalDateTime completedDate;

    @JsonSerialize(using = AbsoluteUrlsSerializer.class)
    private Set<FileInfo> images;

    private String content;

    private String companyName;

    private long companyId;

    @Getter
    @Setter
    static class CarTypeDto {
        private long id;
        private String carInfo;
    }
}
