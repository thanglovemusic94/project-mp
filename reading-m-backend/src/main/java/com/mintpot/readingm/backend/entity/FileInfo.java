package com.mintpot.readingm.backend.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;

@Embeddable
@Setter
@Getter
public class FileInfo {

    @NotBlank
    private String name;

    @NotBlank
    private String url;

}
