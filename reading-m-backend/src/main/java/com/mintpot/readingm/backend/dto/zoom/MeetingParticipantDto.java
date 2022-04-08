package com.mintpot.readingm.backend.dto.zoom;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MeetingParticipantDto {
    @JsonProperty("page_count")
    private Integer pageCount;

    @JsonProperty("page_size")
    private Integer pageSize;

    @JsonProperty("total_records")
    private Integer totalRecords;

    @JsonProperty("next_page_token")
    private String nextPageToken;

    @JsonProperty("participants")
    private List<Participant> participants;
}
