package com.mintpot.readingm.backend.dto.clazz;

import com.mintpot.readingm.backend.dto.clazz.embedded.PresignedUrlDto;
import com.mintpot.readingm.backend.dto.clazz.embedded.SaveStudentFileDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class SaveLiveClassViewFullDto {
    private int curriculumIndex;

    List<SaveStudentFileDto> attachedFiles;

    private String notification;

    private Set<PresignedUrlDto> commonAttachFiles;
}
