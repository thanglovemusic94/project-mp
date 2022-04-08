package com.mintpot.pii.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

/* @author admin */
@Getter
@Setter
//use for create and update, not use @NotNull
public class CompanyRQ {    
    private Long id;
    private String code;

    @NotEmpty
    private String brandName;
    private String branchName;
    private String registrationName;
    private String registrationNumber;
    private String address;
    private String representativeName;
    private String representativeContact;
    private String representativeEmail;
    private String settlementCreditAccount;
}
