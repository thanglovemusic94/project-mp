package com.mintpot.readingm.backend.entity.tutorApplication;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Competition extends Certificate {
    private static final long serialVersionUID = 1L;

    String name;

    String place;
}
