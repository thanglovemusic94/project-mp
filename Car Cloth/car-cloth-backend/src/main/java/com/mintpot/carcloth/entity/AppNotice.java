package com.mintpot.carcloth.entity;

import com.mintpot.carcloth.constant.enums.ENoticeType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "app_notice")
public class AppNotice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipient_id", nullable = false, foreignKey = @ForeignKey(name = "FK_app_notice_recipient"))
    private Member recipient;

    private boolean hasRead;

    @Column(nullable = false, columnDefinition = "tinyint")
    private ENoticeType type;

    private Long detailId;

    @CreationTimestamp
    private LocalDate createdOn;
}
