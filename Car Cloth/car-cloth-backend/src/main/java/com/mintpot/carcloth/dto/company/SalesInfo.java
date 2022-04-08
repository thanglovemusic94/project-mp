package com.mintpot.carcloth.dto.company;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.dto.converters.TimeZoneSerializer;

import java.time.LocalDateTime;

public interface SalesInfo {

    String getBrand();

    String getModel();

    String getCarType();

    String getRequestedName();

    @JsonSerialize(using = TimeZoneSerializer.class)
    LocalDateTime getCompleteDate();

    int getPaymentAmount();
}
