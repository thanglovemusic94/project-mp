package com.mintpot.readingm.backend.entity.clazz;

import com.mintpot.readingm.backend.entity.constant.ClassSource;
import com.mintpot.readingm.backend.entity.constant.ClassStatus;
import com.mintpot.readingm.backend.entity.user.Student;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Table(name = "class")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type")
@Entity
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public abstract class Class {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    /*
     * ~Classification: classify whether class is created by ReadingM or imported from other sourcesClassSourceClassSource.
     */
    private ClassSource source;

    // this is not used anymore as we using inheritance with join table to determine class type.
    //private ClassType type;
    @Column(name = "type", insertable = false, updatable = false)
    private String type;

    private long tuitionFee;

    private LocalDate openDate;

    private String materials;

    @Column(length = 1, columnDefinition = "tinyint(1) default " + ClassStatus.Constant.SHOW_VALUE)
    private ClassStatus status;

    @UpdateTimestamp
    private LocalDateTime updatedOn;

    @OneToMany(mappedBy = "classInfo")
    private Set<ClassReview> reviews;

    @OneToMany(mappedBy = "classInfo")
    private Set<ClassQA> qas;

    @ManyToMany
    @JoinTable(
            name = "class_student",
            joinColumns = {@JoinColumn(name = "class_id")},
            inverseJoinColumns = {@JoinColumn(name = "student_id")},
            foreignKey = @ForeignKey(name = "FK_class_student_class"),
            inverseForeignKey = @ForeignKey(name = "FK_class_student_student")
    )
    private Set<Student> students;

    public Class(String name,
                 ClassSource source,
                 long tuitionFee,
                 LocalDate openDate,
                 ClassStatus status) {

        this.name = name;
        this.source = source;
        this.tuitionFee = tuitionFee;
        this.openDate = openDate;
        this.status = status;
    }

    public void addStudent(Student std) {
        if (students == null) {
            students = new HashSet<>();
        }

        students.add(std);
    }

    public boolean isStudentOfClass(long studentId) {
        return students != null && students.stream().anyMatch(std -> std.getId() == studentId);
    }

    public boolean isHaveStudent() {
        return students != null && !students.isEmpty();
    }
}
