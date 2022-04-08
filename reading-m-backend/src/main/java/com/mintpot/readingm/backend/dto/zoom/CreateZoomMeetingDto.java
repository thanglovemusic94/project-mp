package com.mintpot.readingm.backend.dto.zoom;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mintpot.readingm.backend.constant.ZoomMeetingType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CreateZoomMeetingDto {
    private String topic;

    private ZoomMeetingType type;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonProperty("start_time")
    private LocalDateTime startTime;

    private Integer duration;

    @JsonProperty("schedule_for")
    private String scheduleFor;

    private String timezone;

    private String password;

    private String agenda;

    private Recurrence recurrence;

    private Settings settings;
}
