package com.mintpot.carcloth.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Size;

@Getter
@Setter
public class CancelReservationReq {

    @Size(min = 5)
    private String reason;
}
