package com.mintpot.busking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtUserNamePassRequest {

    private String username;

    private String password;
}
