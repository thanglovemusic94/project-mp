package com.mintpot.readingm.backend.entity.tutorApplication;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.readingm.backend.dto.tutorApplication.AcademicInfo;
import com.mintpot.readingm.backend.entity.constant.TutorApplicationStatus;
import com.mintpot.readingm.backend.entity.tutorApplication.bookClass.BookClassInfo;
import com.mintpot.readingm.backend.entity.tutorApplication.goalClass.GoalClassInfo;
import com.mintpot.readingm.backend.entity.user.Tutor;
import com.mintpot.readingm.backend.converter.ImageUrlSerializer;
import com.mintpot.readingm.backend.converter.ListImageUrlSerializer;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.*;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@TypeDefs({
        @TypeDef(name = "json", typeClass = JsonStringType.class)
})
public class TutorApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "tutor_id", foreignKey = @ForeignKey(name = "FK_tutor_application"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Tutor tutor;

    @Column(columnDefinition = "json")
    @Type(type = "json")
    private Set<Certificate> certs;

    @Column(columnDefinition = "json")
    @Type(type = "json")
    private List<Experience> experiences;

    @Column(columnDefinition = "json")
    @Type(type = "json")
    private AcademicInfo academicInfo;

    private String introduction;

    @Column(columnDefinition = "json")
    @Type(type = "json")
    private BookClassInfo bookClassInfo;

    @Column(columnDefinition = "json")
    @Type(type = "json")
    private GoalClassInfo goalClassInfo;

    @Column(nullable = false, columnDefinition = "tinyint(1) default " + TutorApplicationStatus.Constant.WAITING_VALUE)
    private TutorApplicationStatus status;

    @Column(updatable = false)
    @CreationTimestamp
    private Date createdOn;

    @UpdateTimestamp
    private Date updatedOn;

    @JsonSerialize(using = ImageUrlSerializer.class)
    private String imagePc;

    @JsonSerialize(using = ListImageUrlSerializer.class)
    @Column(columnDefinition = "json")
    @Type(type = "json")
    private Set<String> files;

}
