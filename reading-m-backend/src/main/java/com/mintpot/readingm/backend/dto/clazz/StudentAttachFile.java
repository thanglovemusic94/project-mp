package com.mintpot.readingm.backend.dto.clazz;

import com.mintpot.readingm.backend.dto.clazz.embedded.PresignedUrlDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentAttachFile {

    private long studentId;

    private List<PresignedUrlDto> attachFiles;
}
