package com.mintpot.busking.api.google_inapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GoogleReceipt {

    private String amount;

    private String type;

    private String originalJson;

    private String signature;
}
