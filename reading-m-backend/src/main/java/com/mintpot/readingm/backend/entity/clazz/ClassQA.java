package com.mintpot.readingm.backend.entity.clazz;

import com.mintpot.readingm.backend.entity.user.Student;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "class_qa")
@Setter
@Getter
@NoArgsConstructor
public class ClassQA {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    @Lob
    private String content;

    private String answer;

    private boolean isSecret;

    @ManyToOne(optional = false)
    @JoinColumn(name = "class_id", foreignKey = @ForeignKey(name = "FK_class_qa_class"))
    private Class classInfo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "student_id", foreignKey = @ForeignKey(name = "FK_class_qa_student"))
    private Student questioner;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;

    @UpdateTimestamp
    private Date updatedOn;

    @Builder
    public ClassQA(String title, String content, String answer, boolean isSecret, Student student, Class clazz) {
        this.title = title;
        this.content = content;
        this.answer = answer;
        this.isSecret = isSecret;
        this.questioner = student;
        this.classInfo = clazz;
    }
}
