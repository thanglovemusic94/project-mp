package com.mintpot.readingm.backend.entity.tutorApplication;

import com.mintpot.readingm.backend.dto.tutorApplication.period.Period;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WorkPeriod {

    private Period start;

    private WorkPeriodEnd end;
}
