package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.entity.constant.ClassSource;
import com.mintpot.readingm.backend.user.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdUserExcelDto {

    private String memberId;

    private String name;

    private Role role;

    private ClassSource classSource;

    private String email;

    private String phone;

    private String school;

    private boolean receivedSms;

    private String address;

    private String grade;

    private String parentName;

    private String parentPhone;

    private String child1Name;

    private String child1Id;

    private String child1School;

    private String child1Grade;

    private String child2Name;

    private String child2Id;

    private String child2School;

    private String child2Grade;

    private String bankAccount;

    private String bank;

    private String tutorType;
}
