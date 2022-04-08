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
@DiscriminatorValue(value = EConstructionType.JsonProp.WINDSHIELD)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Windshield extends Transaction {

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean windshield;
}
