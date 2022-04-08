package com.mintpot.readingm.backend.entity.clazz;

import com.mintpot.readingm.backend.entity.constant.GoalClassCategory;
import com.mintpot.readingm.backend.entity.constant.QuestionStatus;
import com.mintpot.readingm.backend.entity.user.Tutor;
import com.mintpot.readingm.backend.user.User;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class GoalClassApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private GoalClassCategory category;

    @Column(nullable = false)
    private QuestionStatus status;

    @ManyToOne
    @JoinColumn(name = "applicant_id", foreignKey = @ForeignKey(name = "FK_gc_application_applicant"))
    private User applicant;

    @ManyToOne
    @JoinColumn(name = "respondent_id", foreignKey = @ForeignKey(name = "FK_gc_application_respondent"))
    private Tutor respondent;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    @Lob
    private String request;

    @Lob
    private String answer;

    @CreationTimestamp
    private LocalDateTime createdOn;

    @UpdateTimestamp
    private LocalDateTime updatedOn;
}
