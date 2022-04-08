package com.mintpot.carcloth.dto.quote;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.dto.converters.TransactionStatusSerializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class QuotationList {

    @JsonSerialize(using = TransactionStatusSerializer.class)
    private int status;

    private List<CompanyQuoteInfo> quotes;
}
