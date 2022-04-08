package com.mintpot.carcloth.dto.car;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class MyCarRegistration {

    long carTypeId;

    @NotBlank
    @Size(min = 7)
    private String carNumber;
}
