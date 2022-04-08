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
@DiscriminatorValue(value = EConstructionType.JsonProp.GLASS_FILM)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class GlassFilm extends Transaction {

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
}
