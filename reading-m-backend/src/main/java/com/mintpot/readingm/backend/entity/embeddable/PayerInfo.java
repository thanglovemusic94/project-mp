package com.mintpot.readingm.backend.entity.embeddable;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Embeddable
public class PayerInfo {
    @NotBlank
    private String name;

    @NotBlank
    private String phone;

    @NotBlank
    private String email;
}
