package com.mintpot.pii.dto;

import com.mintpot.pii.entity.Company;
import com.mintpot.pii.entity.Manager;
import lombok.Getter;
import lombok.Setter;

/* @author linhnc@mintpot.vn */
@Getter
@Setter
public class ManagerDto {
    private long managerId;
    private Long companyId;
    private String managerName;
    private String position;
    private String email;
    private String phone;

    public Manager toEntity() {
        Manager m = new Manager();
        m.setCompany(new Company(companyId));
        m.setName(managerName);
        m.setPosition(position);
        m.setEmail(email);
        m.setPhone(phone);
        return m;
    }

}
