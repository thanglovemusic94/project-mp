package com.mintpot.readingm.backend.entity.clazz;

import com.mintpot.readingm.backend.entity.constant.ShowStatus;
import com.mintpot.readingm.backend.entity.id.UserClassId;
import com.mintpot.readingm.backend.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_review")
@Getter
@Setter
@NoArgsConstructor
public class ClassReview {

    @EmbeddedId
    private UserClassId id;

    @Column(columnDefinition = "tinyint(1)", nullable = false)
    private int rating;

    private String content;

    // add later
    @ManyToOne
    @JoinColumn(name = "class_id", foreignKey = @ForeignKey(name = "FK_review_class"))
    @MapsId("classId")
    private Class classInfo;

    @ManyToOne
    @JoinColumn(name = "writer_id", foreignKey = @ForeignKey(name = "FK_review_writer"))
    @MapsId("userId")
    private User writer;

    @Column(columnDefinition = "tinyint(1) default " + ShowStatus.Constant.SHOW_VALUE)
    private ShowStatus status;

    @Column(updatable = false)
    @CreationTimestamp
    private Date createdOn;
}
