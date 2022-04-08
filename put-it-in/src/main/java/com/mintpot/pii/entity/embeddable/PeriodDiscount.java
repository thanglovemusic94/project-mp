package com.mintpot.pii.entity.embeddable;

import lombok.*;

import javax.persistence.Embeddable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PeriodDiscount {

    private int monthAmount;

    private int discountPercentage;
}
