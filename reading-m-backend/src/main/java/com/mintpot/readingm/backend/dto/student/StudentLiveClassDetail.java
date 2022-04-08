package com.mintpot.readingm.backend.dto.student;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class StudentLiveClassDetail {
    private String name;

    private LocalDate openDate;

    private String tutorName;

    private String tutorImgUrl;
}
