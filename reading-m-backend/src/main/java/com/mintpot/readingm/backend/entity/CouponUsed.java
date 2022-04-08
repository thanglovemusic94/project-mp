package com.mintpot.readingm.backend.entity;

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
public class CouponUsed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private Long parentId;

    @Column(nullable = false)
    private Long couponId;

    @Column(nullable = false, unique = true)
    private Long paymentId;

    @CreationTimestamp
    private LocalDateTime createdOn;
}
