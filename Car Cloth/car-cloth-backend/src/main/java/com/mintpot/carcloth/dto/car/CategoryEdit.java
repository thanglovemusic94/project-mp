package com.mintpot.carcloth.dto.car;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.dto.converters.AbsoluteUrlSerializer;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryEdit extends CategoryInfo {

    @JsonSerialize(using = AbsoluteUrlSerializer.class)
    private FileInfo icon;
}
