package com.mintpot.readingm.backend.dto.payment.embedded;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CurriculumView {
    private LocalDateTime start;

    private LocalDateTime end;
}
