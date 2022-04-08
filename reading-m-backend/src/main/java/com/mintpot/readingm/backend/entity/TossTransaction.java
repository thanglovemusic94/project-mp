package com.mintpot.readingm.backend.entity;

import com.mintpot.readingm.backend.entity.embeddable.Card;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TossTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String paymentKey;

    @Column(unique = true)
    private String orderId;

    private String mId;

    private String currency;

    private String method;

    private long totalAmount;

    private long balanceAmount;

    private String status;

    private Date requestedAt;

    private Date approvedAt;

    private boolean useDiscount;

    private String discountAmount;

    private boolean useEscrow;

    private boolean useCashReceipt;

    @Embedded
    private Card card;

    private String virtualAccount;

    private String cashReceipt;

    private String secret;
}
