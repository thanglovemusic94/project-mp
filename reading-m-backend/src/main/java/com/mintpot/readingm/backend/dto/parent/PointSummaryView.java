package com.mintpot.readingm.backend.dto.parent;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mintpot.readingm.backend.entity.constant.PointType;

public interface PointSummaryView {

    @JsonIgnore
    int getType();

    @JsonProperty("type")
    default PointType getPointType() {
        return PointType.valueOf(getType());
    }

    int getAmount();
}
