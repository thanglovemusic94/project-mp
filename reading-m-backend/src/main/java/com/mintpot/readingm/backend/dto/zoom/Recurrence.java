package com.mintpot.readingm.backend.dto.zoom;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Recurrence {
    private Integer type;

    @JsonProperty("repeat_interval")
    private Integer repeatInterval;

    @JsonProperty("weekly_days")
    private String weeklyDays;

    @JsonProperty("monthly_day")
    private Integer monthlyDay;

    @JsonProperty("monthly_week")
    private Integer monthlyWeek;

    @JsonProperty("monthly_week_day")
    private Integer monthlyWeekDay;

    @JsonProperty("end_times")
    private Integer endTimes;

    @JsonProperty("end_date_time")
    private String endDateTime; // utc time
}

