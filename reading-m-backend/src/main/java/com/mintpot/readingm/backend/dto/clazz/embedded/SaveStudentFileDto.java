package com.mintpot.readingm.backend.dto.clazz.embedded;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SaveStudentFileDto {
    private long studentId;

    private List<PresignedUrlDto> attachFiles;
}
