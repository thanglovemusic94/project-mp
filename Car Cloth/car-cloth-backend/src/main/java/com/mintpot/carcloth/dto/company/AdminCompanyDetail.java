package com.mintpot.carcloth.dto.company;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.dto.converters.AbsoluteUrlSerializer;
import com.mintpot.carcloth.dto.converters.ConstructableTypeSerializer;
import com.mintpot.carcloth.dto.converters.TimeZoneSerializer;
import com.mintpot.carcloth.entity.embeddable.ConstructableType;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class AdminCompanyDetail extends AdminCompany {

    private AdminAddress address;

    private String workingTime;

    @JsonSerialize(using = ConstructableTypeSerializer.class)
    private ConstructableType constructableType;

    @JsonSerialize(using = TimeZoneSerializer.class)
    private LocalDateTime entryDate;

    private String representativeName;

    private String contact;

    @JsonSerialize(using = AbsoluteUrlSerializer.class)
    private FileInfo attachFile;

    private String introduction;

    private BigDecimal totalPaymentAmount;

    float constructionQuality;

    float kindness;

    float explainProduct;
}
