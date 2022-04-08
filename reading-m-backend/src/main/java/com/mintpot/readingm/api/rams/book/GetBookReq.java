package com.mintpot.readingm.api.rams.book;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class GetBookReq {

    @JsonProperty("in_brand")
    private String inBrand;

    @JsonProperty("in_yyyymm")
    private String inYyyymm;
}
