package com.mintpot.carcloth.dto.car;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.dto.converters.AbsoluteUrlSerializer;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BrandInfo implements Serializable {

    private long id;

    private String brandName;

    @JsonSerialize(using = AbsoluteUrlSerializer.class)
    private FileInfo attachFile;
}
