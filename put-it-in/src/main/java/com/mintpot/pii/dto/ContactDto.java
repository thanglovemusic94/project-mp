package com.mintpot.pii.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
public class ContactDto {
    @NotBlank
    @Size(min = 2, max = 200)
    private String name;
    @NotBlank
    @Email
    @Size(max = 200)
    private String email;
    private String contact;
    private String companyName;
    private String companyAddress;
}
