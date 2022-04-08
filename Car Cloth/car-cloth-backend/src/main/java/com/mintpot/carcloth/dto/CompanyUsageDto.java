package com.mintpot.carcloth.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.dto.converters.TimeZoneSerializer;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CompanyUsageDto {
    private long point;

    private boolean autoExtend;

    @JsonSerialize(using = TimeZoneSerializer.class)
    private LocalDateTime expiredDateTime;

    @JsonSerialize(using = TimeZoneSerializer.class)
    private LocalDateTime autoExtendTime;
}
