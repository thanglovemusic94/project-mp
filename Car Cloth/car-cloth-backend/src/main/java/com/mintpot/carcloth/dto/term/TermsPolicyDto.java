package com.mintpot.carcloth.dto.term;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TermsPolicyDto implements Serializable {

    @NotBlank
    private String servicePolicy;

    @NotBlank
    private String privacyStatement;

    @NotBlank
    private String refundPolicy;
}
