package com.mintpot.readingm.backend.dto.admin.magazine;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.readingm.backend.converter.ImageUrlSerializer;

import java.util.Date;

@JsonPropertyOrder(value = {"file", "imagePC", "imageMB", "file", "createdAt"})
public interface MagazineView {
    Long getId();

    String getTitle();

    @JsonSerialize(using = ImageUrlSerializer.class)
    String getImagePc();

    @JsonSerialize(using = ImageUrlSerializer.class)
    String getImageMb();

    @JsonSerialize(using = ImageUrlSerializer.class)
    String getFile();

//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "YYYY.MM.dd")
    Date getCreatedAt();

}
