package com.mintpot.carcloth.dto.company;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.dto.converters.TimeZoneSerializer;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AdminCompany extends AdminCompanyInfo {

    @JsonSerialize(using = TimeZoneSerializer.class)
    private LocalDateTime registrationDate;

    @JsonSerialize(using = TimeZoneSerializer.class)
    private LocalDateTime expiredDateTime;

    private long numberDeliveredQuotes;

    private long numberConstructionCompleted;

    @JsonProperty("rating")
    private float average;

    private Long totalReview;

    private String usageStatus;
}
