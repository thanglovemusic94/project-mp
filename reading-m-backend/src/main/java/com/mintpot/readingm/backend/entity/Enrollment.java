package com.mintpot.readingm.backend.entity;

import com.mintpot.readingm.backend.entity.clazz.VodClass;
import com.mintpot.readingm.backend.entity.constant.CourseStatus;
import com.mintpot.readingm.backend.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(
        name = "enrollment",
        uniqueConstraints = {@UniqueConstraint(
                name = "ENROLLMENT_COURSE",
                columnNames = {"course_index", "class_id", "student_id"}
        )}
)
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "course_index")
    private int courseIndex;

    @ManyToOne
    @JoinColumn(nullable = false, name = "class_id", foreignKey = @ForeignKey(name = "FK_enrollment_class"))
    private VodClass vodClass;


    @ManyToOne
    @JoinColumn(nullable = false, name = "student_id", foreignKey = @ForeignKey(name = "FK_enrollment_student"))
    private User student;

    private CourseStatus status;

    private LocalDate paymentDate;
}
