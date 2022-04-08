package com.mintpot.carcloth.dto.company;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.dto.converters.QuoteStatusSerializer;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface QuoteList {

    long getId();

    String getType();

    @JsonSerialize(using = QuoteStatusSerializer.class)
    int getStatus();

    String getBrand();

    String getModel();

    String getCarType();

    LocalDate getDesiredDate();

    LocalDateTime getReservationDate();

    LocalDateTime getCompleteDate();

    boolean getConfirmed();

    Long getConExample();
}
