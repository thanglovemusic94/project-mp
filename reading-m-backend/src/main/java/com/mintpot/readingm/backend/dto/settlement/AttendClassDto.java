package com.mintpot.readingm.backend.dto.settlement;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class AttendClassDto {

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private boolean isTutorPresent;

    List<ParticipantDto> students;
}