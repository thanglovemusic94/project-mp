package com.mintpot.carcloth.dto.company;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.entity.embeddable.ConstructableType;
import com.mintpot.carcloth.dto.converters.ConstructableTypeSerializer;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class AdminCompanyInfo implements Serializable {
    @JsonProperty("companyCode")
    private long id;

    private String companyName;

    private String companyId;
}
