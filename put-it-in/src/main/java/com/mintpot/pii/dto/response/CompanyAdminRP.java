package com.mintpot.pii.dto.response;

import com.mintpot.pii.entity.Company;
import lombok.Getter;
import lombok.Setter;

/* @author admin */
@Getter
@Setter
public class CompanyAdminRP {
    private long id;
    private String code;
    private String brandName;
    private String registrationName;
    private String registrationNumber;
    private String representativeName;
    private String settlementCreditAccount;
    

    public CompanyAdminRP(Company com) {
        id = com.getId();
        code = com.getCode();
        brandName = com.getBrandName();
        registrationName = com.getRegistrationName();
        registrationNumber = com.getRegistrationNumber();
        representativeName = com.getRepresentative().getName();
        settlementCreditAccount = com.getSettlementCreditAccount();
    }
}
