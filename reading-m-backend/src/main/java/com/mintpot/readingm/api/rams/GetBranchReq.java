package com.mintpot.readingm.api.rams;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class GetBranchReq {

    @JsonProperty("in_brand")
    private String inBrand;

    @JsonProperty("in_type")
    private String inType;
}
