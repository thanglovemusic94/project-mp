package com.mintpot.readingm.backend.dto.settlement;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExcelAttendDto {
    private String classDate;

    private boolean tutorInClass;

    private String studentName;

    private boolean studentAttend;
}
