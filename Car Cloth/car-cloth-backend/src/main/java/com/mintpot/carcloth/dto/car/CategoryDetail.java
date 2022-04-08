package com.mintpot.carcloth.dto.car;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.dto.converters.AbsoluteUrlSerializer;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDetail extends CategoryInfo {

    @JsonProperty("position")
    private int orderCategory;

    private LocalDateTime createdOn;

    @JsonSerialize(using = AbsoluteUrlSerializer.class)
    private FileInfo icon;
}
