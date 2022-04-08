package com.mintpot.readingm.backend.dto.zoom;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class MeetingRes {
    private long id;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @JsonProperty("duration")
    private int duration;

    @JsonProperty("host_id")
    private String hostId;

    @JsonProperty("join_url")
    private String joinUrl;

    @JsonProperty("start_time")
    private LocalDateTime startTime;

    @JsonProperty("start_url")
    private String startUrl;

    private String status;

    private String timezone;

    private String topic;

    private int type;

    private String uuid;

    @JsonProperty("settings")
    private Settings settings;
}

