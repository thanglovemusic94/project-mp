package com.mintpot.solapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageCount {

    private int total;

    private int sentTotal;

    private int sentFailed;

    private int sentSuccess;

    private int sentPending;

    private int sentReplacement;

    private int refund;

    private int registeredFailed;

    private int registeredSuccess;
}
