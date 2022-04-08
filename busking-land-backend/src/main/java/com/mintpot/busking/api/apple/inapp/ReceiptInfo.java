package com.mintpot.busking.api.apple.inapp;

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
