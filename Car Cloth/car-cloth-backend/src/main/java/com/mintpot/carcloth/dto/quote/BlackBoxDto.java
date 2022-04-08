package com.mintpot.carcloth.dto.quote;

import com.fasterxml.jackson.annotation.JsonTypeName;
import com.mintpot.carcloth.constant.enums.EConstructionType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonTypeName(EConstructionType.JsonProp.BLACK_BOX)
public class BlackBoxDto extends TransactionRequest {

    private boolean channel1;

    private boolean channel2;

    private boolean channel4;
}
