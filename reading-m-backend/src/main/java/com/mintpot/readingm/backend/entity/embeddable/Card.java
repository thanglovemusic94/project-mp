package com.mintpot.readingm.backend.entity.embeddable;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;

@Getter
@Setter
@Embeddable
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
