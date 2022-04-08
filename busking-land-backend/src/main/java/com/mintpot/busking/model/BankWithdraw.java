package com.mintpot.busking.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "user_bank_withdraw")
public class BankWithdraw {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_bank_withdraw_user"))
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "point_history_id", foreignKey = @ForeignKey(name = "FK_bank_withdraw_point_history"))
    private PointHistory pointHistory;

    private String bankName;

    private String accountNumber;

    private String accountHolder;

    private String image;


}
