package com.mintpot.readingm.backend.entity.clazz;

import com.mintpot.readingm.backend.entity.constant.QuestionStatus;
import com.mintpot.readingm.backend.entity.user.Student;
import com.mintpot.readingm.backend.user.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassConsultation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private QuestionStatus status;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false, foreignKey = @ForeignKey(name = "FK_class_consultation_class"))
    private LiveClass classInfo;

    @ManyToOne
    @JoinColumn(name = "questioner_id", nullable = false, foreignKey = @ForeignKey(name = "FK_class_consultation_questioner"))
    private User questioner;

    @ManyToOne
    @JoinColumn(name = "respondent_id", nullable = false, foreignKey = @ForeignKey(name = "FK_class_consultation_respondent"))
    private User respondent;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false, foreignKey = @ForeignKey(name = "FK_class_consultation_student"))
    private Student student;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    @Lob
    private String question;

    @Lob
    private String answer;

    @CreationTimestamp
    private LocalDateTime createdOn;

    @UpdateTimestamp
    private LocalDateTime updatedOn;
}
