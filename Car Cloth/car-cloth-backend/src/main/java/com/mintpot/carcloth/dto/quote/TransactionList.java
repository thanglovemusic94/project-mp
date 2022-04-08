package com.mintpot.carcloth.dto.quote;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.dto.converters.TransactionStatusSerializer;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface TransactionList {

    long getId();

    @JsonSerialize(using = TransactionStatusSerializer.class)
    int getStatus();

    String getType();

    LocalDate getDesiredDate();

    LocalDateTime getReservationDate();

    LocalDateTime getCompleteDate();

    //TODO: waiting chat feature
//    int getCountNewChat();
}
