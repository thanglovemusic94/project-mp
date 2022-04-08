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
@DiscriminatorValue(value = EConstructionType.JsonProp.NEW_CAR_PACKAGE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class NewCarPackage extends Transaction {

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean tinting;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean blackBox;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean ppf;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean grassFilmCoating;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean polish;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean lowerSoundproofing;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean outsideSoundproofing;
}
