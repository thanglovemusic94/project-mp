package com.mintpot.pii.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Setter
@Getter
public class TossPymntCompleteDto {

    private String paymentKey;
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
    private Card card;
    private Object virtualAccount;
    private String cashReceipt;
    private List<Object> cancels;
    private String secret;

    @Getter
    @Setter
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
}
