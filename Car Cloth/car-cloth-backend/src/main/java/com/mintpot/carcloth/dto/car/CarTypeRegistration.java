package com.mintpot.carcloth.dto.car;

import com.mintpot.carcloth.constant.enums.EProductType;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CarTypeRegistration extends CarTypeInfo {

    @NotNull
    private EProductType productType;

    private long brandId;

    private long modelId;

    @NotNull
    private FileInfo attachFile;
}
