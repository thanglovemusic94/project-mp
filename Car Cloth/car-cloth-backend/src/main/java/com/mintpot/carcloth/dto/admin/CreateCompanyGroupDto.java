package com.mintpot.carcloth.dto.admin;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter
@Setter
public class CreateCompanyGroupDto {

    @NotBlank
    @Size(max = 20)
    private String name;

}
