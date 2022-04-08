package com.mintpot.carcloth.security;

import com.mintpot.carcloth.constant.GrantType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class JwtRequest implements Serializable {

	private static final long serialVersionUID = 1L;

	private String memberId;

	private String password;

	private String refreshToken;

	private GrantType grantType;

	private String token;

	private String appleUserName;

}
