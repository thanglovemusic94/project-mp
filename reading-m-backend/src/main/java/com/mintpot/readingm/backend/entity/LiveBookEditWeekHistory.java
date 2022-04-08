package com.mintpot.readingm.backend.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class LiveBookEditWeekHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private Long classId;

    @Column(nullable = false)
    private Long tutorId;

    @Column(nullable = false)
    private String reason;

    @CreationTimestamp
    private LocalDateTime createdOn;
}
