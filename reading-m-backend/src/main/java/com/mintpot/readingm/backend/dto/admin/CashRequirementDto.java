package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.entity.CashStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class CashRequirementDto {
    private long id;

    private LocalDateTime requirementTime;

    private LocalDateTime completionTime;

    private String bank;

    private String accountNumber;

    private String accountName;

    private CashStatus status;

    private int point;

    private UserViewDto user;

}
