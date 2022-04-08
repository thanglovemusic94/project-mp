package com.mintpot.carcloth.entity;

import com.mintpot.carcloth.constant.enums.EQuoteStatus;
import com.mintpot.carcloth.entity.transaction.Transaction;
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
public class CompanyQuote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false,
            columnDefinition = "tinyint default " + EQuoteStatus.Constant.REQUESTED)
    private EQuoteStatus status;

    private int constructionFee;

    private int paymentAmount;

    @Column(length = 40)
    private String estConstructionPeriod;

    @Column(length = 200)
    private String notes;

    private boolean confirmed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="company_id", nullable = false, foreignKey = @ForeignKey(name = "FK_company_quote_company"))
    private Company company;

    @ManyToOne
    @JoinColumn(name="transaction_id", nullable = false, foreignKey = @ForeignKey(name = "FK_company_quote_transaction"))
    private Transaction transaction;

    private LocalDateTime reservationDate;

    private LocalDateTime completeDate;

    private String reason;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;

    @Column(length = 1, columnDefinition = "tinyint(1) default 0")
    private boolean deleteFlg;
}
