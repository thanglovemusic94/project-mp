package com.mintpot.readingm.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyEmailRes {
    private String email;

    private boolean existed;
}
