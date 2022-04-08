package com.mintpot.carcloth.dto.quote;

import com.mintpot.carcloth.constant.enums.EQuoteStatus;
import com.mintpot.carcloth.entity.embeddable.Address;

public interface CompanyQuoteInfo {

    long getId();

    Company getCompany();

    EQuoteStatus getStatus();

    int getConstructionFee();

    int getPaymentAmount();

    interface Company {

        long getId();

        String getCompanyName();

        Address getAddress();

        long getTotalReview();

        float getAverage();
    }
}
