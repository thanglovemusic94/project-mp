package com.mintpot.readingm.backend.entity.embeddable;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class AttachedFile {

    @NotBlank
    private String fileName;

    @NotBlank
    private String objectKey;

    @Builder
    public AttachedFile(String fileName, String objectKey) {
        this.fileName = fileName;
        this.objectKey = objectKey;
    }

}
