package com.mintpot.carcloth.dto.company;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuoteIdsByStatus implements Serializable {

    private List<Long> requestQuotes;

    private List<Long> deliverQuotes;

    private List<Long> reservationAndConstructionQuotes;
}
