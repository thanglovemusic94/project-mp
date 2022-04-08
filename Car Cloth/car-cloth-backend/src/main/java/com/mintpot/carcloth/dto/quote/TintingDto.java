package com.mintpot.carcloth.dto.quote;

import com.fasterxml.jackson.annotation.JsonTypeName;
import com.mintpot.carcloth.constant.enums.EConstructionType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonTypeName(EConstructionType.JsonProp.TINTING)
public class TintingDto extends TransactionRequest {

    private boolean sideBack;

    private boolean whole;

    private boolean frontWindshield;

    private boolean row1;

    private boolean row2;

    private boolean row3;

    private boolean rearWindshield;

    private boolean sunRoof;

    private boolean tintingRemoval;
}
