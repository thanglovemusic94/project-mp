package com.mintpot.readingm.backend.entity.user;

import com.mintpot.readingm.backend.entity.clazz.LiveClass;
import com.mintpot.readingm.backend.entity.constant.Gender;
import com.mintpot.readingm.backend.entity.constant.TutorType;
import com.mintpot.readingm.backend.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "user_tutor")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class Tutor extends User {

    public Tutor(long userId) {
        super(userId);
    }

    @Column(nullable = false)
    private LocalDate birth;

    @Column(columnDefinition = "tinyint(1)", nullable = false)
    private Gender gender;

    @Column(nullable = false)
    private String bank;

    @Column(nullable = false)
    private String bankAccount;

    @Column(columnDefinition = "tinyint(1)", nullable = false)
    private TutorType tutorType;

    @OneToMany(mappedBy = "tutor")
    private Set<LiveClass> classes;

    private String profileImageUrl;

    private String bookTextIntroduction;
}
