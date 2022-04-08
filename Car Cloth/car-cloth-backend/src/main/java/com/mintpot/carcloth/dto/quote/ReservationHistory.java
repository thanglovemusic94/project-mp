package com.mintpot.carcloth.dto.quote;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReservationHistory {

    private LocalDateTime reservationDate;

    private String reason;
}