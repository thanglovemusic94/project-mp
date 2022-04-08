package com.mintpot.carcloth.dto.admin;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CompanyGroupDto extends SaveCompanyGroupDto{

    private String name;

    private LocalDateTime createdOn;

}
