package com.mintpot.readingm.backend.entity;

import com.mintpot.readingm.backend.entity.constant.IssuingMode;
import com.mintpot.readingm.backend.entity.constant.PointAction;
import com.mintpot.readingm.backend.entity.constant.PointType;
import com.mintpot.readingm.backend.entity.user.Parent;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private PointType type;

    @Column(nullable = false)
    private PointAction action;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int amount;

    @Column(nullable = false)
    private LocalDate startValidDate;

    @Column(nullable = false)
    private LocalDate endValidDate;

    @Column(nullable = false)
    private IssuingMode issuingMode;

    // use only when issuingMode = SELECT
    @ManyToMany(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    @JoinTable(name = "point_member",
            joinColumns = {@JoinColumn(name = "point_id")},
            inverseJoinColumns = {@JoinColumn(name = "owner_id")}
    )
    private Set<Parent> members;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;

}
