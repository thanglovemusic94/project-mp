package com.mintpot.readingm.backend.dto.tutorApplication;

import com.mintpot.readingm.backend.entity.constant.TutorApplicationStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdTutorAppDetailsDto {

    private TutorApplicationStatus status;
}
