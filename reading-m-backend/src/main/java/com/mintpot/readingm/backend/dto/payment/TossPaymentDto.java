package com.mintpot.readingm.backend.dto.payment;

import com.mintpot.readingm.backend.dto.payment.embedded.TossPaymentApprovalDto;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class TossPaymentDto {
    @NotBlank
    private String paymentKey;

    @NotNull
    private TossPaymentApprovalDto tossPayment;
}
