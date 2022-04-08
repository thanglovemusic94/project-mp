package com.mintpot.readingm.backend.entity;

import com.mintpot.readingm.backend.entity.clazz.VodClass;
import com.mintpot.readingm.backend.entity.user.Student;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

//@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(
        name = "view_lecture",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"video_pay_id"})}
)
public class ViewLecture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "video_pay_id", foreignKey = @ForeignKey(name = "FK_viewlecture_videopay"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private VideoInPay videoInPay;

    @NotNull
    private long viewedAt;

    @Column(updatable = false)
    @CreationTimestamp
    private Date createdOn;

    @UpdateTimestamp
    private Date updatedOn;
}
