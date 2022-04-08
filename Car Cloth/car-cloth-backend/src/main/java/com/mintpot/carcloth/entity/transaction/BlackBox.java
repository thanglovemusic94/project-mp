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
@DiscriminatorValue(value = EConstructionType.JsonProp.BLACK_BOX)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class BlackBox extends Transaction {

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean channel1;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean channel2;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean channel4;
}
