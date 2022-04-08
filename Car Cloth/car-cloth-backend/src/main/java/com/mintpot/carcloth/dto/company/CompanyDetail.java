package com.mintpot.carcloth.dto.company;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.constant.enums.ERegistrationStatus;
import com.mintpot.carcloth.dto.ConstructionExDto;
import com.mintpot.carcloth.dto.converters.AbsoluteUrlSerializer;
import com.mintpot.carcloth.entity.embeddable.Address;
import com.mintpot.carcloth.entity.embeddable.ConstructableType;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDetail implements Serializable {

    @JsonSerialize(using = AbsoluteUrlSerializer.class)
    private FileInfo attachFile;

    private ERegistrationStatus processingStatus;

    private String companyName;

    private Address address;

    private String workingTime;

    private ConstructableType constructableType;

    private Long totalReview;

    private float constructionQuality;

    private float average;

    private float kindness;

    private float explainProduct;

    private String introduction;

    private List<ConstructionExDto> constructionExamples;
}
