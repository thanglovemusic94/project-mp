package com.mintpot.carcloth.entity.transaction;

import com.mintpot.carcloth.constant.enums.EConstructionType;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@DiscriminatorValue(value = EConstructionType.JsonProp.PPF)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class PPF extends Transaction {

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean wholeExterior;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean bonnet;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean frontBumper;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean frontFenderDriver;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean frontFenderPassenger;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean frontDoorDriver;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean frontDoorPassenger;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean backDoorDriver;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean backDoorPassenger;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean rearFenderDriver;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean rearFenderPassenger;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean sideSillDriver;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean sideSillPassenger;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean cLoop;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean rearBumper;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean truck;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean doorHandle;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean sideMirror;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean ppf;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean frontPackage;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean doorEdge;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean headLamp;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean tailLamp;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean ppfRemoval;

}
