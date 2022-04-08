package com.mintpot.readingm.backend.dto.admin;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveFaqDto {

    private long id;

    private String question;

    private String answer;
}
