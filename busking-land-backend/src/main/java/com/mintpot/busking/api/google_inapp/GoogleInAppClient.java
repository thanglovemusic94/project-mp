package com.mintpot.busking.api.google_inapp;

import com.mintpot.busking.api.google_inapp.dto.GoogleReceipt;
import com.mintpot.busking.api.google_inapp.dto.ReceiptInfo;

public interface GoogleInAppClient {

    ReceiptInfo verifyPurchase (GoogleReceipt googleReceipt);

}
