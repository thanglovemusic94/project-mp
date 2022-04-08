package com.mintpot.readingm.backend.entity.clazz;

import com.mintpot.readingm.backend.entity.user.Tutor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
public class LiveClass extends Class {

    private String guide;

    /**
     * Number of students
     */
    @Column(columnDefinition = "tinyint unsigned")
    private int stdNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tutor_id", foreignKey = @ForeignKey(name = "FK_class_tutor"))
    private Tutor tutor;

    private boolean settled;

    public boolean hasStarted() {
        var curriculum = getCurriculum();
        return curriculum != null && curriculum.size() > 0
                && curriculum.get(0).getStart().isBefore(LocalDateTime.now());
    }

    public boolean hasEnded() {
        var curriculum = getCurriculum();
        boolean ended = false;
        LocalDateTime end = getLastLessonTime();

        if (end != null && end.isBefore(LocalDateTime.now())) {
            ended = true;
        }

        return ended;
    }

    public LocalDateTime getLastLessonTime() {
        LocalDateTime end = null;
        var curriculum = getCurriculum();
        if (curriculum != null) {
            for (TextBookCurriculum textBookCurriculum : curriculum) {
                if (end == null || end.isBefore(textBookCurriculum.getEnd())) {
                    end = textBookCurriculum.getEnd();
                }
            }
        }
        return end;
    }

    public List<? extends TextBookCurriculum> getCurriculum() {
        List<? extends TextBookCurriculum> curriculum = new ArrayList<>();
        if (this instanceof TextBookClass) {
            curriculum = ((TextBookClass) this).getCurriculum();
        } else if (this instanceof GoalClass) {
            curriculum  = ((GoalClass) this).getCurriculum();
        }
        return curriculum;
    }
}
