package com.mintpot.readingm.api.rams;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class GetScheduleReq {
    @JsonProperty("in_brand")
    private String inBrand;

    @JsonProperty("in_type")
    private String inType;

    @JsonProperty("in_today")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate inToday;
}
