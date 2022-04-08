package com.mintpot.readingm.backend.entity;

import com.mintpot.readingm.backend.entity.user.Parent;
import com.mintpot.readingm.backend.user.User;
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
public class CashRequirement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private LocalDateTime completionTime;

    @Column(nullable = false)
    private CashStatus status;

    private int point;

    @ManyToOne
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_cash_user"))
    private Parent user;

    private String bank;

    private String accountNumber;

    private String accountName;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;

}
