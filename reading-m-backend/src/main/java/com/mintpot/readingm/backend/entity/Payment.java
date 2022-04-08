package com.mintpot.readingm.backend.entity;

import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.PaymentMethod;
import com.mintpot.readingm.backend.entity.constant.PaymentStatus;
import com.mintpot.readingm.backend.entity.embeddable.PayerInfo;
import com.mintpot.readingm.backend.entity.user.Parent;
import com.mintpot.readingm.backend.entity.user.Student;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name="class_id", nullable = false, foreignKey = @ForeignKey(name = "FK_payment_class"))
    private com.mintpot.readingm.backend.entity.clazz.Class classInformation;

    @Column(nullable = false)
    private ClassType classType;

    @Column(nullable = false)
    private PaymentStatus status;

    @Column(nullable = false)
    private PaymentMethod method;

    private int amount;

    private int cashPoint;

    private int eventPoint;

    @Column(nullable = false, unique = true)
    private String orderId;

    @ManyToOne
    @JoinColumn(name="payer_id", nullable = false, foreignKey = @ForeignKey(name = "FK_payment_payer"))
    private Parent payer;

    @Embedded
    private PayerInfo payerInfo;


    @ManyToOne
    @JoinColumn(name="student_id", nullable = false, foreignKey = @ForeignKey(name = "FK_payment_child"))
    private Student children;

    @OneToMany(mappedBy = "payment", cascade = CascadeType.ALL)
    private List<VideoInPay> videoInPays;

    @OneToOne(optional = true)
    private Refund refund;

    @ManyToOne
    @JoinColumn(name="coupon_id", foreignKey = @ForeignKey(name ="FK_payment_coupon"))
    private Coupon coupon;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;

    @UpdateTimestamp
    private LocalDateTime updatedOn;

    @Column(updatable = false)
    private int finalAmount;

    public int getDiscount() {
        return coupon == null ? 0 : coupon.getAmount();
    }
}
