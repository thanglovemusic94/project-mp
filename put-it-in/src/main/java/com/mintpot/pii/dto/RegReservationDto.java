package com.mintpot.pii.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class RegReservationDto {

    private long productId;

    private int quantity;

    private long paidAmount;

    private LocalDate startDate;

    private int usagePeriod;

}
