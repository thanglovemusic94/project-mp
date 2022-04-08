package com.mintpot.readingm.backend.entity.tutorApplication;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class License extends Certificate {
    private static final long serialVersionUID = 1L;

    String name;

    String passType;

    String publisher;

}
