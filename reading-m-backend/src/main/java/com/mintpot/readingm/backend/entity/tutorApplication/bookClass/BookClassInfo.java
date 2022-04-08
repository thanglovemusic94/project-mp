package com.mintpot.readingm.backend.entity.tutorApplication.bookClass;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BookClassInfo {

    private List<Desire> desires;

    private List<DesireDateTime> desireDateTimes;

}
