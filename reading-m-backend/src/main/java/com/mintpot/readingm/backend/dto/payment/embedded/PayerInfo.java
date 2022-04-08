package com.mintpot.readingm.backend.dto.payment.embedded;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PayerInfo {
    private String name;

    private String phone;

    private String email;

    private String childName;
}
