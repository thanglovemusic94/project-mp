package com.mintpot.readingm.backend.dto.clazz;

import com.mintpot.readingm.backend.entity.constant.GoalClassCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Setter
public class MyLiveClassView {

    private long id;

    private String name;

    private TutorView tutor;

    private LocalDate openDate;

    @Getter
    @Setter
    @NoArgsConstructor
    static class TutorView {
        private long id;

        private String name;
    }
}
