package com.mintpot.readingm.backend.entity.zoom;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name="zoom_meeting", indexes = @Index(columnList = "classId", name = "zoom_meeting_idx"))
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Meeting {

    @Id
    private long id;

    @Column(nullable = false)
    private Long classId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String startUrl;

    @Column(nullable = false)
    private String joinUrl;

    @CreationTimestamp
    private LocalDateTime createdAt;

}
