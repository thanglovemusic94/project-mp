package com.mintpot.carcloth.dto;

import com.mintpot.carcloth.constant.enums.ERegistrationStatus;
import com.mintpot.carcloth.constant.enums.ESNSType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberInfo {
    private long id;

    private String name;

    private String memberId;

    private ESNSType sns;

    private String phone;

    private boolean isRegisteredCompany;

    private Long companyId;

    private ERegistrationStatus companyStatus;

    private boolean expired;

    private int point;

    private int fee;

    private int deliveryCost;
}