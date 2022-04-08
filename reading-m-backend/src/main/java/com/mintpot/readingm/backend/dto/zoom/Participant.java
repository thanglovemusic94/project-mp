package com.mintpot.readingm.backend.dto.zoom;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Participant {

    private String id;

    private String name;

    @JsonProperty("user_email")
    private String userEmail;
}
