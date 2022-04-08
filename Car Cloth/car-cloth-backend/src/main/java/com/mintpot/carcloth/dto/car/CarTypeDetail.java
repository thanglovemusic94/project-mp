package com.mintpot.carcloth.dto.car;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.constant.enums.EProductType;
import com.mintpot.carcloth.dto.converters.AbsoluteUrlSerializer;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CarTypeDetail extends CarTypeInfo {

    @NotNull
    private EProductType productType;

    @NotNull
    private BrandInfo brand;

    private ModelInfo model;

    @NotNull
    @JsonSerialize(using = AbsoluteUrlSerializer.class)
    private FileInfo attachFile;

    private LocalDateTime createdOn;
}
