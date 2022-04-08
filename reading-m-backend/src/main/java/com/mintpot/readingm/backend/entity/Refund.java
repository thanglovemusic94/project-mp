package com.mintpot.readingm.backend.entity;

import com.mintpot.readingm.backend.entity.constant.PaymentMethod;
import com.mintpot.readingm.backend.entity.constant.RefundStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Refund {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private RefundStatus status;

    @OneToOne
    @JoinColumn(nullable = false, name = "payment_id", foreignKey = @ForeignKey(name="FK_refund_payment"))
    private Payment payment;

    @Column(nullable = false)
    private PaymentMethod method;

    private int amount;

    private int cashPoint;

    private int  eventPoint;

    private String reason;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;

    @UpdateTimestamp
    private LocalDateTime updatedOn;
}
