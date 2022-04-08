package com.mintpot.readingm.backend.entity.tutorApplication;

import com.mintpot.readingm.backend.dto.tutorApplication.period.Period;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class WorkPeriodEnd extends Period {

    private WorkPeriodEndType type;

}
