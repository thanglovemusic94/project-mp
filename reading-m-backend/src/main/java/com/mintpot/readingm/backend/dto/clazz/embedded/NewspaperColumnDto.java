package com.mintpot.readingm.backend.dto.clazz.embedded;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewspaperColumnDto {
    @JsonProperty("id")
    private String cIdx;

    @JsonProperty("title")
    private String cTitle;

    @JsonProperty("fileUrl")
    private String cFile;
}
