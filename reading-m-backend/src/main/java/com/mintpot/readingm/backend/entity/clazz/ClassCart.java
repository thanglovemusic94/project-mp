package com.mintpot.readingm.backend.entity.clazz;

import com.mintpot.readingm.backend.entity.id.UserClassId;
import com.mintpot.readingm.backend.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ClassCart {

    @EmbeddedId
    private UserClassId id;

    @ManyToOne
    private Class classInfo;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;

}
