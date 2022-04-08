package com.mintpot.busking.api.apple.auth.dto;

import com.mintpot.busking.dto.JwtRequest;
import lombok.Getter;

@Getter
public class AppleJwtRequest extends JwtRequest {

    /*
	For apple auth
	 */
    private String appleUserName;


}
