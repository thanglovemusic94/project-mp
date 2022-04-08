package com.mintpot.pii.dto.response;

import com.mintpot.pii.entity.Company;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author linhnc@mintpot.vn
 */
@Getter @Setter
public class BrandSearchAdminRP {

    private String storeCompanyCode; // Company code, Brand Code
    private String storeCompanyName; // Company name, Brand Name;
    private String companyRegName;
    private String companyRegNumber;
    public BrandSearchAdminRP(Company com) {
        this.storeCompanyCode = com.getCode();
        this.storeCompanyName = com.getBrandName();
        this.companyRegName = com.getRegistrationName();
        this.companyRegNumber = com.getRegistrationNumber();
    }
    
}
