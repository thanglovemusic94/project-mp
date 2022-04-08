package com.mintpot.readingm.backend.entity.settlement;

import com.mintpot.readingm.backend.entity.clazz.LiveClass;
import com.mintpot.readingm.backend.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(
        name = "attend_class",
        uniqueConstraints = {@UniqueConstraint(
                name = "ATTEND_CLASS_UK",
                columnNames = {"lesson_index", "class_id", "participant_id"}
        )}
)
public class AttendClass {

    public AttendClass(AttendClass original) {
        this.startTime = original.getStartTime();
        this.endTime = original.getEndTime();
        this.lessonIndex = original.getLessonIndex();
        this.liveClass = original.getLiveClass();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    @Column(name = "lesson_index")
    private long lessonIndex;

    @ManyToOne
    @JoinColumn(nullable = false, name = "class_id", foreignKey = @ForeignKey(name = "FK_attend_class"))
    private LiveClass liveClass;

    @ManyToOne
    @JoinColumn(nullable = false, name = "participant_id", foreignKey = @ForeignKey(name = "FK_attend_user"))
    private User participant;

    private Boolean isPresent;
}
