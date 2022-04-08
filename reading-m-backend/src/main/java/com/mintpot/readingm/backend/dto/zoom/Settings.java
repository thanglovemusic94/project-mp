package com.mintpot.readingm.backend.dto.zoom;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Settings {
    @JsonProperty("cn_meeting")
    private Boolean cnMeeting;

    @JsonProperty("in_meeting")
    private Boolean inMeeting;

    @JsonProperty("join_before_host")
    private Boolean joinBeforeHost;

    @JsonProperty("mute_upon_entry")
    private Boolean muteUponEntry;

    private Boolean watermark;

    @JsonProperty("use_pmi")
    private Boolean usePmi;

    @JsonProperty("approval_type")
    private Integer approvalType;

    @JsonProperty("registration_type")
    private Integer registrationType;

    private String audio;

    @JsonProperty("auto_recording")
    private String autoRecording;
}
