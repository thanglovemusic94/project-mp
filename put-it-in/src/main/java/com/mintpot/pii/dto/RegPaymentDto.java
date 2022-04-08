package com.mintpot.pii.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegPaymentDto implements Cloneable {

    private String orderId;

    private String paymentKey;

    private long amount;

    @Override
    public Object clone() throws CloneNotSupportedException {
        RegPaymentDto clone = (RegPaymentDto) super.clone();
        clone.setOrderId(this.orderId);
        clone.setPaymentKey(this.paymentKey);
        clone.setAmount(this.amount);
        return clone;
    }
}
