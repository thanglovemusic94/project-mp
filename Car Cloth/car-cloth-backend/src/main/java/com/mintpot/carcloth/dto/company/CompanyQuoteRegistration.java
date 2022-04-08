package com.mintpot.carcloth.dto.company;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class CompanyQuoteRegistration {

    private long id;

    private int constructionFee;

    private int paymentAmount;

    @Column(length = 40)
    @NotBlank
    private String estConstructionPeriod;

    @Column(length = 200)
    @NotBlank
    private String notes;
}
