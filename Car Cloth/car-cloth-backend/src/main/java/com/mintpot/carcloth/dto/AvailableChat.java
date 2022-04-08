package com.mintpot.carcloth.dto;

import com.mintpot.carcloth.constant.enums.EQuoteStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AvailableChat {

    private boolean isAvailable;

    private EQuoteStatus status;
}