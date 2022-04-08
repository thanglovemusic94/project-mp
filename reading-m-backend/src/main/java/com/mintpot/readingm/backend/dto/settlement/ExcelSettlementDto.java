package com.mintpot.readingm.backend.dto.settlement;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class ExcelSettlementDto {
    public String status;

    private LocalDateTime settledDate;

    private LocalDate classDate;

    private String tutorName;

    private String classType;

    private String className;

    private long tuitionFee;

    private int payerNumber;

    private long fee;

    private long tax;

    private long pgFee;

    private long amount;

    private String bank;

    private String bankAccount;
}
