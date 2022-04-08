package com.mintpot.readingm.backend.dto.admin;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.readingm.backend.converter.ImageUrlSerializer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@JsonPropertyOrder({"pureVideoUrl"})
public class VideoDto implements Serializable {

    private String name;

    private long time;

    private long fee;

    @JsonProperty("videoName")
    private String fileName;

    @JsonSerialize(using = ImageUrlSerializer.class)
    private String videoUrl;

    public String getPureVideoUrl() {
        return videoUrl;
    }
}
