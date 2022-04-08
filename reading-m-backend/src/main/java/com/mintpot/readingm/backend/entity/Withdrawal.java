package com.mintpot.readingm.backend.entity;

import com.mintpot.readingm.backend.entity.constant.WithdrawalStatus;
import com.mintpot.readingm.backend.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "user_withdrawal")
@Getter
@Setter
@NoArgsConstructor
public class Withdrawal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_withdraw_member"))
    private User withdrawalPerson;

    @Column(nullable = false)
    private String reason;

    @Column(nullable = false, columnDefinition = "tinyint(1)")
    private WithdrawalStatus status;

    @Column(updatable = false)
    @CreationTimestamp
    private Date createdOn;

    @UpdateTimestamp
    private Date updatedOn;

}
