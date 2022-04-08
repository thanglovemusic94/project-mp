package com.mintpot.pii.dto;

import com.mintpot.pii.entity.Manager;
import lombok.Getter;
import lombok.Setter;

/* @author linhnc@mintpot.vn*/

@Getter @Setter
public class ManagerRpDto {
    
    private long id;
    private String companyCode;
    private String brandName;
    private String managerName;
    private String position;
    private String email;
    private String phone;
    
    public ManagerRpDto(Manager m) {
        id = m.getId();
        companyCode = m.getCompany().getCode();
        brandName = m.getCompany().getBrandName();
        managerName = m.getName();
        position = m.getPosition();
        email = m.getEmail();
        phone = m.getPhone();
    }
}
