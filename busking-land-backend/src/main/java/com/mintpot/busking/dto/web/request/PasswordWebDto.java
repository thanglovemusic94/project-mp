package com.mintpot.busking.dto.web.request;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.mintpot.busking.validation.ValidPassword;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonRootName(value = "data")
public class PasswordWebDto {

    private String old_password;

//    private  String token;

//    @ValidPassword
    private String new_password;

}
