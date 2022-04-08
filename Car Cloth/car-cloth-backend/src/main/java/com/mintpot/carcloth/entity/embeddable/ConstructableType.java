package com.mintpot.carcloth.entity.embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ConstructableType {
    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean ppf;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean polish;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean wrapping;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean blackBox;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean newCarPackage;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean tinting;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean glassFilm;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean windShield;
}
