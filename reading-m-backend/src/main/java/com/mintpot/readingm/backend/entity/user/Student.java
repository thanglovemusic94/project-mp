package com.mintpot.readingm.backend.entity.user;

import com.mintpot.readingm.api.rams.book.School;
import com.mintpot.readingm.backend.entity.clazz.Class;
import com.mintpot.readingm.backend.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "user_student")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class Student extends User {

    public Student(long userId) {
        super(userId);
    }

    @Column(nullable = false)
    private Integer grade;

    @Column(nullable = false)
    private String school;

    private School clazz;

    @ManyToOne
    @JoinColumn(name = "parent_id", foreignKey = @ForeignKey(name = "FK_student_parent"))
    private Parent parent;

    @ManyToMany(mappedBy = "students")
    private Set<Class> classes;

}
