package com.mintpot.pii.entity.embeddable;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Embeddable;

@Embeddable
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
public class Card {
    private String company;
    private String number;
    private int installmentPlanMonths;
    private String approveNo;
    private boolean useCardPoint;
    private String cardType;
    private String ownerType;
    private String receiptUrl;
}
