package com.mintpot.busking.api.google_inapp.dto;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
public class ReceiptInfo {

    private String productId;

    private String transactionId;

}