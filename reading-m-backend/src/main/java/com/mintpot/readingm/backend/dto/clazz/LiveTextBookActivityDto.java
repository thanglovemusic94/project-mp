package com.mintpot.readingm.backend.dto.clazz;

import com.mintpot.readingm.backend.dto.clazz.embedded.LiveBookDetailCurriculumView;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class LiveTextBookActivityDto {
    private long id;

    private String type;

    private String name;

    private LocalDate openDate;

    private List<LiveBookDetailCurriculumView> curriculum;
}
