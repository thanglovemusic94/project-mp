package com.mintpot.carcloth.dto.quote;

import com.fasterxml.jackson.annotation.JsonTypeName;
import com.mintpot.carcloth.constant.enums.EConstructionType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonTypeName(EConstructionType.JsonProp.PPF)
public class PPFDto extends TransactionRequest {

    private boolean wholeExterior;

    private boolean bonnet;

    private boolean frontBumper;

    private boolean frontFenderDriver;

    private boolean frontFenderPassenger;

    private boolean frontDoorDriver;

    private boolean frontDoorPassenger;

    private boolean backDoorDriver;

    private boolean backDoorPassenger;

    private boolean rearFenderDriver;

    private boolean rearFenderPassenger;

    private boolean sideSillDriver;

    private boolean sideSillPassenger;

    private boolean cLoop;

    private boolean rearBumper;

    private boolean truck;

    private boolean doorHandle;

    private boolean sideMirror;

    private boolean ppf;

    private boolean frontPackage;

    private boolean doorEdge;

    private boolean headLamp;

    private boolean tailLamp;

    private boolean ppfRemoval;
}
