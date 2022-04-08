package com.mintpot.carcloth.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.constant.ShowStatus;
import com.mintpot.carcloth.dto.converters.AbsoluteBannerUrlSerializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BannerDto {

    private int position;

    private ShowStatus status;

    @JsonSerialize(using = AbsoluteBannerUrlSerializer.class)
    private String imgUrl;

    private String connectionLink;
}
