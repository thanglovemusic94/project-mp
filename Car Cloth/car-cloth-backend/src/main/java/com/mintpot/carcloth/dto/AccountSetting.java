package com.mintpot.carcloth.dto;

import com.mintpot.carcloth.constant.enums.EGender;
import com.mintpot.carcloth.constant.enums.ESNSType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AccountSetting {

    private String memberId;

    private EGender gender;

    private LocalDate birthday;

    private String phone;

    private ESNSType sns;
}