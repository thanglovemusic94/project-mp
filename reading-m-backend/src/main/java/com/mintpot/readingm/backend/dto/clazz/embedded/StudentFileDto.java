package com.mintpot.readingm.backend.dto.clazz.embedded;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StudentFileDto {

    private long id;

    private String name;

    private List<PresignedUrlDto> attachedFiles;

    private List<PresignedUrlDto> stdAttachedFiles;

}
