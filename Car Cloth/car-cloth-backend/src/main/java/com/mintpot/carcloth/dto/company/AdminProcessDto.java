package com.mintpot.carcloth.dto.company;

import com.mintpot.carcloth.dto.enums.ECompanyRegistrationProcess;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Getter
@Setter
public class AdminProcessDto implements Serializable {

    @NotNull
    private ECompanyRegistrationProcess action;

    private String reason;
}
