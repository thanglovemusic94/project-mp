package com.mintpot.carcloth.dto.car;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CarTypeRegistrationFile {

    private double index;

    private String productType;

    private String brand;

    private String model;

    private String carType;
}
