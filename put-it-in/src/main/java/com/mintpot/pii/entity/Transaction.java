package com.mintpot.pii.entity;
import org.hibernate.annotations.Where;
import org.hibernate.annotations.SQLDelete;

import com.mintpot.pii.entity.embeddable.Card;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@SQLDelete(sql="UPDATE transaction SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class Transaction extends EntityBase { 

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "transaction_id_generator")
    @SequenceGenerator(name = "transaction_id_generator", sequenceName = "transaction_seq")
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
