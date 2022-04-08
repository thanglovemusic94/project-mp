package com.mintpot.carcloth.entity.transaction;

import com.mintpot.carcloth.constant.enums.EConstructionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue(value = EConstructionType.JsonProp.TINTING)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Tinting extends Transaction {

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean sideBack;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean whole;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean frontWindshield;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean row1;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean row2;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean row3;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean rearWindshield;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean sunRoof;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean tintingRemoval;
}
