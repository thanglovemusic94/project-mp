package com.mintpot.readingm.backend.entity;

import com.mintpot.readingm.backend.entity.constant.PointType;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(
        name = "point_used",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"paymentId", "type"},
                        name="uk_point_used"
                )
        }
)
public class PointUsed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private PointType type;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int amount;

    @Column(nullable = false)
    private Long parentId;

    @Column(nullable = false)
    private Long paymentId;

    @CreationTimestamp
    private LocalDateTime createdOn;
}
